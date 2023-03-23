import "./LoginForm.scss";

import { useForm } from "react-hook-form";
import { IoLogIn } from "react-icons/io5";
import { Link } from "react-router-dom";
import DatabaseError from "../../components/Forms/Errors/Database/DatabaseError";
import FieldsError from "../../components/Forms/Errors/Fields/FieldsError";
import Layout from "../../components/Layout/Layout";
import PageContainer from "../../components/Layout/PageContainer/PageContainer";
import { useUserContext } from "../../contexts/UserContext";

const Login = () => {
  const { onSubmitLogin, fetchError } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Layout>
      <PageContainer styles={{ flexDirection: "column", gap: "20px" }}>
        <div className="login-form">
          {fetchError && (
            <DatabaseError msg={"Невалидно потребителско име или парола"} />
          )}
          <form>
            <label htmlFor="email">
              Имейл
              <input
                {...register("email", {
                  required: "Моля въведете имейл адрес",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+.)+[\w-]{2,}$/,
                    message: "Невалиден имейл формат",
                  },
                })}
              />
              <FieldsError msg={errors.email?.message} />
            </label>
            <label htmlFor="password">
              Парола
              <input
                type="password"
                {...register("password", { required: "Моля въведете парола" })}
              />
              <FieldsError msg={errors.password?.message} />
              <Link to="/user/forgotten" className="forgotten-password">
                Забравена парола?
              </Link>
            </label>
          </form>
          <p className="no-registration">
            Нямаш регистрация?
            <span>
              <Link to="/register">Регистрай се!</Link>
            </span>
          </p>
          <button
            className="form-button"
            type="button"
            onClick={handleSubmit(onSubmitLogin)}
          >
            Вход
            <IoLogIn />
          </button>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default Login;
