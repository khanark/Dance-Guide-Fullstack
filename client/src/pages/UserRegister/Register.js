import "./Register.scss";

import DatabaseError from "../../components/Forms/Errors/Database/DatabaseError";
import FieldsError from "../../components/Forms/Errors/Fields/FieldsError";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import PageContainer from "../../components/Layout/PageContainer/PageContainer";
import { Spinner } from "@chakra-ui/react";
import { registerUser } from "../../services/users";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useUserContext } from "../../contexts/AuthContext";

const Register = () => {
  const [fetchError, setFetchError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { toast, navigate } = useUserContext();

  const onSubmitRegister = async (data) => {
    try {
      await registerUser(data);
      setIsLoading(true);
      toast({
        title: "Успешна регистрация",
        description: "Благодарим за вашата регистрация.",
        position: "top",
        status: "success",
        duration: 2000,
        isClosable: false,
      });
      setTimeout(() => navigate("/login"), 2500);
    } catch (error) {
      setFetchError(true);
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <PageContainer styles={{ flexDirection: "column", gap: "20px" }}>
        <div className="register-form">
          {fetchError && (
            <DatabaseError
              msg={"Вече има регистриран потребител със този имейл адрес"}
            />
          )}
          {isLoading && <Spinner />}
          <form>
            <label htmlFor="email">
              Имейл *
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
            <label htmlFor="firstName">
              Име *
              <input
                {...register("firstName", {
                  required: "Моля въведете вашето име",
                  minLength: {
                    value: 3,
                    message: "Името трябва да съдържа най - малко 3 символа",
                  },
                })}
              />
              <FieldsError msg={errors.firstName?.message} />
            </label>
            <label htmlFor="lastName">
              Фамилия *
              <input
                {...register("lastName", {
                  required: "Моля въведете вашата фамилия",
                  minLength: {
                    value: 3,
                    message:
                      "Фамилията трябва да съдържа най - малко 3 символа",
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
                  required: "Моля въведете вашият телефонен номер",
                  pattern: {
                    value:
                      /^(?:\+359|0)(?:87|88|89)(?:\d{7}|\d{3}\s\d{2}\s\d{2}|\d{3}-\d{2}-\d{2})$/,
                    message: "Невалиден формат на т. номер",
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
                  required: "Моля въведете парола",
                  minLength: {
                    value: 4,
                    message: "Паролата трябва да съдържа най - малко 4 символа",
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
          </button>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default Register;
