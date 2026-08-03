import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export default async function handler(req, res) {
  const { path: rawPath } = req.query || {};
  let s3Key = rawPath;

  if (!s3Key) {
    const urlParts = (req.url || '').split('/media/');
    s3Key = urlParts[1] || '';
  }

  if (!s3Key) {
    return res.status(400).json({ error: 'Missing media path' });
  }

  s3Key = s3Key.replace(/^\/+/, '');

  try {
    const bucketName = process.env.AWS_S3_BUCKET_NAME || 'gyanvaniai-prod-bucket';

    const getCommand = new GetObjectCommand({
      Bucket: bucketName,
      Key: s3Key,
    });

    const s3Response = await s3Client.send(getCommand);

    if (s3Response.ContentType) {
      res.setHeader('Content-Type', s3Response.ContentType);
    } else {
      res.setHeader('Content-Type', 'image/png');
    }

    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

    const byteArray = await s3Response.Body.transformToByteArray();
    return res.status(200).send(Buffer.from(byteArray));
  } catch (error) {
    console.error('Server S3 Fetch Error:', error);
    return res.status(404).json({ error: 'Media asset not found' });
  }
}
