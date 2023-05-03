import "./Edit.scss";

import { edit, getSingle } from "../../services/users";
import { useEffect, useState } from "react";

import CustomSpinner from "../../components/spinner/Spinner";
import FieldsError from "../../components/Forms/Errors/Fields/FieldsError";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import { setPageTitle } from "../../util/util";
import { useForm } from "react-hook-form";
import { useNotification } from "../../hooks/useNotification";
import { useUploadAvatar } from "../../hooks/useUploadAvatar";
import { useUserContext } from "../../contexts/AuthContext";
import userAvatar from "../../assets/images/blank-avatar-image.jpg";

// import { Image } from "cloudinary-react";

const Edit = () => {
  const { setUser, navigate, user } = useUserContext();
  const [uploadedAvatar, preloadAvatar] = useUploadAvatar();
  const [httpLoading, setHttpLoading] = useState(false);

  useEffect(() => {
    setPageTitle("Редактиране на потребител");
  }, []);

  const { notificateSuccess, notificateError } = useNotification();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isLoading, isDirty },
  } = useForm({
    defaultValues: async () => await getSingle(user._id),
    mode: "onBlur",
  });

  const avatar = watch("avatar");

  const handleAvatarChange = (e) => {
    preloadAvatar(e.target.files[0]);
  };

  const onSubmitEdit = async (data) => {
    if (!isDirty) return;
    try {
      setHttpLoading(true);
      const userData = await edit(user._id, {
        ...data,
        avatar: uploadedAvatar || data.avatar,
        avatarIsFile: Boolean(uploadedAvatar),
      });
      setUser(userData);
      notificateSuccess({
        title: "Успешно редактиране",
        description: "Промените бяха запазени успешно",
      });
      setTimeout(() => navigate("/user/profile"), 2500);
    } catch (error) {
      setHttpLoading(false);
      notificateError({
        title: "Грешка при запазване",
        description: "Потребител с този имейл вече съществува",
      });
    } finally {
      setHttpLoading(false);
    }
  };

  return (
    <Layout>
      <div className="edit-form">
        {isLoading && <CustomSpinner />}
        {!isLoading && (
          <>
            {httpLoading && <Spinner style={{ marginBottom: "25px" }} />}
            <div className="user-avatar">
              {/* {typeof avatar == "string" && (
                <Image
                  cloudName="du4uhmyq2"
                  width="300"
                  publicId={avatar}
                  crop="scale"
                />
              )} */}
              {!avatar && <img src={userAvatar} alt="user-avatar" />}
            </div>
            <div className="user-image__wrapper"></div>
            <form>
              <label htmlFor="avatar">
                Профилна снимка
                <input
                  type="file"
                  id="avatar"
                  {...register("avatar", {
                    validate: {
                      lessThan5MB: (files) => {
                        if (!uploadedAvatar) return;
                        return (
                          files[0]?.size < 5000000 || "Максимален размер 5MB"
                        );
                      },
                      acceptedFormats: (files) => {
                        if (!uploadedAvatar) return;
                        return (
                          ["image/jpeg", "image/png"].includes(
                            files[0]?.type
                          ) || "Само формати: jpeg/png"
                        );
                      },
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
                    minLength: {
                      value: 10,
                      message: "Минимален брой символи 10",
                    },
                    maxLength: {
                      value: 200,
                      message: "Максимален брой символи 200",
                    },
                  })}
                />
                <FieldsError msg={errors.moreInfo?.message} />
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
              disabled={httpLoading}
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
