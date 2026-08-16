import { v2 as cloudinary } from 'cloudinary';

if (process.env.CLOUDINARY_URL) {
  cloudinary.config({
    cloudinary_url: process.env.CLOUDINARY_URL,
    secure: true,
  });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { imageBase64, fileName, contentType } = req.body || {};

    if (!imageBase64) {
      return res.status(400).json({ error: 'Missing required image parameters (imageBase64)' });
    }

    const dataUri = imageBase64.startsWith('data:')
      ? imageBase64
      : `data:${contentType || 'image/png'};base64,${imageBase64}`;

    const cleanFileName = (fileName || 'image')
      .toLowerCase()
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-z0-9]/g, '-');

    const uploadResponse = await cloudinary.uploader.upload(dataUri, {
      folder: 'blog',
      public_id: `${Date.now()}-${cleanFileName}`,
      resource_type: 'auto',
    });

    const host = req.headers.host || 'gyanvaniai.online';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const maskedUrl = `${protocol}://${host}/media/${uploadResponse.public_id}`;

    return res.status(200).json({
      success: true,
      url: maskedUrl,
      key: uploadResponse.public_id,
    });
  } catch (error) {
    console.error('Server Upload Error');
    return res.status(500).json({
      error: 'Failed to upload image',
    });
  }
}

