import { Cloudinary } from "@cloudinary/url-gen";

export const useCloudinaryImage = (img) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "du4uhmyq2",
    },
  });

  return cld.image(img);
};
