export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Scheduled publishing is now managed centrally via GyanVaniAi Admin CMS & MongoDB backend
  return res.status(200).json({
    success: true,
    message: 'Scheduled posts are managed centrally by GyanVaniAi Admin CMS Backend.',
    timestamp: new Date().toISOString(),
  });
}
