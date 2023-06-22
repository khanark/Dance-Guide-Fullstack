import './UploadAvatarModal.css';

import { AdvancedImage, lazyload, responsive } from '@cloudinary/react';
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import FieldsError from '../../Forms/Errors/Fields/FieldsError';
import { Spinner } from '@chakra-ui/react';
import defaultAvatar from '../../../assets/images/blank-avatar-image.jpg';
import { editUserAvatar } from '../../../services/users';
import { uploadUserAvatar } from '../../../YupSchemas/validation_schema';
import { useCloudinaryImage } from '../../../hooks/useCloudinaryImage';
import { useDisclosure } from '@chakra-ui/react';
import { useUserContext } from '../../../contexts/AuthContext';

const UploadAvatarModal = ({ avatar, _id, setUser }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setUser: setContextUser } = useUserContext();

  const [previewImage, setPreviewImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [base64Image, setBase62Image] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [imageError, setImageError] = useState(null)

  const parseTo64BaseString = async file => {
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      setBase62Image(reader.result);
    };
  };

  const onChangeImage = e => {   

    // uploadUserAvatar.validate({ image: e.target.files[0] }).catch(err =>  {
    //   setImageError(err.message)
    // });
    
    setSelectedImage(e.target.files[0]);
    parseTo64BaseString(e.target.files[0]);
  };

  useEffect(() => {
    if (!selectedImage) {
      return;
    }
  
    const imageToPreview = URL.createObjectURL(selectedImage);
    setPreviewImage(imageToPreview);
    return () => URL.revokeObjectURL(imageToPreview);
  }, [selectedImage]);

  const onImageSubmit = async () => {
    setIsLoading(true);
    const updatedUser = await editUserAvatar(_id, base64Image);
    // here we are setting the user for the current profile page
    setUser(prevUser => ({ ...prevUser, ...updatedUser }));
    // here we are setting the user for the entire context
    setContextUser(updatedUser);
    setIsLoading(false);
    onClose();
  };

  const userImage = useCloudinaryImage(avatar);

  return (
    <>
      <button htmlFor="image" className="image-label" onClick={onOpen}>
        Change Avatar
      </button>
      <Modal isOpen={isOpen} onClose={onClose} size={'md'}>
        <ModalOverlay />
        <ModalContent p={6}>
          <div className="modal-header">
            <h4 className="modal-title">Profile picture</h4>
            <p className="modal-description">Enhance your profile with a captivating picture!</p>
          </div>
          <div className="image-wrapper">
            {selectedImage && (
              <img src={previewImage} alt="preview" className="user-profile--img" />
            )}
            {!selectedImage && (
              <>
                {avatar ? (
                  <AdvancedImage
                    cldImg={userImage}
                    className="user-profile--img"
                    plugins={[lazyload(), responsive()]}
                  />
                ) : (
                  <img src={defaultAvatar} className="user-profile--img" alt="user-avatar" />
                )}
              </>
            )}
            <form>
              <input type="file" id="image" className="image-input" onChange={onChangeImage} />
              <label htmlFor="image" className="image-label">
                {avatar || previewImage ? 'Change' : 'Upload'}
              </label>
            </form>
          </div>
            {/* <FieldsError msg={imageError}  style={{textAlign: "center"}}/> */}
          <div className="form-btns modal-btns">
            <button type="button" className="btn btn-modal btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <div className="btn-wrapper">
              <button type="submit" className="btn btn-modal" onClick={onImageSubmit}>
                {isLoading && <Spinner className="btn-spinner modal-spinner" />}
                Save
              </button>
              {isLoading && <p className="btn-desc">Updating...</p>}
            </div>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UploadAvatarModal;
