import "./Edit.scss";

import { edit, getSingle } from "../../services/users";

import DatabaseError from "../../components/Forms/Errors/Database/DatabaseError";
import FieldsError from "../../components/Forms/Errors/Fields/FieldsError";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import PageContainer from "../../components/Layout/PageContainer/PageContainer";
import Spinner from "../../components/spinner/Spinner";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useUserContext } from "../../contexts/AuthContext";
import userAvatar from "../../assets/images/blank-avatar-image.jpg";

const Edit = () => {
  const [fetchError, setFetchError] = useState(false);
  const { setUser, navigate, user } = useUserContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isLoading },
  } = useForm({ defaultValues: async () => await getSingle(user._id) });

  const avatar = watch("avatar");

  const onSubmitEdit = async (data) => {
    try {
      const userData = await edit(user._id, data);
      setUser(userData);
      navigate("/catalog");
    } catch (error) {
      setFetchError(true);
    }
  };

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
              {fetchError && (
                <DatabaseError
                  msg={"Потребител с този имейл вече съществува"}
                />
              )}
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
                  Име
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
                  Фамилия
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
                  Телефонен Номер
                  <input
                    type={"number"}
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
                <label htmlFor="moreInfo">
                  Допълнителна информация
                  <textarea
                    id="moreInfo"
                    {...register("moreInfo", {
                      maxLength: {
                        value: 200,
                        message: "Максимален брой символи 200",
                      },
                    })}
                  />
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
