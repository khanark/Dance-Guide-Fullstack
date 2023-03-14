import './LoginForm.scss';

import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import DatabaseError from '../Errors/Database/DatabaseError';
import FieldsError from '../Errors/Fields/FieldsError';
import { IoLogIn } from 'react-icons/io5';
import { login } from '../../../services/users';

const LoginForm = () => {
  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  const navigate = useNavigate();

  const onChangeHandler = e => {
    const { name, value } = e.target;
    setFormFields(f => (f = { ...formFields, [name]: value }));
  };

  const onSubmitHandler = async e => {
    e.preventDefault();
    setErrors(validateForm(formFields));
    setIsSubmitClicked(true);
  };

  const validateForm = fields => {
    const errors = {};
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;

    if (!fields.email) {
      errors.email = 'Моля въведете имейл адрес';
    } else if (!regex.test(fields.email)) {
      errors.email = 'Невалиден формат на имейл адрес';
    }
    if (!fields.password) {
      errors.password = 'Моля въведете парола';
    }
    return errors;
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitClicked) {
      login(formFields.email, formFields.password)
        .then(() => navigate('/catalog'))
        .catch(err => {
          setErrors(
            oldValues =>
              (oldValues = {
                ...errors,
                fetch: 'Невалидно потребителско име или парола.',
              })
          );
        });
    }
  }, [errors]);

  return (
    <div className="login-form">
      {errors.fetch && <DatabaseError msg={errors.fetch} />}
      <form>
        <label htmlFor="email">
          Имейл
          <input
            type="text"
            name="email"
            id="email"
            value={formFields.email}
            onChange={onChangeHandler}
          />
          <FieldsError msg={errors.email} />
        </label>
        <label htmlFor="password">
          Парола
          <input
            type="password"
            name="password"
            id="password"
            value={formFields.password}
            onChange={onChangeHandler}
          />
          <FieldsError msg={errors.password} />
          <Link to="/authentication/forgotten" className="forgotten-password">
            Забравена парола?
          </Link>
        </label>
      </form>
      <p className="no-registration">
        Нямаш регистрация?
        <span>
          <Link to="/authentication/register">Регистрай се!</Link>
        </span>
      </p>
      <button className="form-button" type="button" onClick={onSubmitHandler}>
        Вход
        <IoLogIn />
      </button>
    </div>
  );
};

export default LoginForm;
