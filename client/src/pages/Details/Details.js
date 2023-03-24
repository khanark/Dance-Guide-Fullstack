import "./Detaisl.scss";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import PageContainer from "../../components/Layout/PageContainer/PageContainer";
import { getSingleSchool } from "../../services/schools";

const Details = () => {
  const { schooldId } = useParams();

  useEffect(() => {
    getSingleSchool(schooldId).then(school => console.log(school));
  });

  return (
    <Layout>
      <PageContainer>
        <h2>This is the single schoool page</h2>
      </PageContainer>
    </Layout>
  );
};

export default Details;
