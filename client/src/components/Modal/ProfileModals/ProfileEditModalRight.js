import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';

import FieldsError from '../../Forms/Errors/Fields/FieldsError';
import { Spinner } from '@chakra-ui/react';
import { editUser } from '../../../services/users';
import { useDisclosure } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const ProfileEditModalRight = ({ firstName, lastName, city, expertise, _id, setUser }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm({ defaultValues: { firstName, lastName, city, expertise } });

  const onSubmit = async data => {
    if (!isDirty) {
      return;
    }
    setIsLoading(true);
    const updatedUser = await editUser(_id, data);
    setIsLoading(false);
    setUser(prevUser => ({ ...prevUser, ...updatedUser }));
    onClose();
  };

  return (
    <>
      <button type="button" className="line-devider--text devider-text--right" onClick={onOpen}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="line-devider--icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form className="form" style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
            <div className="form-grid--wrapper">
              <label htmlFor="firstName" className="form-label">
                <p className="input-label">First name</p>
                <input className="form-input" {...register('firstName')} />
                <FieldsError msg={errors.firstName?.message} />
              </label>
              <label htmlFor="lastName" className="form-label">
                <p className="input-label">Last name</p>
                <input className="form-input" {...register('lastName')} />
                <FieldsError msg={errors.lastName?.message} />
              </label>
            </div>
            <label htmlFor="city" className="form-label">
              <p className="input-label">City</p>
              <input className="form-input" {...register('city')} />
              <FieldsError msg={errors.city?.message} />
            </label>
            <label htmlFor="expertise" className="form-label">
              <p className="input-label">Expertise</p>
              <input className="form-input" {...register('expertise')} />
              <FieldsError msg={errors.expertise?.message} />
            </label>
            <div className="form-btns">
              <button type="button" className="btn btn-modal btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <div className="btn-wrapper">
                <button type="submit" className="btn btn-modal">
                  {isLoading && <Spinner className="btn-spinner modal-spinner" />}
                  Save
                </button>
                {isLoading && <p className="btn-desc">Updating...</p>}
              </div>
            </div>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileEditModalRight;
