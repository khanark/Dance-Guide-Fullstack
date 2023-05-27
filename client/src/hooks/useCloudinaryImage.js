import { Cloudinary } from '@cloudinary/url-gen';
import { useState } from 'react';

export const useCloudinaryUserImage = () => {
  const [cloudinaryUserImage, setCloudinaryUserImage] = useState(null);
  const setupCloudinaryImage = img => {
    const cld = new Cloudinary({
      cloud: {
        cloudName: 'du4uhmyq2',
      },
    });
    setCloudinaryUserImage(cld.image(img));
  };
  return { cloudinaryUserImage, setupCloudinaryImage };
};

export const useCloudinaryImage = img => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'du4uhmyq2',
    },
  });
  return cld.image(img);
};
