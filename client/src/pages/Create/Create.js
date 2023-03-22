import "./Create.scss";

import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FieldsError from "../../components/Forms/Errors/Fields/FieldsError";
import Layout from "../../components/Layout/Layout";
import { UserContext } from "../../contexts/UserContext";
import { createSchool } from "../../services/schools";

const Create = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const linkRegex = /^https?:\/\//;

  const onSubmit = async data => {
    try {
      await createSchool({ ...data, ownerId: user._id });
      navigate("/catalog");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Layout>
      <article className="create-page">
        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name">
              Име
              <input
                className="margin-input"
                {...register("name", {
                  required: "Моля въведете име",
                  minLength: {
                    value: 4,
                    message: "Името трябва да съдържа най - малко 4 символа",
                  },
                })}
              />
              <FieldsError msg={errors.name?.message} />
            </label>
            <label htmlFor="image">
              Снимка
              <input
                className="margin-input"
                {...register("image", {
                  required: "Моля добавете снимка",
                  pattern: { value: linkRegex, message: "Невалиден URL адрес" },
                })}
              />
              <FieldsError msg={errors.image?.message} />
            </label>

            <label htmlFor="link">
              Официален сайт
              <input
                className="margin-input"
                {...register("link", {
                  required: "Моля добавете официална страница",
                  pattern: { value: linkRegex, message: "Невалиден URL адрес" },
                })}
              />
              <FieldsError msg={errors.link?.message} />
            </label>
            <label htmlFor="adress">
              Адрес
              <div className="address-container">
                <select
                  {...register("settlementType")}
                  className="settlementType"
                >
                  <option value="city">Град</option>
                  <option value="village">Село</option>
                </select>
                <div className="settlement-wrapper">
                  <input
                    placeholder="населено място"
                    className="settlement"
                    {...register("settlement", {
                      required: "Моля въведете населено място",
                      minLength: {
                        value: 3,
                        message:
                          "Населеното място трябва да съдържа най - малко 3 символа",
                      },
                    })}
                  />
                  <FieldsError msg={errors.settlement?.message} />
                </div>
                <div className="street-wrapper">
                  <input
                    placeholder="улица"
                    className="street"
                    {...register("street", {
                      required: "Моля въведете улица",
                      minLength: {
                        value: 3,
                        message:
                          "Улицата трябва да съдържа най - малко 3 символа",
                      },
                    })}
                  />
                  <FieldsError msg={errors.street?.message} />
                </div>
              </div>
            </label>

            <button type="submit">Публикувай</button>
          </form>
        </div>
        <div className="side-image">
          <img
            id="dance-image"
            src="https://t3.ftcdn.net/jpg/03/72/71/80/360_F_372718076_pLwDA6fUUDDWvgETtDOr67dUymN8Nzb3.jpg"
            alt="dance"
          />
          <div className="heading">
            <p>
              <span className="heading-public">Публикувай</span> своя танцов{" "}
              <span className="heading-business">бизнес!</span>
            </p>
            <p>
              Нека <span>цяла България</span> научи за това!
            </p>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default Create;
