import './Register.scss';

import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="site-register__form">
      <form action="">
        <label htmlFor="email">
          Имейл *
          <input
            type="text"
            name="email"
            id="email"
            placeholder="пр. ivan@danceguide.bg"
          />
        </label>
        <label htmlFor="firstName">
          Име *
          <input type="text" name="firstName" id="firstName" />
        </label>
        <label htmlFor="lastName">
          Фамилия *
          <input type="text" name="lastName" id="lastName" />
        </label>
        <label htmlFor="phoneNumber">
          Телефонен Номер *
          <input type="text" name="phoneNumber" id="phoneNumber" />
        </label>
        <label htmlFor="password">
          Парола *
          <input type="password" name="password" id="password" />
        </label>
      </form>
      <p className="no-registration">
        Вече си част от нас?
        <span>
          <Link to="/authentication/login">Вход!</Link>
        </span>
      </p>
      <button type="submit">
        Регистрация
        {/* <IoLogIn /> */}
      </button>
    </div>
  );
};

export default Register;
