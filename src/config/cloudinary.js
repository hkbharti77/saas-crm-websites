import { Cloudinary } from '@cloudinary/url-gen';

export const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'xx9f2zvj';

export const cld = new Cloudinary({
  cloud: {
    cloudName: cloudName,
  },
  url: {
    secure: true,
  },
});
