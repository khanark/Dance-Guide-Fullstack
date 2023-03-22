import './Register.scss';

import { Link, useOutletContext } from 'react-router-dom';

import DatabaseError from '../Errors/Database/DatabaseError';
import FieldsError from '../Errors/Fields/FieldsError';
import { useForm } from 'react-hook-form';

const Register = () => {
  const { fetchError, onSubmitRegister } = useOutletContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="register-form">
      {fetchError && <DatabaseError msg={'Вече има регистриран потребител със този имейл адрес'} />}
      <form>
        <label htmlFor="email">
          Имейл *
          <input
            {...register('email', {
              required: 'Моля въведете имейл адрес',
              pattern: { value: /^[\w-.]+@([\w-]+.)+[\w-]{2,}$/, message: 'Невалиден имейл формат' },
            })}
          />
          <FieldsError msg={errors.email?.message} />
        </label>
        <label htmlFor="firstName">
          Име *
          <input
            {...register('firstName', {
              required: 'Моля въведете вашето име',
              minLength: { value: 3, message: 'Името трябва да съдържа най - малко 3 символа' },
            })}
          />
          <FieldsError msg={errors.firstName?.message} />
        </label>
        <label htmlFor="lastName">
          Фамилия *
          <input
            {...register('lastName', {
              required: 'Моля въведете вашата фамилия',
              minLength: { value: 3, message: 'Фамилията трябва да съдържа най - малко 3 символа' },
            })}
          />
          <FieldsError msg={errors.lastName?.message} />
        </label>
        <label htmlFor="phoneNumber">
          Телефонен Номер *
          <input
            type="text"
            {...register('phoneNumber', {
              required: 'Моля въведете вашият телефонен номер',
              pattern: {
                value: /^(?:\+359|0)(?:87|88|89)(?:\d{7}|\d{3}\s\d{2}\s\d{2}|\d{3}-\d{2}-\d{2})$/,
                message: 'Невалиден формат на т. номер',
              },
            })}
          />
          <FieldsError msg={errors.phoneNumber?.message} />
        </label>

        <label htmlFor="password">
          Парола *
          <input
            type="password"
            {...register('password', {
              required: 'Моля въведете парола',
              minLength: { value: 4, message: 'Паролата трябва да съдържа най - малко 4 символа' },
            })}
          />
          <FieldsError msg={errors.password?.message} />
        </label>

        <Link to="/authentication/forgotten" className="forgotten-password">
          Смяна на паролата?
        </Link>
      </form>

      <p className="no-registration">
        Вече си част от нас?
        <span>
          <Link to="/user/login">Вход!</Link>
        </span>
      </p>
      <button type="submit" onClick={handleSubmit(onSubmitRegister)}>
        Регистрирай се
      </button>
    </div>
  );
};

export default Register;
