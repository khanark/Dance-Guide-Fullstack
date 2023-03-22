import "./Catalog.scss";

import { useEffect, useState } from "react";

import { FiSearch } from "react-icons/fi";
import Card from "../../components/CardComponent/Card";
import Layout from "../../components/Layout/Layout";
import PageContainer from "../../components/Layout/PageContainer/PageContainer";
import { getAllSchools } from "../../services/schools";

const Catalog = () => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    getAllSchools().then(result => {
      setSchools(result);
    });
  }, []);

  return (
    <Layout>
      <PageContainer
        styles={{
          // padding: "0 5rem",
          // gap: "12px",
          alignItems: "unset",
          justifyContent: "unset",
        }}
      >
        <div className="catalog-page">
          {schools.length > 0 && (
            <div className="search-wrap">
              <input
                type="text"
                name="search"
                id="seach"
                placeholder="Търсене"
              />
              <span className="search-icon__container">
                <FiSearch />
              </span>
            </div>
          )}
          <div className="card-container">
            {/* {schools.length === 0 ? (
            <div className="missing__schools">
              <p> Все още няма добавени училища. Бъди първият!</p>
              <Link to="/create">Създай</Link>
            </div>
          ) : (
            // schools.map(school => <Card key={school._id} {...school} />) */}
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            {/* <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />

            <Card /> */}
            {/* )} */}
          </div>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default Catalog;
