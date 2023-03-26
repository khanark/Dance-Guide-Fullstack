import "./Details.scss";

import { useEffect, useState } from "react";
import { BsCalendarDate, BsFillTelephoneFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";

import { BsFillHouseFill } from "react-icons/bs";
import { GrFormNextLink } from "react-icons/gr";
import { MdEmail } from "react-icons/md";
import defaultAvatar from "../../assets/images/blank-avatar-image.jpg";
import Layout from "../../components/Layout/Layout";
import PageContainer from "../../components/Layout/PageContainer/PageContainer";
import { useUserContext } from "../../contexts/UserContext";
import schoolsFactory from "../../services/schools";
import { formatDate } from "../../util/util";

const Details = () => {
  const [school, setSchool] = useState({});
  const [isLiked, setIsLiked] = useState(() => {
    return school.likes?.users.includes(user._id);
  });

  const { user } = useUserContext();
  const { schoolId } = useParams();
  const { singleSchool, likeSchool, unLikeSchool } = schoolsFactory(user);

  useEffect(() => {
    singleSchool(schoolId).then(data => {
      setSchool(data);
    });
  }, []);

  const handleLikes = async () => {
    let school;
    if (isLiked) {
      school = await unLikeSchool(schoolId);
      setIsLiked(false);
    } else {
      school = await likeSchool(schoolId);
      setIsLiked(true);
    }
    setSchool(Object.assign({}, school));
  };

  console.log(school);

  return (
    <Layout>
      <PageContainer
        styles={{
          alignItems: "unset",
          justifyContent: "unset",
        }}
      >
        <div className="details-page">
          <div className="details-page__image">
            <img src={school.image} alt="" />
          </div>
          <div className="details-page__info">
            <div className="heading__info">
              <h2 className="school__name">{school.name}</h2>
              <div className="created-at">
                <BsCalendarDate />
                <p>{formatDate(school._createdAt)}</p>
              </div>
            </div>
            <div className="address">
              <h3 className="address__title">Адрес</h3>
              <div className="address__info">
                <BsFillHouseFill />
                <p>
                  {school.settlement}, улица: {school.street}
                </p>
              </div>
            </div>
            <div className="contacts">
              <h3 className="contacts__title">Контакти</h3>
              <div className="contacts__info">
                <div className="phone">
                  <BsFillTelephoneFill />
                  <p>{school.owner?.phoneNumber}</p>
                </div>
                <div className="split__line"></div>
                <div className="email">
                  <MdEmail />
                  <p>{school.owner?.email}</p>
                </div>
                <div className="split__line"></div>
                <div className="link">
                  <GrFormNextLink />
                  <Link className="page__link" to={school.link} type="_blank">
                    Официална страница
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="avatar__container">
            <img
              src={!school.owner?.avatar ? defaultAvatar : school.owner?.avatar}
              alt="owner"
            />
          </div>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default Details;
