import './Catalog.scss';

import { useEffect, useState } from 'react';

import Card from '../../components/CardComponent/Card';
import { FiSearch } from 'react-icons/fi';
import Layout from '../../components/Layout/Layout';
import { Link } from 'react-router-dom';
import PageContainer from '../../components/Layout/PageContainer/PageContainer';
import { getAllSchools } from '../../services/schools';

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
          flexDirection: 'column',
          justifyContent: 'unset',
          gap: '3rem',
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
            {schools.length === 0 ? (
              <div className="missing__schools">
                <p> Все още няма добавени училища. Бъди първият!</p>
                <Link to="/create">Създай</Link>
              </div>
            ) : (
              schools.map(school => <Card key={school._id} {...school} />)
            )}
          </div>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default Catalog;
