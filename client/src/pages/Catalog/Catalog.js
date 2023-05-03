import "./Catalog.css";
import "../../App.css";

import { useEffect, useRef, useState } from "react";

import Card from "../../components/CardComponent/Card";
import CustomSpinner from "../../components/spinner/Spinner";
import { FiSearch } from "react-icons/fi";
import GreetModal from "../../components/Modal/Modal";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import catalogHeaderImage from "../../assets/images/page_headers/catalog-header.jpg";
import catalogTestImage from "../../assets/images/catalog-image.avif";
import catalogTestImageTwo from "../../assets/images/catalog-image-2.jpg";
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

  console.log(filteredSchools);

  return (
    <Layout>
      {user?.isNewAcc && showComponent && <GreetModal />}

      <div className="catalog-page page">
        <header className="container-secondary grid grid--cols-2">
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
          </div>
          <div className="header-right-box">
            <img
              src={catalogHeaderImage}
              alt="catalog header"
              className="page-header--img"
            />
          </div>
        </header>
        <main className="section-catalog section">
          <div className="catalog container-primary">
            <div className="catalog-search--menu">
              <h3 className="catalog-search-menu--title">Filter by</h3>
              <div
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
                  <button className="hidden-box--btn">Hip Hop</button>
                  <button className="hidden-box--btn">Balet</button>
                  <button className="hidden-box--btn">Folklore</button>
                  <button className="hidden-box--btn">Modern Dance</button>
                </div>
              </div>
              <button className="btn-search">Newest</button>
              <button className="btn-search">Oldest</button>
            </div>
            <div className="catalog-list">
              {/* <div className="catalog-list--item">
                <img
                  src={catalogTestImage}
                  alt="worman-card-image"
                  className="item-img"
                />
                <div className="item-info">
                  <h2 className="title-tertirty">Free Spirits</h2>
                  <h3 className="subtitle">Contacts</h3>
                  <ul className="item-contacts">
                    <li className="item-contacts-info">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="contacts-icon"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                        />
                      </svg>
                      <span>0877558277</span>
                    </li>
                    <li className="item-contacts-info">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="contacts-icon"
                      >
                        <path
                          stroke-linecap="round"
                          d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                        />
                      </svg>

                      <p>borislav.godumov@outlook.com</p>
                    </li>
                    <li className="item-contacts-info">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="contacts-icon"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>

                      <p>www.dancestyle.bg</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="catalog-list--item">
                <img
                  src={catalogTestImageTwo}
                  alt="worman-card-image"
                  className="item-img"
                />
                <div className="item-info">
                  <h2 className="title-tertirty">Free Spirits</h2>
                  <h3 className="subtitle">Contacts</h3>
                  <ul className="item-contacts">
                    <li className="item-contacts-info">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="contacts-icon"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                        />
                      </svg>
                      <span>0877558277</span>
                    </li>
                    <li className="item-contacts-info">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="contacts-icon"
                      >
                        <path
                          stroke-linecap="round"
                          d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                        />
                      </svg>

                      <p>borislav.godumov@outlook.com</p>
                    </li>
                    <li className="item-contacts-info">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="contacts-icon"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>

                      <p>www.dancestyle.bg</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="catalog-list--item">
                <img
                  src={catalogTestImage}
                  alt="worman-card-image"
                  className="item-img"
                />
                <div className="item-info">
                  <h2 className="title-tertirty">Free Spirits</h2>
                  <h3 className="subtitle">Contacts</h3>
                  <ul className="item-contacts">
                    <li className="item-contacts-info">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="contacts-icon"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                        />
                      </svg>
                      <span>0877558277</span>
                    </li>
                    <li className="item-contacts-info">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="contacts-icon"
                      >
                        <path
                          stroke-linecap="round"
                          d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                        />
                      </svg>

                      <p>borislav.godumov@outlook.com</p>
                    </li>
                    <li className="item-contacts-info">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="contacts-icon"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>

                      <p>www.dancestyle.bg</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="catalog-list--item">
                <img
                  src={catalogTestImage}
                  alt="worman-card-image"
                  className="item-img"
                />
                <div className="item-info">
                  <h2 className="title-tertirty">Free Spirits</h2>
                  <h3 className="subtitle">Contacts</h3>
                  <ul className="item-contacts">
                    <li className="item-contacts-info">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="contacts-icon"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                        />
                      </svg>
                      <span>0877558277</span>
                    </li>
                    <li className="item-contacts-info">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="contacts-icon"
                      >
                        <path
                          stroke-linecap="round"
                          d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                        />
                      </svg>

                      <p>borislav.godumov@outlook.com</p>
                    </li>
                    <li className="item-contacts-info">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="contacts-icon"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>

                      <p>www.dancestyle.bg</p>
                    </li>
                  </ul>
                </div>
              </div> */}
              {filteredSchools.map((school) => (
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
