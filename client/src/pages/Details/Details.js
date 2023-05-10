import "./Details.scss";

import { useEffect, useReducer, useState } from "react";

import Adress from "./components/Adress";
import Contacts from "./components/Contacts";
import CustomSpinner from "../../components/Spinner/Spinner";
import Feedback from "./components/Feedback";
import FeedbackButton from "./components/FeedbackButton";
import FeedbackPost from "./components/FeedbackPost";
import Heading from "./components/Heading";
import Layout from "../../components/Layout/Layout";
import LikeButton from "./components/LikeButton";
import UserButtons from "./components/UserButtons";
import defaultAvatar from "../../assets/images/blank-avatar-image.jpg";
import schoolsFactory from "../../services/schools";
import { singleSchoolActions } from "../../reducers/singleSchoolReducer";
import singleSchoolReducer from "../../reducers/singleSchoolReducer";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../contexts/AuthContext";

// import { Image, Placeholder } from "cloudinary-react";

const Details = () => {
  const [school, dispatch] = useReducer(singleSchoolReducer, {});

  const [loading, setLoading] = useState(true);
  const [onFeedbacksClick, setOnFeedbacksClick] = useState(false);

  const { user } = useUserContext();
  const { schoolId } = useParams();
  const { singleSchool, likeSchool, unLikeSchool } = schoolsFactory(user);

  useEffect(() => {
    singleSchool(schoolId).then((data) => {
      const schoolData = {
        schoolDetails: data,
        isLiked: data.likes.users.includes(user?._id),
        isOwner: data.owner?._id == user?._id,
      };
      dispatch({
        type: singleSchoolActions.SET_SINGLE_SCHOOL,
        payload: schoolData,
      });
      setLoading(false);
    });
  }, []);

  const { schoolDetails, isLiked, isOwner } = school;

  const handleLikes = async () => {
    if (school.isLiked) {
      dispatch({ type: singleSchoolActions.SET_LIKED, payload: false });
      await unLikeSchool(schoolId);
    } else {
      dispatch({ type: singleSchoolActions.SET_LIKED, payload: true });
      await likeSchool(schoolId);
    }
  };

  return (
    <Layout>
      <div className="details__wrapper">
        <div className="details-page">
          {loading && <CustomSpinner />}
          {!loading && (
            <>
              <div className="details-page__image">
                {/* <Image
                  cloudName="du4uhmyq2"
                  publicId={schoolDetails.image}
                  crop="scale"
                  width="300"
                  loading="lazy"
                >
                  <Placeholder type="blur" />
                </Image> */}
              </div>
              <div className="details-page__info">
                {school.isOwner && <UserButtons id={schoolId} />}
                <div className="details-wrapper">
                  <Heading {...schoolDetails} />
                  <Adress {...schoolDetails} />
                  <div className="horizontal__line"></div>
                  <Contacts {...schoolDetails} />
                </div>
                <div className="action-buttons__wrapper">
                  {!isOwner && user && (
                    <LikeButton handleLikes={handleLikes} isLiked={isLiked} />
                  )}
                  <FeedbackButton
                    setOnFeedbacksClick={setOnFeedbacksClick}
                    feedbacksCount={schoolDetails.feedbacks.length}
                  />
                </div>
              </div>
              <div className="avatar__container">
                {!schoolDetails.owner?.avatar && (
                  <img src={defaultAvatar} alt="default-owner-img" />
                )}
                {/* {schoolDetails.owner?.avatar && (
                  <Image
                    cloudName="du4uhmyq2"
                    width="300"
                    publicId={schoolDetails.owner.avatar}
                  />
                )} */}
              </div>
            </>
          )}
        </div>
        {onFeedbacksClick && (
          <div className="feedbacks-wrapper">
            <h2 className="feedbacks-title">Отзиви</h2>
            {!isOwner && user && (
              <FeedbackPost dispatch={dispatch} schoolId={schoolDetails._id} />
            )}
            <div className="feedback-container">
              {!schoolDetails.feedbacks?.length ? (
                <p>Няма отзиви</p>
              ) : (
                schoolDetails.feedbacks?.map((feedback) => (
                  <Feedback
                    key={feedback._id}
                    {...feedback}
                    schoolId={schoolDetails._id}
                    dispatch={dispatch}
                  />
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Details;
