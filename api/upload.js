import { v2 as cloudinary } from 'cloudinary';

if (process.env.CLOUDINARY_URL) {
  try {
    cloudinary.config(process.env.CLOUDINARY_URL);
  } catch (e) {
    console.warn('Cloudinary config notice in api/upload:', e);
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif'
]);

const ALLOWED_EXTENSIONS = new Set([
  'jpg',
  'jpeg',
  'png',
  'webp',
  'gif'
]);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { imageBase64, fileName, contentType } = req.body || {};

    if (!imageBase64 || typeof imageBase64 !== 'string') {
      return res.status(400).json({ error: 'Missing required image parameters (imageBase64)' });
    }

    // Size validation (Max 8MB raw file ≈ 11.5MB Base64)
    if (imageBase64.length > 12 * 1024 * 1024) {
      return res.status(400).json({ error: 'Image size exceeds the 8MB limit. Please compress before uploading.' });
    }

    // Extract & Validate MIME type
    let mimeType = (contentType || '').toLowerCase().trim();
    if (imageBase64.startsWith('data:')) {
      const match = imageBase64.match(/^data:([^;]+);base64,/i);
      if (match && match[1]) {
        mimeType = match[1].toLowerCase().trim();
      }
    }

    // Explicit rejection of SVG to prevent stored XSS attacks
    if (mimeType.includes('svg') || mimeType.includes('xml') || (fileName && fileName.toLowerCase().endsWith('.svg'))) {
      return res.status(400).json({
        error: 'SVG uploads are disabled for security reasons. Please use PNG, JPG, WebP, or GIF.'
      });
    }

    if (!ALLOWED_MIME_TYPES.has(mimeType)) {
      return res.status(400).json({
        error: `Unsupported image format (${mimeType || 'unknown'}). Allowed formats: PNG, JPG, WebP, GIF.`
      });
    }

    // File name extension validation
    const rawExt = (fileName || '').split('.').pop()?.toLowerCase();
    if (rawExt && !ALLOWED_EXTENSIONS.has(rawExt) && rawExt !== 'svg') {
      return res.status(400).json({
        error: `Invalid file extension (.${rawExt}). Allowed extensions: .png, .jpg, .jpeg, .webp, .gif.`
      });
    }

    // Magic-byte validation: inspect the actual binary header of the decoded file
    // This prevents a PNG renamed as JPG (or a script renamed as PNG) from being accepted
    const base64Data = imageBase64.startsWith('data:')
      ? imageBase64.split(',')[1]
      : imageBase64;

    if (!base64Data) {
      return res.status(400).json({ error: 'Could not parse image data.' });
    }

    const fileBuffer = Buffer.from(base64Data, 'base64');

    // Known magic bytes for allowed formats
    const MAGIC_BYTES = {
      'image/jpeg': [[0xFF, 0xD8, 0xFF]],
      'image/png':  [[0x89, 0x50, 0x4E, 0x47]],
      'image/gif':  [[0x47, 0x49, 0x46, 0x38]],
      'image/webp': null, // WEBP: bytes 8-11 are 'WEBP' in RIFF container
    };

    let magicValid = false;

    if (mimeType === 'image/webp') {
      // RIFF header: [R,I,F,F] at 0-3, 'WEBP' at 8-11
      magicValid =
        fileBuffer[0] === 0x52 && fileBuffer[1] === 0x49 &&
        fileBuffer[2] === 0x46 && fileBuffer[3] === 0x46 &&
        fileBuffer[8] === 0x57 && fileBuffer[9] === 0x45 &&
        fileBuffer[10] === 0x42 && fileBuffer[11] === 0x50;
    } else {
      const sigs = MAGIC_BYTES[mimeType] || [];
      magicValid = sigs.some(sig =>
        sig.every((byte, i) => fileBuffer[i] === byte)
      );
    }

    if (!magicValid) {
      return res.status(400).json({
        error: 'File content does not match the declared image type. Upload rejected for security.'
      });
    }

    const dataUri = imageBase64.startsWith('data:')
      ? imageBase64
      : `data:${mimeType};base64,${imageBase64}`;

    const cleanFileName = (fileName || 'image')
      .toLowerCase()
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-z0-9]/g, '-');

    const uploadResponse = await cloudinary.uploader.upload(dataUri, {
      folder: 'blog',
      public_id: `${Date.now()}-${cleanFileName}`,
      resource_type: 'image', // Strictly image (prevents raw/video/script execution)
    });

    const host = req.headers.host || 'gyanvaniai.online';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const maskedUrl = `${protocol}://${host}/media/${uploadResponse.public_id}`;

    return res.status(200).json({
      success: true,
      url: maskedUrl,
      key: uploadResponse.public_id,
    });
  } catch (err) {
    console.error('Server Upload Error:', err);
    return res.status(500).json({
      error: 'Failed to upload image. Please verify file integrity and try again.',
    });
  }
}
