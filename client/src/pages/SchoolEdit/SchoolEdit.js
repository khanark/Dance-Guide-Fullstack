import { useNavigate, useParams } from "react-router-dom";

import FieldsError from "../../components/Forms/Errors/Fields/FieldsError";
import Spinner from "../../components/spinner/Spinner";
import schoolsFactory from "../../services/schools";
import { useForm } from "react-hook-form";

const SchoolEdit = () => {
  const { schoolId } = useParams();
  const { singleSchool, updateSchool } = schoolsFactory();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm({ defaultValues: async () => await singleSchool(schoolId) });

  const onSubmit = async (data) => {
    await updateSchool(schoolId, data);
    navigate(`/details/${schoolId}`);
  };

  const linkRegex = /^https?:\/\//;
  const imageRegex = /(https?:\/\/.*\.(?:jpg|jpeg|png))/;

  return (
    <div className="create-page">
      <div className="form-container">
        {isLoading ? (
          <Spinner />
        ) : (
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
                  maxLength: {
                    value: 20,
                    message: "Името не може да бъде по - дълго от 20 символа",
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
                  pattern: {
                    value: imageRegex,
                    message: "Невалиден URL адрес",
                  },
                })}
              />
              <FieldsError msg={errors.image?.message} />
            </label>

            <label htmlFor="schoolType">
              Тип на училището
              <select
                className="margin-input"
                {...register("schoolType", {
                  required: "Моля изберете тип на училището",
                })}
              >
                <option value="1">Класически балет</option>
                <option value="2">Съвременни танци</option>
                <option value="3">Оритенталски танци</option>
                <option value="4">Народни танци</option>
                <option value="5">Хип - Хоп танци</option>
                <option value="6">Спортни танци</option>
                <option value="7">Други</option>
              </select>
            </label>

            <label htmlFor="adress">
              Адрес
              <div className="address-container">
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
                      maxLength: {
                        value: 15,
                        message:
                          "Населеното място не може да бъде по - дълго от 15 символа",
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

            <label htmlFor="link">
              Официален сайт
              <input
                className="margin-input"
                {...register("link", {
                  required: "Моля добавете официална страница",
                  pattern: {
                    value: linkRegex,
                    message: "Невалиден URL адрес",
                  },
                })}
              />
              <FieldsError msg={errors.link?.message} />
            </label>
            <label htmlFor="description">
              Описание
              <textarea
                className="school-description"
                {...register("description", {
                  required: "Моля добавете описание",
                  minLength: {
                    value: 10,
                    message:
                      "Описанието трябва да съдържа най - малко 10 символа",
                  },
                  maxLength: {
                    value: 300,
                    message:
                      "Описанието не може да бъде по - дълго от 300 символа",
                  },
                })}
              />
              <FieldsError msg={errors.description?.message} />
            </label>
            <button type="submit">Запазване</button>
          </form>
        )}
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
    </div>
  );
};

export default SchoolEdit;
