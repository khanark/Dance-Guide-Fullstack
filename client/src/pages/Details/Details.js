import "./Details.scss";

import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import PageContainer from "../../components/Layout/PageContainer/PageContainer";
import { useSchoolContext } from "../../contexts/SchoolsContext";

const Details = () => {
  const [school, setSchool] = useState({});
  const { schoolId } = useParams();
  const { singleSchool, fetchError } = useSchoolContext();

  useEffect(() => {
    singleSchool(schoolId).then(data => {
      setSchool(data);
    });
  }, []);

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
            <h2>Card Name</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis et, libero odit quos obcaecati atque ea unde tenetur
              cum quae, provident ipsum sint eius mollitia, deserunt
              reprehenderit officia animi laborum.
            </p>
          </div>
          <div className="avatar__container">
            <img src={school.owner?.avatar} alt="" />
          </div>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default Details;
