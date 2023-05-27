import { useState } from 'react';

export const useUploadAvatar = () => {
  const [uploadedAvatar, setUploadedAvatar] = useState('');

  const preloadAvatar = image => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setUploadedAvatar(reader.result);
    };
  };

  return [uploadedAvatar, preloadAvatar];
};
