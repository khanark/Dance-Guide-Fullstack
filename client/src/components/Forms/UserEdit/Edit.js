import "./Edit.scss";

import { Link, useOutletContext } from "react-router-dom";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import userAvatar from "../../../assets/images/blank-avatar-image.png";
import DatabaseError from "../Errors/Database/DatabaseError";
import FieldsError from "../Errors/Fields/FieldsError";

const Edit = () => {
  const { fetchError, onSubmitEdit, getSingle } = useOutletContext();
  console.log(fetchError);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getSingle().then(data => reset(data));
  }, [reset]);

  const avatar = watch("avatar");
  console.log(avatar);

  return (
    <div className="edit-form">
      <div className="user-avatar">
        <img src={!avatar ? userAvatar : avatar} alt="user-image" />
      </div>
      {fetchError && (
        <DatabaseError msg={"Имаше проблем със запазването на данните"} />
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
                message: "Името трябва да съдържа най - малко 3 символа",
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
                message: "Фамилията трябва да съдържа най - малко 3 символа",
              },
            })}
          />
          <FieldsError msg={errors.lastName?.message} />
        </label>
        <label htmlFor="phoneNumber">
          Телефонен Номер
          <input
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
        <Link to="/authentication/forgotten" className="forgotten-password">
          Смяна на паролата?
        </Link>
      </form>
      <button type="submit" onClick={handleSubmit(onSubmitEdit)}>
        Запази
      </button>
    </div>
  );
};

export default Edit;
