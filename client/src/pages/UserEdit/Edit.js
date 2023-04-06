import "./Edit.scss";

import { edit, getSingle } from "../../services/users";

import CustomSpinner from "../../components/spinner/Spinner";
import DatabaseError from "../../components/Forms/Errors/Database/DatabaseError";
import FieldsError from "../../components/Forms/Errors/Fields/FieldsError";
import { Image } from "cloudinary-react";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useUploadAvatar } from "../../hooks/useUploadAvatar";
import { useUserContext } from "../../contexts/AuthContext";
import userAvatar from "../../assets/images/blank-avatar-image.jpg";

const Edit = () => {
  const { setUser, navigate, user, toast } = useUserContext();
  const [uploadedAvatar, preloadAvatar] = useUploadAvatar();
  const [fetchState, setFetchState] = useState({
    httpLoading: false,
    fetchError: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isLoading },
  } = useForm({ defaultValues: async () => await getSingle(user._id) });

  const avatar = watch("avatar");

  const handleAvatarChange = (e) => {
    preloadAvatar(e.target.files[0]);
  };

  const onSubmitEdit = async (data) => {
    try {
      setFetchState({ ...fetchState, httpLoading: true, fetchError: false });
      const userData = await edit(user._id, {
        ...data,
        avatar: uploadedAvatar || data.avatar,
        avatarIsFile: Boolean(uploadedAvatar),
      });
      setUser(userData);
      toast({
        title: "Успешно редактиране",
        description: `Промените бяха запазени успешно.`,
        position: "top",
        status: "success",
        duration: 2000,
        isClosable: false,
      });
      setTimeout(() => navigate("/user/profile"), 2500);
    } catch (error) {
      setFetchState({ ...fetchState, httpLoading: false, fetchError: true });
    }
  };

  return (
    <Layout>
      <div className="edit-form">
        {isLoading && <CustomSpinner />}
        {!isLoading && (
          <>
            {fetchState.httpLoading && (
              <Spinner style={{ marginBottom: "25px" }} />
            )}
            <div className="user-avatar">
              {typeof avatar == "string" && (
                <Image
                  cloudName="du4uhmyq2"
                  width="300"
                  publicId={avatar}
                  crop="scale"
                />
              )}
              {!avatar && <img src={userAvatar} alt="user-avatar" />}
            </div>
            <div className="user-image__wrapper"></div>
            <form>
              {fetchState.fetchError && (
                <DatabaseError
                  msg={"Потребител с този имейл вече съществува"}
                />
              )}
              <label htmlFor="avatar">
                Профилна снимка
                <input
                  type="file"
                  id="avatar"
                  {...register("avatar", {
                    validate: {
                      lessThan5MB: (files) =>
                        files[0]?.size < 5000000 || "Максимален размер 5MB",
                      acceptedFormats: (files) =>
                        ["image/jpeg", "image/png"].includes(files[0]?.type) ||
                        "Само формати: jpeg/png",
                    },
                  })}
                  onChange={handleAvatarChange}
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
            <button
              type="submit"
              disabled={fetchState.httpLoading}
              onClick={handleSubmit(onSubmitEdit)}
            >
              Запази
            </button>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Edit;
