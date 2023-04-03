import "./LoginForm.scss";

import DatabaseError from "../../components/Forms/Errors/Database/DatabaseError";
import FieldsError from "../../components/Forms/Errors/Fields/FieldsError";
import { IoLogIn } from "react-icons/io5";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import PageContainer from "../../components/Layout/PageContainer/PageContainer";
import { login } from "../../services/users";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useUserContext } from "../../contexts/AuthContext";

const Login = () => {
  const [fetchError, setFetchError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setUser, navigate, toast } = useUserContext();

  const onSubmitLogin = async (data) => {
    try {
      const userData = await login(data);
      toast({
        title: "Успешно влизане",
        description: `Привет ${userData.firstName} !!!`,
        position: "top",
        status: "success",
        duration: 2000,
        isClosable: false,
      });
      setUser(userData);
      setTimeout(() => navigate("/catalog"), 2500);
    } catch (error) {
      setFetchError(true);
    }
  };

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
