import "./Detaisl.scss";

import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import PageContainer from "../../components/Layout/PageContainer/PageContainer";
import { useSchoolContext } from "../../contexts/SchoolsContext";

const Details = () => {
  const { singleSchool, setSingleSchoolId } = useSchoolContext();
  const { schoolId } = useParams();
  setSingleSchoolId(schoolId);
  console.log(singleSchool);

  return (
    <Layout>
      <PageContainer>
        <h2>laa</h2>
      </PageContainer>
    </Layout>
  );
};

export default Details;
