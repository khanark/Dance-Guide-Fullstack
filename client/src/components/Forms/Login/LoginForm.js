import './LoginForm.scss';

import { IoLogIn } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { login } from '../../../services/users';
import { useState } from 'react';

const LoginForm = () => {
  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  });

  const onChangeHandler = e => {
    const { name, value } = e.target;
    setFormFields(f => (f = { ...formFields, [name]: value }));
  };

  const onSubmitHandler = async e => {
    // !FIX this the fetching is not working properly
    console.log('button is clicked');
    const { email, password } = formFields;
    try {
      await login(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-form">
      <form>
        <label htmlFor="email">
          Имейл
          <input
            type="text"
            name="email"
            id="email"
            placeholder="ivan@danceguide.bg"
            value={formFields.email}
            onChange={onChangeHandler}
          />
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
