import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Minus,
  Code,
  Undo,
  Redo,
  Code2,
  Eye
} from 'lucide-react';
import MediaLibrary from '../../pages/admin/MediaLibrary';

export default function RichTextEditor({ value, onChange, placeholder = 'Write your blog post content here...' }) {
  const editorRef = useRef(null);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [isRawHtml, setIsRawHtml] = useState(false);
  const [rawHtmlContent, setRawHtmlContent] = useState(value || '');
  const [activeFormats, setActiveFormats] = useState({});

  const { wordCount, readTimeMinutes } = useMemo(() => {
    const text = (value || '').replace(/<[^>]*>/g, ' ');
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    return {
      wordCount: words,
      readTimeMinutes: Math.max(1, Math.ceil(words / 200))
    };
  }, [value]);

  // Sync incoming value to visual editor when value changes or when switching from HTML mode
  useEffect(() => {
    if (!isRawHtml && editorRef.current) {
      if (document.activeElement !== editorRef.current && editorRef.current.innerHTML !== (value || '')) {
        editorRef.current.innerHTML = value || '';
      }
    }
  }, [value, isRawHtml]);

  const handleInput = () => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    setRawHtmlContent(html);
    onChange(html);
  };

  const checkActiveFormats = useCallback(() => {
    if (!editorRef.current || document.activeElement !== editorRef.current) return;
    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      insertUnorderedList: document.queryCommandState('insertUnorderedList'),
      insertOrderedList: document.queryCommandState('insertOrderedList'),
    });
  }, []);

  const exec = (command, val = null) => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    document.execCommand(command, false, val);
    handleInput();
    checkActiveFormats();
  };

  const handleFormatBlock = (tag) => {
    exec('formatBlock', tag);
  };

  const handleLink = () => {
    const existingUrl = '';
    const url = window.prompt('Enter link URL (e.g., https://example.com):', existingUrl);
    if (url) {
      const trimmed = url.trim();
      if (/^(javascript|data|vbscript):/i.test(trimmed)) {
        alert('Security error: JavaScript and data URI links are not permitted.');
        return;
      }
      const validUrl = trimmed.match(/^https?:\/\//i) ? trimmed : `https://${trimmed}`;
      exec('createLink', validUrl);
    }
  };

  const toggleRawHtml = () => {
    if (isRawHtml) {
      // Switching from Raw HTML back to WYSIWYG
      onChange(rawHtmlContent);
      setIsRawHtml(false);
    } else {
      // Switching from WYSIWYG to Raw HTML
      const currentHtml = editorRef.current ? editorRef.current.innerHTML : (value || '');
      setRawHtmlContent(currentHtml);
      onChange(currentHtml);
      setIsRawHtml(true);
    }
  };

  const handleRawHtmlChange = (e) => {
    const newHtml = e.target.value;
    setRawHtmlContent(newHtml);
    onChange(newHtml);
  };

  return (
    <div className="rte-container">
      {/* Editor Toolbar */}
      <div className="rte-toolbar" role="toolbar" aria-label="Rich text editor toolbar">
        <div className="rte-toolbar-group">
          <button
            type="button"
            className="rte-btn"
            onClick={() => exec('undo')}
            title="Undo (Ctrl+Z)"
            aria-label="Undo"
          >
            <Undo size={15} />
          </button>
          <button
            type="button"
            className="rte-btn"
            onClick={() => exec('redo')}
            title="Redo (Ctrl+Y)"
            aria-label="Redo"
          >
            <Redo size={15} />
          </button>
        </div>

        <div className="rte-toolbar-divider" />

        <div className="rte-toolbar-group">
          <button
            type="button"
            className={`rte-btn ${activeFormats.bold ? 'active' : ''}`}
            onClick={() => exec('bold')}
            title="Bold (Ctrl+B)"
            aria-label="Bold"
          >
            <Bold size={15} />
          </button>
          <button
            type="button"
            className={`rte-btn ${activeFormats.italic ? 'active' : ''}`}
            onClick={() => exec('italic')}
            title="Italic (Ctrl+I)"
            aria-label="Italic"
          >
            <Italic size={15} />
          </button>
          <button
            type="button"
            className={`rte-btn ${activeFormats.underline ? 'active' : ''}`}
            onClick={() => exec('underline')}
            title="Underline (Ctrl+U)"
            aria-label="Underline"
          >
            <Underline size={15} />
          </button>
        </div>

        <div className="rte-toolbar-divider" />

        <div className="rte-toolbar-group">
          <button
            type="button"
            className="rte-btn"
            onClick={() => handleFormatBlock('<h2>')}
            title="Heading 2 (H2)"
            aria-label="Heading 2"
          >
            <Heading2 size={16} />
          </button>
          <button
            type="button"
            className="rte-btn"
            onClick={() => handleFormatBlock('<h3>')}
            title="Heading 3 (H3)"
            aria-label="Heading 3"
          >
            <Heading3 size={16} />
          </button>
          <button
            type="button"
            className="rte-btn text-label"
            onClick={() => handleFormatBlock('<p>')}
            title="Normal Paragraph"
          >
            Paragraph
          </button>
        </div>

        <div className="rte-toolbar-divider" />

        <div className="rte-toolbar-group">
          <button
            type="button"
            className={`rte-btn ${activeFormats.insertUnorderedList ? 'active' : ''}`}
            onClick={() => exec('insertUnorderedList')}
            title="Bulleted List"
            aria-label="Bulleted List"
          >
            <List size={15} />
          </button>
          <button
            type="button"
            className={`rte-btn ${activeFormats.insertOrderedList ? 'active' : ''}`}
            onClick={() => exec('insertOrderedList')}
            title="Numbered List"
            aria-label="Numbered List"
          >
            <ListOrdered size={15} />
          </button>
          <button
            type="button"
            className="rte-btn"
            onClick={() => handleFormatBlock('<blockquote>')}
            title="Blockquote"
            aria-label="Blockquote"
          >
            <Quote size={15} />
          </button>
          <button
            type="button"
            className="rte-btn"
            onClick={() => handleFormatBlock('<pre>')}
            title="Code Block"
            aria-label="Code Block"
          >
            <Code size={15} />
          </button>
          <button
            type="button"
            className="rte-btn"
            onClick={() => exec('insertHorizontalRule')}
            title="Divider Line"
            aria-label="Divider"
          >
            <Minus size={15} />
          </button>
        </div>

        <div className="rte-toolbar-divider" />

        <div className="rte-toolbar-group">
          <button
            type="button"
            className="rte-btn"
            onClick={handleLink}
            title="Insert Link"
            aria-label="Insert Link"
          >
            <LinkIcon size={15} />
          </button>
          <button
            type="button"
            className="rte-btn"
            onClick={() => setShowMediaLibrary(true)}
            title="Insert Image from Media Library"
            aria-label="Insert Image"
          >
            <ImageIcon size={15} />
          </button>
        </div>

        <div className="rte-toolbar-spacer" />

        <div className="rte-toolbar-group">
          <button
            type="button"
            className={`rte-btn rte-mode-btn ${isRawHtml ? 'active' : ''}`}
            onClick={toggleRawHtml}
            title={isRawHtml ? 'Switch to Visual Editor' : 'Switch to Raw HTML Code'}
          >
            {isRawHtml ? (
              <>
                <Eye size={14} />
                <span>Visual</span>
              </>
            ) : (
              <>
                <Code2 size={14} />
                <span>HTML</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      {isRawHtml ? (
        <textarea
          className="rte-raw-html-textarea"
          value={rawHtmlContent}
          onChange={handleRawHtmlChange}
          placeholder="<h1>Write HTML here...</h1>"
          rows={22}
          spellCheck={false}
        />
      ) : (
        <div
          ref={editorRef}
          className="rte-editor-content"
          contentEditable
          onInput={handleInput}
          onKeyUp={checkActiveFormats}
          onMouseUp={checkActiveFormats}
          onBlur={() => checkActiveFormats()}
          onFocus={checkActiveFormats}
          suppressContentEditableWarning
          data-placeholder={placeholder}
          role="textbox"
          aria-multiline="true"
        />
      )}

      {/* Editor Footer Stats */}
      <div className="rte-footer">
        <span className="rte-stat">
          <strong>{wordCount}</strong> words
        </span>
        <span className="rte-stat-dot">•</span>
        <span className="rte-stat">
          ~<strong>{readTimeMinutes}</strong> min read
        </span>
      </div>

      {showMediaLibrary && (
        <MediaLibrary 
          isModal={true} 
          onClose={() => setShowMediaLibrary(false)} 
          onSelect={(item) => {
            if (editorRef.current) {
              editorRef.current.focus();
              exec('insertImage', item.url);
            }
            setShowMediaLibrary(false);
          }} 
        />
      )}
    </div>
  );
}
