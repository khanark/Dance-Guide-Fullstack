import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Image, Placeholder } from "cloudinary-react";

import defaultAvatar from "../../../assets/images/blank-avatar-image.jpg";
import { deleteFeedback } from "../../../services/feedbacks";
import { singleSchoolActions } from "../../../reducers/singleSchoolReducer";

const Feedback = ({ owner, text, _id, schoolId, dispatch }) => {
  const onDeleteClick = async () => {
    try {
      await deleteFeedback(schoolId, _id);
      dispatch({
        type: singleSchoolActions.REMOVE_FEEDBACK,
        payload: _id,
      });
    } catch (error) {
      console.log("There was a problem deleting the feedback " + error.message);
    }
  };

  return (
    <div className="feedback">
      <div className="feedback-user">
        <div className="feedback-user__avatar">
          {!owner.avatar && (
            <img src={defaultAvatar} alt="User Avatar" className="avatar" />
          )}
          {owner.avatar && (
            <Image cloudName="du4uhmyq2" width="300" publicId={owner.avatar} />
          )}
        </div>
        <h3 className="feedback-user__name">
          {owner?.firstName} {owner?.lastName}
        </h3>
        <div className="feedback-user__buttons">
          <AiFillEdit
            className="feedback-user__button"
            onClick={() => console.log("edit")}
          />
          <AiFillDelete
            className="feedback-user__button"
            onClick={onDeleteClick}
          />
        </div>
      </div>

      <div className="feedback-content">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Feedback;
