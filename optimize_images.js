import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public');

// Only convert specific large PNGs or all PNGs in public/
const convertToWebP = async () => {
  const files = fs.readdirSync(publicDir);
  
  for (const file of files) {
    if (file.endsWith('.png')) {
      const inputPath = path.join(publicDir, file);
      const outputPath = path.join(publicDir, file.replace('.png', '.webp'));
      
      console.log(`Converting ${file} to WebP...`);
      
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
        
      console.log(`Converted: ${outputPath}`);
      // Uncomment the following line if we want to delete original PNGs
      // fs.unlinkSync(inputPath);
    }
  }
  
  console.log('Done converting images!');
};

convertToWebP().catch(console.error);
