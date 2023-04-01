import "./Edit.scss";

import DatabaseError from "../../components/Forms/Errors/Database/DatabaseError";
import FieldsError from "../../components/Forms/Errors/Fields/FieldsError";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import PageContainer from "../../components/Layout/PageContainer/PageContainer";
import Spinner from "../../components/spinner/Spinner";
import { useForm } from "react-hook-form";
import { useUserContext } from "../../contexts/UserContext";
import userAvatar from "../../assets/images/blank-avatar-image.jpg";

const Edit = () => {
  const { getSingle, onSubmitEdit, fetchError, setFetchError } =
    useUserContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isLoading },
  } = useForm({ defaultValues: async () => await getSingle() });

  const avatar = watch("avatar");

  return (
    <Layout>
      <PageContainer styles={{ flexDirection: "column", gap: "20px" }}>
        <div className="edit-form">
          {isLoading && <Spinner />}
          {!isLoading && (
            <>
              <div className="user-avatar">
                <img src={!avatar ? userAvatar : avatar} alt="user-image" />
              </div>
              {fetchError && <DatabaseError msg={fetchError} />}
              <div className="user-image__wrapper"></div>
              <form>
                <label htmlFor="avatar">
                  Профилна снимка
                  <input
                    id="avatar"
                    {...register("avatar", {
                      pattern: {
                        value: /^https?:\/\//,
                        message: "Невалиден URL адрес",
                      },
                    })}
                  />
                  <FieldsError msg={errors.avatar?.message} />
                </label>
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
                <label htmlFor="firstName">
                  Име
                  <input
                    {...register("firstName", {
                      required: "Моля въведете вашето име",
                      minLength: {
                        value: 3,
                        message:
                          "Името трябва да съдържа най - малко 3 символа",
                      },
                    })}
                  />
                  <FieldsError msg={errors.firstName?.message} />
                </label>
                <label htmlFor="lastName">
                  Фамилия
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
                  Телефонен Номер
                  <input
                    type={"number"}
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
                <label htmlFor="moreInfo">
                  Допълнителна информация
                  <textarea id="moreInfo" {...register("moreInfo")} />
                </label>
                <Link
                  to="/authentication/forgotten"
                  className="forgotten-password"
                >
                  Смяна на паролата?
                </Link>
              </form>
              <button type="submit" onClick={handleSubmit(onSubmitEdit)}>
                Запази
              </button>
            </>
          )}
        </div>
      </PageContainer>
    </Layout>
  );
};

export default Edit;
