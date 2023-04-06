import "./Register.scss";

import FieldsError from "../../components/Forms/Errors/Fields/FieldsError";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import { RiUserAddFill } from "react-icons/ri";
import { Spinner } from "@chakra-ui/react";
import { registerUser } from "../../services/users";
import { useForm } from "react-hook-form";
import { useNotification } from "../../hooks/useNotification";
import { useState } from "react";
import { useUserContext } from "../../contexts/AuthContext";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { navigate } = useUserContext();
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
    <Layout>
      <div className="register-form">
        {isLoading && <Spinner style={{ marginBottom: "25px" }} />}
        <form>
          <label htmlFor="email">
            Имейл *
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
          <label htmlFor="firstName">
            Име *
            <input
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
          <label htmlFor="lastName">
            Фамилия *
            <input
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
          <label htmlFor="phoneNumber">
            Телефонен Номер *
            <input
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
            <FieldsError msg={errors.phoneNumber?.message} />
          </label>

          <label htmlFor="password">
            Парола *
            <input
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

          <label htmlFor="repass">
            Повторете паролата *
            <input
              type="password"
              {...register("repeatedPassword", {
                required: false,
                validate: (value) =>
                  value === watch("password") || "Паролите не съвпадат",
              })}
            />
            <FieldsError msg={errors.repeatedPassword?.message} />
          </label>
        </form>

        <p className="no-registration">
          Вече си част от нас?
          <span>
            <Link to="/login">Вход!</Link>
          </span>
        </p>
        <button
          type="submit"
          disabled={isLoading}
          onClick={handleSubmit(onSubmitRegister)}
        >
          Регистрирай се
          <RiUserAddFill />
        </button>
      </div>
    </Layout>
  );
};

export default Register;
