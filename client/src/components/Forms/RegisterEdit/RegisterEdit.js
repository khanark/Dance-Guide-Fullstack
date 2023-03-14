import './RegisterEdit.scss';

import { Link } from 'react-router-dom';

const RegisterEdit = props => {
  const formType = props.formType;
  return (
    <div className="register-form">
      <form action="">
        <label htmlFor="email">
          Имейл *
          <input type="text" name="email" id="email" />
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
        {formType === 'register' ? (
          <label htmlFor="password">
            Парола *
            <input type="password" name="password" id="password" />
          </label>
        ) : (
          <Link to="/authentication/forgotten" className="forgotten-password">
            Смяна на паролата?
          </Link>
        )}
      </form>
      {formType === 'register' && (
        <p className="no-registration">
          Вече си част от нас?
          <span>
            <Link to="/authentication/login">Вход!</Link>
          </span>
        </p>
      )}
      <button type="submit">{props.action}</button>
    </div>
  );
};

export default RegisterEdit;
