import React, { useState, useRef } from 'react';
import { UploadCloud, X, RefreshCw, Link as LinkIcon, AlertCircle, CheckCircle2, Loader2, Image as ImageIcon } from 'lucide-react';
import MediaLibrary from '../../pages/admin/MediaLibrary';

export default function FeaturedImageUpload({ value, onChange }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [manualUrl, setManualUrl] = useState('');
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 675;

          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const compressedDataUrl = canvas.toDataURL('image/webp', 0.82);
          resolve(compressedDataUrl);
        } catch {
          resolve(null);
        }
      };
      img.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  };

  const processFile = async (file) => {
    setUploadError('');

    // Format validation (Exclude SVG to prevent stored XSS)
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Please select a valid image format (PNG, JPG, WebP, or GIF). SVG is disabled for security.');
      return;
    }

    if (file.size > 12 * 1024 * 1024) {
      setUploadError('File size exceeds 12MB. Please select a smaller image.');
      return;
    }

    setIsUploading(true);

    try {
      // Compress and resize image client-side to fit safely within Firestore 1MB limits (~80KB)
      let imageBase64 = await compressImage(file);

      if (!imageBase64) {
        imageBase64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      }

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64,
          fileName: file.name,
          contentType: 'image/webp',
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error || `Upload failed with status ${res.status}`);
      }

      const data = await res.json();
      if (data.url) {
        onChange(data.url);
        setUploadError('');
      } else {
        throw new Error('Upload response missing image URL');
      }
    } catch (err) {
      console.error('Featured image upload error:', err);
      setUploadError(err.message || 'Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    onChange('');
    setUploadError('');
    setShowUrlInput(false);
  };

  const handleApplyUrl = (e) => {
    e.preventDefault();
    const trimmed = manualUrl.trim();
    if (!trimmed) return;
    if (!/^https?:\/\//i.test(trimmed)) {
      setUploadError('Please enter a valid secure URL starting with https:// or http://');
      return;
    }
    if (/^(javascript|data|vbscript):/i.test(trimmed)) {
      setUploadError('Security error: JavaScript or data URLs are not permitted.');
      return;
    }
    try {
      new URL(trimmed);
    } catch {
      setUploadError('Invalid URL structure. Please enter a valid web address.');
      return;
    }
    onChange(trimmed);
    setManualUrl('');
    setShowUrlInput(false);
    setUploadError('');
  };

  return (
    <div className="featured-image-upload-widget">
      {/* If an image exists, show the preview card */}
      {value ? (
        <div className="featured-image-preview-card">
          <div className="featured-image-wrapper">
            <img
              src={value}
              alt="Post featured preview"
              className="featured-image-img"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';
              }}
            />
            <div className="featured-image-overlay">
              <button
                type="button"
                className="featured-image-action-btn"
                onClick={() => fileInputRef.current?.click()}
                title="Replace Image"
              >
                <RefreshCw size={14} />
                <span>Replace</span>
              </button>
              <button
                type="button"
                className="featured-image-action-btn delete"
                onClick={handleRemove}
                title="Remove Image"
              >
                <X size={14} />
                <span>Remove</span>
              </button>
            </div>
          </div>
          <div className="featured-image-meta">
            <div className="featured-image-success">
              <CheckCircle2 size={13} />
              <span>Cover image set</span>
            </div>
            <span className="featured-image-ratio">16:9 Recommended</span>
          </div>
        </div>
      ) : (
        /* Empty state: Drop zone */
        <div
          className={`featured-image-dropzone ${isDragging ? 'dragging' : ''} ${isUploading ? 'uploading' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !isUploading && fileInputRef.current?.click()}
        >
          {isUploading ? (
            <div className="featured-image-loading-state">
              <Loader2 size={28} className="spinner-icon" />
              <p className="featured-image-title">Uploading image...</p>
              <p className="featured-image-subtitle">Optimizing and storing securely on CDN</p>
            </div>
          ) : (
            <div className="featured-image-empty-state">
              <div className="featured-image-icon-circle">
                <UploadCloud size={24} />
              </div>
              <p className="featured-image-title">
                Drag & drop cover image, or <span>Browse</span>
              </p>
              <p className="featured-image-subtitle">PNG, JPG, WebP, or GIF up to 8MB</p>
            </div>
          )}
        </div>
      )}

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/webp, image/gif"
        style={{ display: 'none' }}
      />

      {/* Error alert if any */}
      {uploadError && (
        <div className="featured-image-error">
          <AlertCircle size={14} />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Optional URL input toggle */}
      {!value && !isUploading && (
        <div className="featured-image-alt-option">
          {!showUrlInput ? (
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="featured-image-link-toggle"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowUrlInput(true);
                }}
              >
                <LinkIcon size={12} />
                <span>Paste external image URL</span>
              </button>
              <button
                type="button"
                className="featured-image-link-toggle"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMediaLibrary(true);
                }}
              >
                <ImageIcon size={12} />
                <span>Select from Media Library</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleApplyUrl} className="featured-image-url-form" onClick={(e) => e.stopPropagation()}>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={manualUrl}
                onChange={(e) => setManualUrl(e.target.value)}
                className="featured-image-url-input"
                autoFocus
              />
              <button type="submit" className="featured-image-url-submit">Set</button>
              <button
                type="button"
                className="featured-image-url-cancel"
                onClick={() => setShowUrlInput(false)}
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      )}

      {showMediaLibrary && (
        <MediaLibrary 
          isModal={true} 
          onClose={() => setShowMediaLibrary(false)} 
          onSelect={(item) => {
            onChange(item.url);
            setShowMediaLibrary(false);
            setUploadError('');
          }} 
        />
      )}
    </div>
  );
}
