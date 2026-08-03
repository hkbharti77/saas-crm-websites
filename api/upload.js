import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

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

    if (!imageBase64 || !fileName) {
      return res.status(400).json({ error: 'Missing required image parameters (imageBase64, fileName)' });
    }

    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    const timestamp = Date.now();
    const cleanFileName = fileName.toLowerCase().replace(/[^a-z0-9.]/g, '-');
    const s3Key = `blog/${timestamp}-${cleanFileName}`;

    const bucketName = process.env.AWS_S3_BUCKET_NAME || 'gyanvaniai-prod-bucket';

    const uploadCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: s3Key,
      Body: buffer,
      ContentType: contentType || 'image/png',
      CacheControl: 'public, max-age=31536000',
    });

    await s3Client.send(uploadCommand);

    const host = req.headers.host || 'gyanvaniai.online';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const maskedUrl = `${protocol}://${host}/media/${s3Key}`;

    return res.status(200).json({
      success: true,
      url: maskedUrl,
      key: s3Key,
    });
  } catch (error) {
    console.error('Server S3 Upload Error:', error);
    const cleanMsg = (error.message || '').replace(/gyanvaniai-[a-z0-9-]*|amazonaws\.com/gi, 'storage');
    return res.status(500).json({
      error: 'Failed to upload image to storage server',
      details: cleanMsg,
    });
  }
}
