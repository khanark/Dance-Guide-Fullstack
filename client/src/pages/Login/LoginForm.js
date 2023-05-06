import "../../assets/styles/Form.css";

import { IoEye, IoEyeOff, IoLogIn } from "react-icons/io5";
import { useEffect, useState } from "react";

import FieldsError from "../../components/Forms/Errors/Fields/FieldsError";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import { login } from "../../services/users";
import { setPageTitle } from "../../util/util";
import { useForm } from "react-hook-form";
import { useNotification } from "../../hooks/useNotification";
import { useUserContext } from "../../contexts/AuthContext";

const Login = () => {
  const [eye, setEye] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPageTitle("Login");
  }, []);

  const { notificateSuccess, notificateError } = useNotification();

  const { setUser, navigate, email, setEmail } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email }, mode: "onBlur" });

  const onSubmitLogin = async (data) => {
    try {
      setIsLoading(true);
      const userData = await login(data);
      notificateSuccess({
        title: "Успешно влизане",
        description: `Привет ${userData.firstName} !!!`,
      });
      setUser({ ...userData, isNewAcc: Boolean(email) });
      setEmail("");
      setTimeout(() => navigate("/catalog"), 1500);
    } catch (error) {
      setIsLoading(false);
      notificateError({
        title: "Грешка при влизане",
        description: "Грешно потребителско име или парола",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout authPage="login">
      <div className="form-wrapper section">
        {isLoading && <Spinner style={{ marginBottom: "25px" }} />}
        <form className="form">
          <label htmlFor="email" className="form-label">
            <p className="input-label">Email</p>
            <input
              className="form-input"
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
          <label htmlFor="password" className="form-label">
            <p className="input-label">Password</p>
            <div style={{ position: "relative" }}>
              <input
                className="form-input"
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
          </label>
          <button
            className="btn"
            type="button"
            disabled={isLoading}
            onClick={handleSubmit(onSubmitLogin)}
          >
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
