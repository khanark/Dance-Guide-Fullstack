import "./LoginForm.scss";

import { IoEye, IoEyeOff, IoLogIn } from "react-icons/io5";

import DatabaseError from "../../components/Forms/Errors/Database/DatabaseError";
import FieldsError from "../../components/Forms/Errors/Fields/FieldsError";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import { login } from "../../services/users";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useUserContext } from "../../contexts/AuthContext";

const Login = () => {
  const [eye, setEye] = useState(false);
  const [fetchState, setFetchState] = useState({
    isLoading: false,
    fetchError: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setUser, navigate, toast } = useUserContext();

  const onSubmitLogin = async (data) => {
    try {
      setFetchState({ ...fetchState, isLoading: true, fetchError: false });
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
      setFetchState({ ...fetchState, isLoading: false, fetchError: true });
    }
  };

  return (
    <Layout>
      <div className="login-form">
        {fetchState.isLoading && <Spinner style={{ marginBottom: "25px" }} />}
        <form>
          {fetchState.fetchError && (
            <DatabaseError msg={"Невалидно потребителско име или парола"} />
          )}
          <label htmlFor="email">
            Имейл
            <input
              {...register("email", {
                required: "Задължително поле",
                pattern: {
                  value: /^[\w-.]+@([\w-]+.)+[\w-]{2,}$/,
                  message: "Невалиден имейл адрес",
                },
              })}
            />
            <FieldsError msg={errors.email?.message} />
          </label>
          <label htmlFor="password">
            Парола
            <div style={{ position: "relative" }}>
              <input
                type={eye ? "text" : "password"}
                {...register("password", {
                  required: "Задължително поле",
                })}
              />
              <button
                className="eye-btn"
                type="button"
                onClick={() => setEye(!eye)}
              >
                {eye ? <IoEye /> : <IoEyeOff />}
              </button>
            </div>
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
          disabled={fetchState.isLoading}
          onClick={handleSubmit(onSubmitLogin)}
        >
          Вход
          <IoLogIn />
        </button>
      </div>
    </Layout>
  );
};

export default Login;
