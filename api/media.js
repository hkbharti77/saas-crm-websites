import { v2 as cloudinary } from 'cloudinary';

if (process.env.CLOUDINARY_URL) {
  cloudinary.config({
    cloudinary_url: process.env.CLOUDINARY_URL,
    secure: true,
  });
}

export default async function handler(req, res) {
  const { path: rawPath } = req.query || {};
  let mediaKey = rawPath;

  if (!mediaKey) {
    const urlParts = (req.url || '').split('/media/');
    mediaKey = urlParts[1] || '';
  }

  if (!mediaKey) {
    return res.status(400).json({ error: 'Missing media path' });
  }

  mediaKey = mediaKey.replace(/^\/+/, '').split('?')[0];

  try {
    const secureUrl = cloudinary.url(mediaKey, {
      secure: true,
      resource_type: 'image',
    });

    const response = await fetch(secureUrl);

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Media asset not found' });
    }

    const contentType = response.headers.get('content-type') || 'image/png';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

    const arrayBuffer = await response.arrayBuffer();
    return res.status(200).send(Buffer.from(arrayBuffer));
  } catch (error) {
    console.error('Server Media Fetch Error');
    return res.status(404).json({ error: 'Media asset not found' });
  }
}
