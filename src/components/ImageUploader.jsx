import React, { useState } from 'react';
import { Upload, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { cloudName } from '../config/cloudinary';

/**
 * Cloudinary Direct Upload Component
 * 
 * @param {string} [uploadPreset] - Cloudinary unsigned upload preset (e.g. 'saas_crm_preset')
 * @param {string} [folder='saas-crm'] - Destination folder in Cloudinary
 * @param {(result: { publicId: string, secureUrl: string, raw: object }) => void} onUploadSuccess
 * @param {(error: Error) => void} [onUploadError]
 */
export default function ImageUploader({
  uploadPreset = 'saas_crm_preset',
  folder = 'saas-crm',
  onUploadSuccess,
  onUploadError,
  className = '',
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadedPublicId, setUploadedPublicId] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);
    setErrorMsg(null);
    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    if (folder) {
      formData.append('folder', folder);
    }

    try {
      const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error?.message || 'Upload failed');
      }

      setUploadedPublicId(data.public_id);
      if (onUploadSuccess) {
        onUploadSuccess({
          publicId: data.public_id,
          secureUrl: data.secure_url,
          raw: data,
        });
      }
    } catch (err) {
      console.error('Cloudinary upload error:', err);
      setErrorMsg(err.message || 'Failed to upload image to Cloudinary.');
      if (onUploadError) onUploadError(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }} className={className}>
      <label
        style={{
          border: '2px dashed var(--border-color, #e2e8f0)',
          borderRadius: '12px',
          padding: '1.5rem',
          textAlign: 'center',
          cursor: isUploading ? 'not-allowed' : 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          background: 'var(--card-bg, rgba(255, 255, 255, 0.02))',
          transition: 'border-color 0.2s',
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
          style={{ display: 'none' }}
        />

        {isUploading ? (
          <>
            <Loader2 className="animate-spin" size={28} color="var(--primary-color, #3b82f6)" />
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted, #64748b)' }}>
              Uploading to Cloudinary...
            </span>
          </>
        ) : previewUrl ? (
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <img
              src={previewUrl}
              alt="Uploaded Preview"
              style={{ maxHeight: '140px', borderRadius: '8px', objectFit: 'contain' }}
            />
            {uploadedPublicId && (
              <span
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: '#10b981',
                  color: '#fff',
                  borderRadius: '50%',
                  padding: '2px',
                }}
              >
                <CheckCircle2 size={16} />
              </span>
            )}
          </div>
        ) : (
          <>
            <Upload size={28} color="var(--primary-color, #3b82f6)" />
            <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>
              Click to select and upload image
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted, #64748b)' }}>
              PNG, JPG, WebP supported
            </span>
          </>
        )}
      </label>

      {errorMsg && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', fontSize: '0.85rem' }}>
          <AlertCircle size={16} />
          <span>{errorMsg}</span>
        </div>
      )}

      {uploadedPublicId && (
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted, #64748b)' }}>
          Public ID: <code>{uploadedPublicId}</code>
        </div>
      )}
    </div>
  );
}
