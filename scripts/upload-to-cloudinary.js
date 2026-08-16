import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
});

const publicDir = path.join(process.cwd(), 'public');

async function uploadLocalImages() {
  console.log('🚀 Starting Cloudinary bulk upload from public/ directory...\n');

  if (!fs.existsSync(publicDir)) {
    console.error('Directory not found:', publicDir);
    return;
  }

  const files = fs.readdirSync(publicDir);
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (imageExtensions.includes(ext) && !file.includes('favicon') && !file.includes('android-chrome') && !file.includes('apple-touch-icon')) {
      const filePath = path.join(publicDir, file);
      const fileNameWithoutExt = path.parse(file).name;
      const publicId = `saas-crm/${fileNameWithoutExt}`;

      try {
        console.log(`⏳ Uploading ${file} -> public_id: "${publicId}"...`);
        const result = await cloudinary.uploader.upload(filePath, {
          public_id: publicId,
          overwrite: true,
          resource_type: ext === '.svg' ? 'image' : 'auto',
        });
        console.log(`✅ Uploaded: ${result.secure_url}\n`);
      } catch (err) {
        console.error(`❌ Failed to upload ${file}:`, err.message);
      }
    }
  }

  console.log('✨ All images uploaded successfully to Cloudinary!');
}

uploadLocalImages().catch(console.error);
