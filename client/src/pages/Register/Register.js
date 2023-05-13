import "../../assets/styles/Form.css";
import "./Register.css";

import { useEffect, useState } from "react";

import FieldsError from "../../components/Forms/Errors/Fields/FieldsError";
import Layout from "../../components/Layout/Layout";
import PageContainer from "../../components/FramerContainer";
import { Spinner } from "@chakra-ui/react";
import { registerSchemaValidation } from "../../YupSchemas/validation_schema";
import { registerUser } from "../../services/users";
import { setPageTitle } from "../../util/util";
import { useForm } from "react-hook-form";
import { useNotification } from "../../hooks/useNotification";
import { useUserContext } from "../../contexts/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPageTitle("Sign Up");
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(registerSchemaValidation),
  });

  const { navigate, setEmail } = useUserContext();
  const { notificateError, notificateSuccess } = useNotification();

  const onSubmitRegister = async (data) => {
    try {
      setIsLoading(true);
      await registerUser(data);
      notificateSuccess({
        title: "Успешна регистрация",
        description: "Благодарим за вашата регистрация",
      });
      setTimeout(() => navigate("/login"), 1500);
      setEmail(data.email.toLowerCase());
    } catch (error) {
      setIsLoading(false);
      notificateError({
        title: "Грешка при регистрация",
        description: "Потребител с този имейл адрес вече съществува",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout authPage="register">
      <div className="form-wrapper section">
        <form className="form">
          <h2 className="title-secondary">Let's get started</h2>
          <p className="form-desc">Experience more, sign up with us!</p>
          <div className="form-grid--wrapper">
            <label htmlFor="firstName" className="form-label">
              <p className="input-label">First name</p>
              <input className="form-input" {...register("firstName")} />
              <FieldsError msg={errors.firstName?.message} />
            </label>
            <label htmlFor="lastName" className="form-label">
              <p className="input-label">Last name</p>
              <input className="form-input" {...register("lastName")} />
              <FieldsError msg={errors.lastName?.message} />
            </label>
          </div>
          <label htmlFor="email" className="form-label">
            <p className="input-label">Email</p>
            <input className="form-input" {...register("email")} />
            <FieldsError msg={errors.email?.message} />
          </label>
          <label htmlFor="phoneNumber" className="form-label">
            <div className="form-number--prepend">
              <p className="phone-prefix">+359 (0)</p>
              <input
                className="form-input"
                type="number"
                placeholder="877 558 277, 08 775 582 77"
                {...register("phoneNumber")}
              />
            </div>
            <FieldsError msg={errors.phoneNumber?.message} />
          </label>

          <label htmlFor="password" className="form-label">
            <p className="input-label">Password</p>
            <input
              className="form-input"
              type="password"
              {...register("password")}
            />
            <FieldsError msg={errors.password?.message} />
          </label>

          <label htmlFor="repass" className="form-label">
            <p className="input-label">Password repeat</p>
            <input
              className="form-input"
              type="password"
              {...register("repeatedPassword")}
            />
            <FieldsError msg={errors.repeatedPassword?.message} />
          </label>
          <div className="btn-wrapper">
            <button
              type="submit"
              className="btn form-btn"
              disabled={isLoading}
              onClick={handleSubmit(onSubmitRegister)}
            >
              {isLoading && <Spinner className="btn-spinner" />}
              Register
            </button>
            {isLoading && <p className="btn-desc">Please wait...</p>}
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
