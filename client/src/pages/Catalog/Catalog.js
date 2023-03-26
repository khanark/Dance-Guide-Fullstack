import "./Catalog.scss";

import { useEffect, useRef, useState } from "react";

import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import Card from "../../components/CardComponent/Card";
import Layout from "../../components/Layout/Layout";
import PageContainer from "../../components/Layout/PageContainer/PageContainer";
import Spinner from "../../components/spinner/Spinner";
import schoolsFactory from "../../services/schools";

const Catalog = () => {
  const [query, setQuery] = useState("");
  const [schools, setSchools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { getAllSchools } = schoolsFactory();

  useEffect(() => {
    getAllSchools().then(data => {
      setSchools(data);
      setIsLoading(false);
    });
  }, []);

  const inputRef = useRef();
  const selectRef = useRef();

  let filteredSchools = schools.filter(school =>
    school.settlement.toLowerCase().includes(query.toLowerCase())
  );

  const onSearch = e => {
    switch (e.target.value) {
      case "likes":
        setSchools([...schools].sort((a, b) => b.likes.count - a.likes.count));
        break;
      case "newest":
        setSchools(
          [...schools].sort((a, b) => {
            return b._createdAt.localeCompare(a._createdAt);
          })
        );
        break;
    }
  };

  return (
    <Layout>
      <PageContainer
        styles={{
          alignItems: "unset",
          justifyContent: "unset",
        }}
      >
        <div className="catalog-page">
          {isLoading ? (
            <Spinner />
          ) : (
            !schools.length && (
              <div className="missing__schools">
                <p> Все още няма добавени училища. Бъди първият!</p>
                <Link to="/create">Създай</Link>
              </div>
            )
          )}
          {schools.length > 0 && (
            <div className="search-wrap">
              <select
                className="search-select"
                defaultValue="likes"
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
                onChange={e => setQuery(e.target.value)}
                onClick={() => (selectRef.current.value = "settlement")}
              />
              <span className="search-icon__container">
                <FiSearch />
              </span>
            </div>
          )}

          {!filteredSchools.length && schools.length && !isLoading ? (
            <div className="missing__schools">
              <p> Няма резултат</p>
            </div>
          ) : (
            <div className="card-container">
              {filteredSchools.map(school => (
                <Card key={school._id} {...school} />
              ))}
            </div>
          )}
        </div>
      </PageContainer>
    </Layout>
  );
};

export default Catalog;
