import './Login.scss';

import { IoLogIn } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="site-login__form">
      <form action="">
        <label htmlFor="email">
          Имейл
          <input
            type="text"
            name="email"
            id="email"
            placeholder="ivan@danceguide.bg"
          />
        </label>
        <label htmlFor="password">
          Парола
          <input type="password" name="password" id="password" />
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
      <button type="submit">
        Вход
        <IoLogIn />
      </button>
    </div>
  );
};

export default Login;
