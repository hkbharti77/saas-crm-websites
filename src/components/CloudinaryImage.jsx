import React, { useMemo } from 'react';
import { AdvancedImage, responsive, placeholder } from '@cloudinary/react';
import { fill, scale, fit, limitFit } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto as autoFormat } from '@cloudinary/url-gen/qualifiers/format';
import { auto as autoQuality } from '@cloudinary/url-gen/qualifiers/quality';
import { cld } from '../config/cloudinary';

/**
 * Reusable Cloudinary Optimized Image Component
 * 
 * @param {string} publicId - Cloudinary asset public ID (e.g. 'hero_dashboard' or 'saas-crm/logo')
 * @param {number} [width] - Target width in pixels
 * @param {number} [height] - Target height in pixels
 * @param {'fill'|'scale'|'fit'|'limitFit'} [cropMode='fill'] - Crop / resize behavior
 * @param {boolean} [useAutoGravity=true] - Focus automatically on the subject/face
 * @param {boolean} [enableResponsive=false] - Generate responsive srcSet steps
 * @param {boolean} [enableBlurPlaceholder=false] - Show blurred placeholder while loading
 * @param {string} [alt=''] - Alt text for accessibility
 * @param {string} [className=''] - CSS class name
 * @param {object} [style={}] - Inline CSS style
 */
export default function CloudinaryImage({
  publicId,
  width,
  height,
  cropMode = 'fill',
  useAutoGravity = true,
  enableResponsive = false,
  enableBlurPlaceholder = false,
  alt = '',
  className = '',
  style = {},
  ...rest
}) {
  const cldImage = useMemo(() => {
    if (!publicId) return null;

    // Remove any leading slashes or file extensions if present
    const cleanPublicId = publicId.replace(/^\//, '').replace(/\.(png|jpg|jpeg|webp)$/i, '');
    const img = cld.image(cleanPublicId);

    // Apply resizing if dimensions provided
    if (width || height) {
      let resizeAction;
      if (cropMode === 'fill') {
        resizeAction = fill();
        if (useAutoGravity) {
          resizeAction.gravity(autoGravity());
        }
      } else if (cropMode === 'scale') {
        resizeAction = scale();
      } else if (cropMode === 'fit') {
        resizeAction = fit();
      } else {
        resizeAction = limitFit();
      }

      if (width) resizeAction.width(width);
      if (height) resizeAction.height(height);

      img.resize(resizeAction);
    }

    // Auto format (WebP/AVIF depending on browser support) and auto compression
    img.delivery(format(autoFormat())).delivery(quality(autoQuality()));

    return img;
  }, [publicId, width, height, cropMode, useAutoGravity]);

  if (!cldImage) {
    return null;
  }

  const plugins = [];
  if (enableResponsive) {
    plugins.push(responsive({ steps: [320, 640, 768, 1024, 1280] }));
  }
  if (enableBlurPlaceholder) {
    plugins.push(placeholder({ mode: 'blur' }));
  }

  return (
    <AdvancedImage
      cldImg={cldImage}
      plugins={plugins}
      alt={alt}
      className={className}
      style={style}
      {...rest}
    />
  );
}
