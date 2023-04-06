import "./Details.scss";

import { useEffect, useState } from "react";

import Adress from "./components/Adress";
import Contacts from "./components/Contacts";
import CustomSpinner from "../../components/spinner/Spinner";
import Heading from "./components/Heading";
import { Image } from "cloudinary-react";
import Layout from "../../components/Layout/Layout";
import LikeButton from "./components/LikeButton";
import UserButtons from "./components/UserButtons";
import defaultAvatar from "../../assets/images/blank-avatar-image.jpg";
import schoolsFactory from "../../services/schools";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../contexts/AuthContext";

const Details = () => {
  const [school, setSchool] = useState({
    schoolDetails: {},
    isOwner: false,
    isLiked: false,
  });

  const [loading, setLoading] = useState(true);

  const { user } = useUserContext();
  const { schoolId } = useParams();
  const { singleSchool, likeSchool, unLikeSchool } = schoolsFactory(user);

  useEffect(() => {
    singleSchool(schoolId).then((data) => {
      setSchool({
        schoolDetails: data,
        isLiked: data.likes.users.includes(user?._id),
        isOwner: data.owner?._id == user?._id,
      });
      setLoading(false);
    });
  }, []);

  const { schoolDetails, isLiked, isOwner } = school;

  const handleLikes = async () => {
    if (school.isLiked) {
      setSchool({ ...school, isLiked: false });
      await unLikeSchool(schoolId);
    } else {
      setSchool({ ...school, isLiked: true });
      await likeSchool(schoolId);
    }
  };

  return (
    <Layout>
      <div className="details-page">
        {loading && <CustomSpinner />}
        {!loading && (
          <>
            <div className="details-page__image">
              <Image
                cloudName="du4uhmyq2"
                width="300"
                publicId={schoolDetails.image}
                crop="scale"
              />
            </div>
            <div className="details-page__info">
              {school.isOwner && <UserButtons id={schoolId} />}
              <div className="details-wrapper">
                <Heading {...schoolDetails} />
                <Adress {...schoolDetails} />
                <div className="horizontal__line"></div>
                <Contacts {...schoolDetails} />
              </div>
              {!isOwner && user && (
                <LikeButton handleLikes={handleLikes} isLiked={isLiked} />
              )}
            </div>
            <div className="avatar__container">
              {!schoolDetails.owner?.avatar && (
                <img src={defaultAvatar} alt="default-owner-img" />
              )}
              {schoolDetails.owner?.avatar && (
                <Image
                  cloudName="du4uhmyq2"
                  width="300"
                  publicId={schoolDetails.owner.avatar}
                />
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Details;
