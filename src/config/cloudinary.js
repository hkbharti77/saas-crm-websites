import { Cloudinary } from '@cloudinary/url-gen';

export const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'ivsmy3nx';

export const cld = new Cloudinary({
  cloud: {
    cloudName: cloudName,
  },
  url: {
    secure: true,
  },
});
