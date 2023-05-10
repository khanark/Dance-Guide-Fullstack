import "../../assets/styles/Form.css";
import "./Login.css";

import { IoEye, IoEyeOff } from "react-icons/io5";
import { useEffect, useState } from "react";

import FieldsError from "../../components/Forms/Errors/Fields/FieldsError";
import Layout from "../../components/Layout/Layout";
import PageContainer from "../../components/FramerContainer";
import { Spinner } from "@chakra-ui/react";
import { login } from "../../services/users";
import { loginSchemaValidation } from "../../YupSchemas/validation_schema";
import { setPageTitle } from "../../util/util";
import { useForm } from "react-hook-form";
import { useNotification } from "../../hooks/useNotification";
import { useUserContext } from "../../contexts/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";

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
  } = useForm({
    defaultValues: { email },
    mode: "onBlur",
    resolver: yupResolver(loginSchemaValidation),
  });

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
        <form className="form">
          <h2 className="title-secondary">Welcome back</h2>
          <p className="form-desc">Sign in to join our community!</p>
          <label htmlFor="email" className="form-label">
            <p className="input-label">Email</p>
            <input className="form-input" {...register("email")} />
            <FieldsError msg={errors.email?.message} />
          </label>
          <label htmlFor="password" className="form-label">
            <p className="input-label">Password</p>
            <div className="password-wrapper">
              <input
                className="form-input"
                type={eye ? "text" : "password"}
                {...register("password")}
              />
              <button
                className="eye-btn"
                type="button"
                onClick={() => setEye(!eye)}
              >
                <FieldsError msg={errors.password?.message} />
                {eye ? (
                  <IoEye className="eye-icon" />
                ) : (
                  <IoEyeOff className="eye-icon" />
                )}
              </button>
            </div>
          </label>
          <button
            className="btn form-btn"
            type="button"
            disabled={isLoading}
            onClick={handleSubmit(onSubmitLogin)}
          >
            {isLoading && <Spinner className="btn-spinner" />}
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
