import { useEffect, useState } from 'react';

import CustomSpinner from '../../components/Spinner/Spinner';
import FieldsError from '../../components/Forms/Errors/Fields/FieldsError';
import Layout from '../../components/Layout/Layout';
import { Spinner } from '@chakra-ui/react';
import schoolsFactory from '../../services/schools';
import { setPageTitle } from '../../util/util';
import { useForm } from 'react-hook-form';
import { useNotification } from '../../hooks/useNotification';
import { useParams } from 'react-router-dom';
import { useUploadAvatar } from '../../hooks/useUploadAvatar';
import { useUserContext } from '../../contexts/AuthContext';

const SchoolEdit = () => {
    const { schoolId } = useParams();
    const { singleSchool, updateSchool } = schoolsFactory();
    const [uploadedAvatar, preloadAvatar] = useUploadAvatar();
    const [httpLoading, setHttpLoading] = useState(false);

    useEffect(() => {
        setPageTitle('Редактиране на обява');
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors, isLoading, isDirty },
    } = useForm({
        defaultValues: async () => await singleSchool(schoolId),
    });

    const { navigate } = useUserContext();
    const { notificateError, notificateSuccess } = useNotification();

    const handleAvatarChange = (e) => {
        preloadAvatar(e.target.files[0]);
    };

    const onSubmit = async (data) => {
        if (!isDirty && !uploadedAvatar) return;
        try {
            setHttpLoading(true);
            await updateSchool(schoolId, {
                ...data,
                image: uploadedAvatar || data.image,
                isImageFile: Boolean(uploadedAvatar),
            });
            notificateSuccess({
                title: 'Успешно редактиране',
                description: `Промените бяха запазени успешно`,
            });
            setTimeout(() => navigate('/user/profile'), 1500);
        } catch (error) {
            setHttpLoading(false);
            notificateError({
                title: 'Грешка при запазване',
                description: 'Имаше грешка при запазването на промените',
            });
        } finally {
            setHttpLoading(false);
        }
    };

    const linkRegex = /^https?:\/\//;

    return (
        <Layout>
            {httpLoading && (
                <Spinner style={{ alignSelf: 'center', marginTop: '25px' }} />
            )}
            <div className="create-page">
                <div className="form-container">
                    {isLoading ? (
                        <CustomSpinner />
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label htmlFor="name">
                                Име
                                <input
                                    className="margin-input"
                                    {...register('name', {
                                        required: 'Моля въведете име',
                                        minLength: {
                                            value: 4,
                                            message:
                                                'Името трябва да съдържа най - малко 4 символа',
                                        },
                                        maxLength: {
                                            value: 20,
                                            message:
                                                'Името не може да бъде по - дълго от 20 символа',
                                        },
                                    })}
                                />
                                <FieldsError msg={errors.name?.message} />
                            </label>
                            <label htmlFor="image">
                                Снимка
                                <input
                                    className="margin-input"
                                    type="file"
                                    {...register('image', {
                                        validate: {
                                            lessThan5MB: (files) => {
                                                if (!uploadedAvatar) return;
                                                return (
                                                    files[0]?.size < 5000000 ||
                                                    'Максимален размер 5MB'
                                                );
                                            },
                                            acceptedFormats: (files) => {
                                                if (!uploadedAvatar) return;
                                                return (
                                                    [
                                                        'image/jpeg',
                                                        'image/png',
                                                    ].includes(
                                                        files[0]?.type
                                                    ) ||
                                                    'Само формати: jpeg/png'
                                                );
                                            },
                                        },
                                    })}
                                    onChange={handleAvatarChange}
                                />
                                <FieldsError msg={errors.image?.message} />
                            </label>

                            <label htmlFor="schoolType">
                                Тип на училището
                                <select
                                    className="margin-input"
                                    {...register('schoolType', {
                                        required:
                                            'Моля изберете тип на училището',
                                    })}
                                >
                                    <option value="1">Класически балет</option>
                                    <option value="2">Съвременни танци</option>
                                    <option value="3">
                                        Оритенталски танци
                                    </option>
                                    <option value="4">Народни танци</option>
                                    <option value="5">Хип - Хоп танци</option>
                                    <option value="6">Спортни танци</option>
                                    <option value="7">Други</option>
                                </select>
                            </label>

                            <label htmlFor="adress">
                                Адрес
                                <div className="address-container">
                                    <div className="settlement-wrapper">
                                        <input
                                            placeholder="населено място"
                                            className="settlement"
                                            {...register('settlement', {
                                                required:
                                                    'Моля въведете населено място',
                                                minLength: {
                                                    value: 3,
                                                    message:
                                                        'Населеното място трябва да съдържа най - малко 3 символа',
                                                },
                                                maxLength: {
                                                    value: 15,
                                                    message:
                                                        'Населеното място не може да бъде по - дълго от 15 символа',
                                                },
                                            })}
                                        />
                                        <FieldsError
                                            msg={errors.settlement?.message}
                                        />
                                    </div>
                                    <div className="street-wrapper">
                                        <input
                                            placeholder="улица"
                                            className="street"
                                            {...register('street', {
                                                required: 'Моля въведете улица',
                                                minLength: {
                                                    value: 3,
                                                    message:
                                                        'Улицата трябва да съдържа най - малко 3 символа',
                                                },
                                            })}
                                        />
                                        <FieldsError
                                            msg={errors.street?.message}
                                        />
                                    </div>
                                </div>
                            </label>

                            <label htmlFor="link">
                                Официален сайт
                                <input
                                    className="margin-input"
                                    {...register('link', {
                                        required:
                                            'Моля добавете официална страница',
                                        pattern: {
                                            value: linkRegex,
                                            message: 'Невалиден URL адрес',
                                        },
                                    })}
                                />
                                <FieldsError msg={errors.link?.message} />
                            </label>
                            <label htmlFor="description">
                                Описание
                                <textarea
                                    className="school-description"
                                    {...register('description', {
                                        required: 'Моля добавете описание',
                                        minLength: {
                                            value: 10,
                                            message:
                                                'Описанието трябва да съдържа най - малко 10 символа',
                                        },
                                        maxLength: {
                                            value: 300,
                                            message:
                                                'Описанието не може да бъде по - дълго от 300 символа',
                                        },
                                    })}
                                />
                                <FieldsError
                                    msg={errors.description?.message}
                                />
                            </label>
                            <button type="submit" disabled={httpLoading}>
                                Запазване
                            </button>
                        </form>
                    )}
                </div>
                <div className="side-image">
                    <img
                        id="dance-image"
                        src="https://t3.ftcdn.net/jpg/03/72/71/80/360_F_372718076_pLwDA6fUUDDWvgETtDOr67dUymN8Nzb3.jpg"
                        alt="dance"
                    />
                    <div className="heading">
                        <p>
                            <span className="heading-public">Публикувай</span>{' '}
                            своя танцов{' '}
                            <span className="heading-business">бизнес!</span>
                        </p>
                        <p>
                            Нека <span>цяла България</span> научи за това!
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default SchoolEdit;
