import '../../../assets/styles/Form.css';
import '../generalModalStyles.css';

import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';

import FieldsError from '../../Forms/Errors/Fields/FieldsError';
import { Spinner } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useSchoolContext } from '../../../contexts/SchoolContext';
import { useState } from 'react';

const EditSchoolModal = ({
    name,
    schoolType,
    settlement,
    street,
    link,
    description,
    _id,
    updateSchool,
    updateSchoolState,
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { isDirty, errors },
    } = useForm({
        values: { name, schoolType, settlement, street, link, description },
    });

    const onSubmit = async (data) => {
        console.log(data);
        if (!isDirty) {
            return;
        }
        setIsLoading(true);
        // write the fetch function
        updateSchool(_id, data)
            .then((school) => {
                updateSchoolState(school);
            })
            .finally(() => {
                setIsLoading(false);
            });
        onClose();
    };

    return (
        <>
            <button
                type="button"
                className="line-devider--text devider-text--right"
                onClick={onOpen}
            >
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
                    <form
                        className="form"
                        style={{ width: '100%' }}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <label htmlFor="name" className="form-label">
                            <p className="input-label">Name</p>
                            <input
                                type="text"
                                className="form-input"
                                {...register('name')}
                            />
                            <FieldsError msg={errors.name?.message} />
                        </label>
                        <label htmlFor="schoolType" className="form-label">
                            <p className="input-label">Style</p>
                            <select
                                className="form-input"
                                {...register('schoolType')}
                            >
                                <option value="1">Classical Ballet</option>
                                <option value="2">Modern Dances</option>
                                <option value="3">Oriental Dances</option>
                                <option value="4">Folklore Dances</option>
                                <option value="5">Hip - Hop Dances</option>
                                <option value="6">Sport Dances</option>
                                <option value="7">Other</option>
                            </select>
                            <FieldsError msg={errors.schoolType?.message} />
                        </label>
                        <div className="form-grid--wrapper">
                            <label htmlFor="settlement" className="form-label">
                                <p className="input-label">City</p>
                                <input
                                    className="form-input"
                                    {...register('settlement')}
                                />
                                <FieldsError msg={errors.settlement?.message} />
                            </label>
                            <label htmlFor="street" className="form-label">
                                <p className="input-label">Street</p>
                                <input
                                    className="form-input"
                                    {...register('street')}
                                />
                                <FieldsError msg={errors.street?.message} />
                            </label>
                        </div>
                        <label htmlFor="link" className="form-label">
                            <p className="input-label">Website</p>
                            <input
                                className="form-input"
                                {...register('link')}
                            />
                            <FieldsError msg={errors.link?.message} />
                        </label>
                        <label htmlFor="description" className="form-label">
                            <p className="input-label">Description</p>
                            <textarea
                                className="form-input"
                                {...register('description')}
                            ></textarea>
                            <FieldsError msg={errors.description?.message} />
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
                                    Save
                                </button>
                                {isLoading && (
                                    <p className="btn-desc">Updating...</p>
                                )}
                            </div>
                        </div>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
};

export default EditSchoolModal;
