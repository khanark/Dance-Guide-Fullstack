import "./Profile.css";
import "../../App.css";

import { AdvancedImage, lazyload, responsive } from "@cloudinary/react";
import { useEffect, useState } from "react";

import Card from "../../components/CardComponent/Card";
import Layout from "../../components/Layout/Layout";
import NoSchool from "./components/NoSchool";
import { Spinner } from "@chakra-ui/react";
import defaultAvatar from "../../assets/images/blank-avatar-image.jpg";
import { getSingle } from "../../services/users";
import schoolsFactory from "../../services/schools";
import { setPageTitle } from "../../util/util";
import { useCloudinaryImage } from "../../hooks/useCloudinaryImage";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [activeButton, setActiveButton] = useState("user-btn--1");
  const userImage = useCloudinaryImage(user?.avatar);

  function onUserButtonClick(e) {
    setActiveButton(e.target.id);
  }

  useEffect(() => {
    setPageTitle("Profile");
    setLoading(true);
    getSingle(userId)
      .then((user) => {
        setUser(user);
      })
      .finally(() => setLoading(false));
  }, []);

  console.log(user);

  return (
    <Layout>
      <section className="profile-page section">
        <div className="profile container-secondary grid grid--cols-2">
          <div className="profile-box--left">
            {user?.avatar ? (
              <AdvancedImage
                cldImg={userImage}
                className="user-profile--img"
                plugins={[lazyload(), responsive()]}
              />
            ) : (
              <img
                src={defaultAvatar}
                className="user-profile--img"
                alt="user-avatar"
              />
            )}
            <div className="line-devider">
              <span className="line-devider--text devider-text--left">
                About Me
              </span>
              <button className="line-devider--text devider-text--right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="line-devider--icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </button>
            </div>
            <div className="user-info--wrapper">
              <h3 className="subtitle">Email:</h3>
              <p className="user-info--text">{user?.email}</p>
            </div>
            <div className="user-info--wrapper">
              <h3 className="subtitle">Phone:</h3>
              <p className="user-info--text">{user?.phoneNumber}</p>
            </div>
          </div>
          {loading ? (
            <Spinner className="el-center" />
          ) : (
            <div className="profile-box--right">
              <div className="profile-box-right-main">
                <div className="profile-box-header--wrapper">
                  <div className="profile-box-header--top">
                    <h2 className="title-secondary">
                      {user?.firstName} {user?.lastName}
                    </h2>
                    <div className="user-hometown--wrapper">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="user-hometown--icon"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>
                      <p className="user-hometown">Sofia</p>
                    </div>
                  </div>
                  <p className="subtitle user-ocupation">Dance Expert</p>
                  <button className="line-devider--text devider-text--right">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="line-devider--icon"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>
                </div>
                <div className="additional-information--wrapper">
                  <h3 className="subtitle">Aditional information</h3>
                  <p className="additional-info--desc">
                    {user?.moreInfo || "There is no additional information"}
                  </p>
                </div>
                <div className="user-btns--wrapper">
                  <button className="btn user-btn--wrapper">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="user-btn--icon"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                      />
                    </svg>

                    <p className="subtitle">Send Message</p>
                  </button>
                  <button className="btn user-btn--wrapper">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="line-devider--icon"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>

                    <p className="subtitle">Schools</p>
                  </button>
                </div>
                <div className="user-options">
                  <button
                    id="user-btn--1"
                    className={`subtitle ${
                      activeButton == "user-btn--1" ? "active" : ""
                    }`}
                    onClick={onUserButtonClick}
                  >
                    Created
                  </button>
                  <button
                    id="user-btn--2"
                    className={`subtitle ${
                      activeButton == "user-btn--2" ? "active" : ""
                    }`}
                    onClick={onUserButtonClick}
                  >
                    Liked
                  </button>
                  <button
                    id="user-btn--3"
                    className={`subtitle ${
                      activeButton == "user-btn--3" ? "active" : ""
                    }`}
                    onClick={onUserButtonClick}
                  >
                    Send message to the user
                  </button>
                </div>
              </div>
              <ul className="school-list grid grid--cols-3">
                {activeButton == "user-btn--1" &&
                  user?.danceSchools.map((school) => (
                    <Card key={school._id} {...school} />
                  ))}
                {activeButton == "user-btn--2" &&
                  user?.likedSchools.map((school) => (
                    <Card key={school._id} {...school} />
                  ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Profile;
