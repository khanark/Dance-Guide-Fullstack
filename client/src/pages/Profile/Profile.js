import "./Profile.scss";

import { useEffect, useState } from "react";

import Card from "../../components/CardComponent/Card";
import Layout from "../../components/Layout/Layout";
import NoSchool from "./components/NoSchool";
import PageContainer from "../../components/Layout/PageContainer/PageContainer";
import { Spinner } from "@chakra-ui/react";
import defaultAvatar from "../../assets/images/blank-avatar-image.jpg";
import schoolsFactory from "../../services/schools";
import { useUserContext } from "../../contexts/AuthContext";

const Profile = () => {
  const { user } = useUserContext();
  const [schools, setSchools] = useState({
    own: [],
    liked: [],
  });
  const [loading, setLoading] = useState(true);

  const { getAllSchools } = schoolsFactory();

  useEffect(() => {
    getAllSchools().then((data) => {
      setSchools({
        ...schools,
        own: data.filter((school) => school.owner == user._id),
        liked: data.filter((school) => school.likes.users.includes(user._id)),
      });
      setLoading(false);
    });
  }, []);

  return (
    <Layout>
      <PageContainer
        styles={{
          alignItems: "unset",
          justifyContent: "unset",
        }}
      >
        <div className="profile__page">
          <div className="user__info">
            <div className="user__image">
              <img src={user.avatar ? user.avatar : defaultAvatar} alt="user" />
            </div>
            <div className="user-perfonal__info">
              <p>
                {user.firstName} {user.lastName}
              </p>
              <p>{user.email}</p>
            </div>
          </div>
          <div className="user-added__schools">
            <h3 className="heading">Моите училища</h3>
            {loading && <Spinner />}
            {!schools.own.length && !loading && (
              <NoSchool
                msg="Нямате добавени училища"
                redirect={{ name: "Създай", path: "/create" }}
              />
            )}
            <div className="card-container">
              {schools.own.map((school) => (
                <Card key={school._id} {...school} />
              ))}
            </div>
          </div>
          <div className="user-liked__schools">
            <h3 className="heading">Харесани училища</h3>
            {loading && <Spinner />}
            {!schools.liked.length && !loading && (
              <NoSchool
                msg="Нямате харесани училища"
                redirect={{ name: "Каталог", path: "/catalog" }}
              />
            )}
            <div className="card-container">
              {schools.liked.map((school) => (
                <Card key={school._id} {...school} />
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default Profile;
