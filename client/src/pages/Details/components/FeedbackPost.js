import FieldsError from "../../../components/Forms/Errors/Fields/FieldsError";
import { addFeedback } from "../../../services/feedbacks";
import { singleSchoolActions } from "../../../reducers/singleSchoolReducer";
import { useForm } from "react-hook-form";
import { useNotification } from "../../../hooks/useNotification";
import { useUserContext } from "../../../contexts/AuthContext";

const FeedbackPost = ({ dispatch, schoolId }) => {
  const { user } = useUserContext();
  const { notificateSuccess } = useNotification();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm();

  const onSubmit = async (data) => {
    if (!isDirty) return;
    try {
      const school = await addFeedback(schoolId, {
        ...data,
        owner: user?._id,
      });
      const feedback = school.feedbacks.at(-1);
      dispatch({ type: singleSchoolActions.ADD_FEEDBACK, payload: feedback });
      reset();
      notificateSuccess({
        title: "Успешно добавен отзив",
        description: "Бладорим Ви за отзива!",
      });
    } catch (error) {
      console.log("There was a problem adding feedback " + error.message);
    }
  };

  return (
    <div className="feedback-post">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="feedback">Напиши отзив:</label>
        <textarea
          className="feedback-input"
          {...register("text", {
            minLength: { value: 10, message: "Минимален брой символи 10" },
          })}
          rows="4"
          cols="50"
        ></textarea>
        <FieldsError msg={errors.text?.message} />
        <input type="submit" value="Изпрати" className="submit-btn" />
      </form>
    </div>
  );
};

export default FeedbackPost;
