import './LoginForm.scss';

import { Link, useOutletContext } from 'react-router-dom';

import DatabaseError from '../Errors/Database/DatabaseError';
import FieldsError from '../Errors/Fields/FieldsError';
import { IoLogIn } from 'react-icons/io5';
import { useForm } from 'react-hook-form';

const Login = () => {
  const { fetchError, onSubmitLogin } = useOutletContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="login-form">
      {fetchError && <DatabaseError msg={'Невалидно потребителско име или парола'} />}
      <form>
        <label htmlFor="email">
          Имейл
          <input
            {...register('email', {
              required: 'Моля въведете имейл адрес',
              pattern: { value: /^[\w-.]+@([\w-]+.)+[\w-]{2,}$/, message: 'Невалиден имейл формат' },
            })}
          />
          <FieldsError msg={errors.email?.message} />
        </label>
        <label htmlFor="password">
          Парола
          <input type="password" {...register('password', { required: 'Моля въведете парола' })} />
          <FieldsError msg={errors.password?.message} />
          <Link to="/user/forgotten" className="forgotten-password">
            Забравена парола?
          </Link>
        </label>
      </form>
      <p className="no-registration">
        Нямаш регистрация?
        <span>
          <Link to="/user/register">Регистрай се!</Link>
        </span>
      </p>
      <button className="form-button" type="button" onClick={handleSubmit(onSubmitLogin)}>
        Вход
        <IoLogIn />
      </button>
    </div>
  );
};

export default Login;
