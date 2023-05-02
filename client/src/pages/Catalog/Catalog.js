// import "./Catalog.scss";

import "../../App.css";

import { useEffect, useRef, useState } from "react";

import Card from "../../components/CardComponent/Card";
import CustomSpinner from "../../components/spinner/Spinner";
import { FiSearch } from "react-icons/fi";
import GreetModal from "../../components/Modal/Modal";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import catalogHeaderImage from "../../assets/images/page_headers/catalog-header.jpg";
import schoolsFactory from "../../services/schools";
import { setPageTitle } from "../../util/util";
import { useSchoolContext } from "../../contexts/SchoolContext";
import { useUserContext } from "../../contexts/AuthContext";

const Catalog = () => {
  const [query, setQuery] = useState("");
  const { schools, setSchools, sortByLikes, sortByLatest } = useSchoolContext();
  const [isLoading, setIsLoading] = useState({});
  const [showComponent, setShowComponent] = useState(false);

  const { getAllSchools } = schoolsFactory();
  const { user } = useUserContext();

  useEffect(() => {
    setPageTitle("Каталог");
    setTimeout(() => setShowComponent(true), 1200);
    getAllSchools().then((data) => {
      setIsLoading(false);
      setSchools(data);
    });
  }, []);

  const inputRef = useRef();
  const selectRef = useRef();

  let filteredSchools = schools.filter((school) =>
    school.settlement.toLowerCase().includes(query.toLowerCase())
  );

  const onSearch = (e) => {
    switch (e.target.value) {
      case "likes":
        sortByLikes();
        break;
      case "newest":
        sortByLatest();
        break;
    }
  };

  return (
    <Layout>
      {user?.isNewAcc && showComponent && <GreetModal />}
      {/* <div className="catalog-page">
        <div className="search-wrap">
          <select
            className="search-select"
            defaultValue="settlement"
            onChange={onSearch}
            ref={selectRef}
          >
            <option value="settlement">Населено място</option>
            <option value="newest">Последно добавени</option>
            <option value="likes">Най - харесвани</option>
          </select>
          <input
            type="text"
            placeholder="Търсене"
            ref={inputRef}
            onChange={(e) => setQuery(e.target.value)}
            onClick={() => (selectRef.current.value = "settlement")}
          />
          <span className="search-icon__container">
            <FiSearch />
          </span>
        </div>

        {!schools.length && !isLoading && (
          <div className="missing__schools">
            <p> Все още няма добавени училища. Бъди първият!</p>
            <Link to="/create">Създай</Link>
          </div>
        )}

        {isLoading && !Boolean(schools.length) && <CustomSpinner />}

        {!filteredSchools.length && schools.length && !isLoading ? (
          <div className="missing__schools">
            <p> Няма резултат</p>
          </div>
        ) : (
          <div className="card-container">
            {filteredSchools.map((school) => (
              <Card key={school._id} {...school} />
            ))}
          </div>
        )}
      </div> */}
      <div className="catalog-page page">
        <header className="container grid grid--cols-2">
          <div className="header-left-box">
            <h1 className="page-title--primary">
              Find your dance school from all around the country!
            </h1>
            <h2 className="title-secondary">Search by different critera.</h2>
            <p className="page-desc">
              Our search feature allows users to easily find what they are
              looking for by filtering through various criteria, such as
              location, style, and more.
            </p>
            <button className="btn">Browse Schools</button>
          </div>
          <div className="header-right-box">
            <img
              src={catalogHeaderImage}
              alt="catalog header"
              className="page-header--img"
            />
          </div>
        </header>
      </div>
    </Layout>
  );
};

export default Catalog;
