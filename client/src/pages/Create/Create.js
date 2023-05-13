import "./Create.css";
import "../../assets/styles/Form.css";

import { useEffect, useRef, useState } from "react";

import FieldsError from "../../components/Forms/Errors/Fields/FieldsError";
import Layout from "../../components/Layout/Layout";
import { Spinner } from "@chakra-ui/react";
import { createSchoolSchemaValidation } from "../../YupSchemas/validation_schema";
import schoolsFactory from "../../services/schools";
import { setPageTitle } from "../../util/util";
import { useForm } from "react-hook-form";
import { useNotification } from "../../hooks/useNotification";
import { useUploadAvatar } from "../../hooks/useUploadAvatar";
import { useUserContext } from "../../contexts/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";

const Create = () => {
  const { user, navigate } = useUserContext();
  const [uploadedAvatar, preloadAvatar] = useUploadAvatar();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPageTitle("Create School");
  }, []);

  const { createSchool } = schoolsFactory(user);
  const { notificateSuccess, notificateError } = useNotification();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(createSchoolSchemaValidation),
  });

  const handleAvatarChange = (e) => {
    preloadAvatar(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await createSchool({
        ...data,
        ownerId: user._id,
        image: uploadedAvatar || data.image,
        isImageFile: Boolean(uploadedAvatar),
      });
      notificateSuccess({
        title: "Успешно създаване",
        description: "Училището е създадено успешно",
      });
      setTimeout(() => navigate("/catalog"), 1500);
    } catch (error) {
      setIsLoading(false);
      notificateError({
        title: "Проблем при създаване",
        description: "Имаше проблем при създаването",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Layout>
      <div className="form-wrapper section blurry-background">
        <form className="form">
          <h2 className="title-secondary">Create school</h2>
          <p className="form-desc">
            Make the whole world know about your school!
          </p>
          <label htmlFor="schoolName" className="form-label">
            <p className="input-label">Name</p>
            <input className="form-input" {...register("name")} />
            <FieldsError msg={errors.name?.message} />
          </label>
          <label htmlFor="schoolPhoto" className="form-label form-label--photo">
            <p className="input-label">Photo</p>
            <div className="btn-upload-wrapper">
              <input
                type="file"
                className="form-input photo-input"
                id="image"
                {...register("image")}
                onChange={handleAvatarChange}
              />
              <label
                type="label"
                className="btn-upload"
                for="image"
                // onClick={onUploadFileClick}
              >
                Upload...
              </label>
            </div>
            <FieldsError msg={errors.image?.message} />
          </label>
          <label htmlFor="schoolType" className="form-label">
            <p className="input-label">Style</p>
            <select className="form-input" {...register("schoolType")}>
              <option value="1">Classical Ballet</option>
              <option value="2">Modern Dances</option>
              <option value="3">Oriental Dances</option>
              <option value="4">Folklore Dances</option>
              <option value="5">Hip - Hop Dances</option>
              <option value="6">Sport Dances</option>
              <option value="7">Other</option>
            </select>
            <FieldsError msg={errors.schoolType?.message} />
          </label>
          <div className="form-grid--wrapper">
            <label htmlFor="settlement" className="form-label">
              <p className="input-label">City</p>
              <input className="form-input" {...register("settlement")} />
              <FieldsError msg={errors.settlement?.message} />
            </label>
            <label htmlFor="street" className="form-label">
              <p className="input-label">Street</p>
              <input className="form-input" {...register("street")} />
              <FieldsError msg={errors.street?.message} />
            </label>
          </div>
          <label htmlFor="link" className="form-label">
            <p className="input-label">Website</p>
            <input className="form-input" {...register("link")} />
            <FieldsError msg={errors.link?.message} />
          </label>
          <label htmlFor="description" className="form-label">
            <p className="input-label">Description</p>
            <textarea
              className="form-input"
              {...register("description")}
            ></textarea>
            <FieldsError msg={errors.description?.message} />
          </label>
          <button
            type="submit"
            className="btn form-btn"
            disabled={isLoading}
            onClick={handleSubmit(onSubmit)}
          >
            {isLoading && <Spinner className="btn-spinner" />}
            Create
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Create;
