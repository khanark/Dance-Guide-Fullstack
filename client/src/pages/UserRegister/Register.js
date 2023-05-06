import "../../assets/styles/Form.css";

import { useEffect, useState } from "react";

import FieldsError from "../../components/Forms/Errors/Fields/FieldsError";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import { RiUserAddFill } from "react-icons/ri";
import { Spinner } from "@chakra-ui/react";
import { registerUser } from "../../services/users";
import { setPageTitle } from "../../util/util";
import { useForm } from "react-hook-form";
import { useNotification } from "../../hooks/useNotification";
import { useUserContext } from "../../contexts/AuthContext";

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
  } = useForm({ mode: "onBlur" });

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
        {isLoading && <Spinner style={{ marginBottom: "25px" }} />}
        <form className="form">
          <h2 className="title-secondary">Let's get started</h2>
          <p className="form-desc">Experience more, sign up with us!</p>
          <div className="form-names--wrapper">
            <label htmlFor="firstName" className="form-label">
              <p className="input-label">First name</p>
              <input
                className="form-input"
                {...register("firstName", {
                  required: "Задължително поле",
                  minLength: {
                    value: 3,
                    message: "Минимален брой символи 3",
                  },
                })}
              />
              <FieldsError msg={errors.firstName?.message} />
            </label>
            <label htmlFor="lastName" className="form-label">
              <p className="input-label">Last name</p>
              <input
                className="form-input"
                {...register("lastName", {
                  required: "Задължително поле",
                  minLength: {
                    value: 3,
                    message: "Минимален брой символи 3",
                  },
                })}
              />
              <FieldsError msg={errors.lastName?.message} />
            </label>
          </div>
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
          <label htmlFor="phoneNumber" className="form-label">
            <div className="form-number--wrapper">
              <span className="phone-prefix">+359 (0)</span>
              <input
                className="form-input"
                type="number"
                {...register("phoneNumber", {
                  required: "Задължително поле",
                  pattern: {
                    value:
                      /^(?:\+359|0)(?:87|88|89)(?:\d{7}|\d{3}\s\d{2}\s\d{2}|\d{3}-\d{2}-\d{2})$/,
                    message: "Невалиден телефонен номер",
                  },
                })}
              />
            </div>
            <FieldsError msg={errors.phoneNumber?.message} />
          </label>

          <label htmlFor="password" className="form-label">
            <p className="input-label">Password</p>
            <input
              className="form-input"
              type="password"
              {...register("password", {
                required: "Задължително поле",
                minLength: {
                  value: 4,
                  message: "Минимален брой символи 4",
                },
              })}
            />
            <FieldsError msg={errors.password?.message} />
          </label>

          <label htmlFor="repass" className="form-label">
            <p className="input-label">Password repeat</p>
            <input
              className="form-input"
              type="password"
              {...register("repeatedPassword", {
                required: false,
                validate: (value) =>
                  value === watch("password") || "Паролите не съвпадат",
              })}
            />
            <FieldsError msg={errors.repeatedPassword?.message} />
          </label>
          <button
            type="submit"
            className="btn"
            disabled={isLoading}
            onClick={handleSubmit(onSubmitRegister)}
          >
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
