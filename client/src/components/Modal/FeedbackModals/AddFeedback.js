import './AddFeedback.css';

import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';

import FieldsError from '../../Forms/Errors/Fields/FieldsError';
import { Spinner } from '@chakra-ui/react';
import { addFeedback } from '../../../services/feedbacks';
import { useDisclosure } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useUserContext } from '../../../contexts/AuthContext';

const AddFeedbackModal = ({ schoolId, addFeedbackToState }) => {
  const { user } = useUserContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm();

  const onSubmit = async data => {
    setIsLoading(true);
    const school = await addFeedback(schoolId, {
      owner: user._id,
      text: data.text,
    });
    setIsLoading(false);
    reset();
    onClose();
    addFeedbackToState(school.feedbacks.at(-1));
  };

  return (
    <>
      <button type="button" className="btn-feedback" onClick={onOpen}>
        Write my review
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form
            className="form"
            style={{ width: '100%' }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="text" className="form-label">
              <textarea
                type="text"
                className="form-input"
                {...register('text')}
              />
              <FieldsError msg={errors.text?.message} />
            </label>
            <div className="form-btns">
              <button
                type="button"
                className="btn btn-modal btn-cancel"
                onClick={onClose}
              >
                Cancel
              </button>
              <div className="btn-wrapper">
                <button type="submit" className="btn btn-modal">
                  {isLoading && (
                    <Spinner className="btn-spinner modal-spinner" />
                  )}
                  Send
                </button>
                {isLoading && <p className="btn-desc">Sending...</p>}
              </div>
            </div>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddFeedbackModal;
