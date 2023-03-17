import "./LoginForm.scss";

import DatabaseError from "../Errors/Database/DatabaseError";
import FieldsError from "../Errors/Fields/FieldsError";
import { IoLogIn } from "react-icons/io5";
import { Link } from "react-router-dom";
import { login } from "../../../services/users";
import { useForm } from "../../../hooks/useForm";

const LoginForm = () => {
  const {
    form: { fields, errors },
    handlers: { onChangeHandler, onSubmitHandler },
  } = useForm(
    { email: "", password: "", redirect: "/catalog" },
    login,
    (fields) => {
      const formErrors = {};
      const regex = /^[\w-.]+@([\w-]+.)+[\w-]{2,}$/;

      if (!fields.email) {
        formErrors.email = "Моля въведете имейл адрес";
      } else if (!regex.test(fields.email)) {
        formErrors.email = "Невалиден формат на имейл адрес";
      }
      if (!fields.password) {
        formErrors.password = "Моля въведете парола";
      }
      return formErrors;
    }
  );

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
            value={fields.email}
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
            value={fields.password}
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
