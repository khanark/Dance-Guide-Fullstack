import "./Catalog.scss";

import { useEffect, useRef, useState } from "react";

import Card from "../../components/CardComponent/Card";
import CustomSpinner from "../../components/spinner/Spinner";
import { FiSearch } from "react-icons/fi";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import schoolsFactory from "../../services/schools";
import { useSchoolContext } from "../../contexts/SchoolContext";

const Catalog = () => {
  const [query, setQuery] = useState("");
  const { schools, setSchools, sortByLikes, sortByLatest } = useSchoolContext();
  const [isLoading, setIsLoading] = useState({});

  const { getAllSchools } = schoolsFactory();

  useEffect(() => {
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
      <div className="catalog-page">
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
      </div>
    </Layout>
  );
};

export default Catalog;
