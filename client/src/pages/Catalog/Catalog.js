import "./Catalog.css";
import "../../App.css";

import { useEffect, useRef, useState } from "react";

import Card from "../../components/CardComponent/Card";
import CustomSpinner from "../../components/spinner/Spinner";
import GreetModal from "../../components/Modal/Modal";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader/PageHeader";
import catalogHeaderImage from "../../assets/images/page_headers/catalog-header.jpg";
import schoolsFactory from "../../services/schools";
import { setPageTitle } from "../../util/util";
import { useSchoolContext } from "../../contexts/SchoolContext";
import { useUserContext } from "../../contexts/AuthContext";

const Catalog = () => {
  const [query, setQuery] = useState("");
  const { schools, setSchools, sortByLikes, sortByLatest } = useSchoolContext();
  const [accordion, setAccordion] = useState(false);
  const [isLoading, setIsLoading] = useState({});
  const [showComponent, setShowComponent] = useState(false);

  const { getAllSchools } = schoolsFactory();
  const { user } = useUserContext();

  useEffect(() => {
    setPageTitle("Catalog");
    setTimeout(() => setShowComponent(true), 1200);
    getAllSchools().then((data) => {
      setIsLoading(false);
      setSchools(data);
    });
  }, []);

  return (
    <Layout>
      {user?.isNewAcc && showComponent && <GreetModal />}

      <div className="catalog-page">
        <PageHeader image={catalogHeaderImage} />
        <main className="section-catalog section">
          <div className="catalog container-primary">
            <div className="catalog-search--menu">
              <h3 className="catalog-search-menu--title">Filter by</h3>
              <button
                className="search-menu--style"
                onClick={() => setAccordion((prev) => !prev)}
              >
                <div className="box-top btn-search">
                  <p>Style</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="chevron-down"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>
                <div
                  className={`search-menu-hidden-box ${!accordion && "hidden"}`}
                >
                  {/* At some point you need to finish the logic here */}
                  <button className="hidden-box--btn">Hip Hop</button>
                  <button className="hidden-box--btn">Balet</button>
                  <button className="hidden-box--btn">Folklore</button>
                  <button className="hidden-box--btn">Modern Dance</button>
                </div>
              </button>
              <button className="btn-search">Newest</button>
              <button className="btn-search">Oldest</button>
            </div>
            <div className="catalog-list">
              {isLoading && <CustomSpinner />}
              {schools.map((school) => (
                <Card key={school._id} {...school} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Catalog;
