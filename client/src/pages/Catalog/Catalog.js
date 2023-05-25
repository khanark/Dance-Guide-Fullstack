import './Catalog.css';
import '../../App.css';

import { useEffect, useState } from 'react';

import Card from '../../components/CardComponent/Card';
import FilterMenu from '../../components/FilterMenu/FIlterMenu';
import GreetModal from '../../components/Modal/Modal';
import Layout from '../../components/Layout/Layout';
import PageHeader from '../../components/PageHeader/PageHeader';
import { Spinner } from '@chakra-ui/react';
import catalogHeaderImage from '../../assets/images/page_headers/catalog-header.jpg';
import schoolsFactory from '../../services/schools';
import { setPageTitle } from '../../util/util';
import { useSchoolContext } from '../../contexts/SchoolContext';
import { useUserContext } from '../../contexts/AuthContext';

const Catalog = () => {
  const { schools, setSchools } = useSchoolContext();
  const [isLoading, setIsLoading] = useState(true);
  const [showComponent, setShowComponent] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    style: '',
    order: '',
  });

  const { getAllSchools } = schoolsFactory();
  const { user } = useUserContext();

  useEffect(() => {
    setPageTitle('Catalog');
    setIsLoading(true);
    setSchools([]);
    setTimeout(() => setShowComponent(true), 1200);
    getAllSchools(filters)
      .then(data => {
        setSchools(data);
      })
      .finally(() => setIsLoading(false));
  }, [filters]);

  return (
    <Layout>
      {user?.isNewAcc && showComponent && <GreetModal />}

      <div className="catalog-page">
        <header className="catalog-header">
          <PageHeader image={catalogHeaderImage} />
        </header>
        <main className="section-catalog section">
          <div className="catalog container-primary">
            <FilterMenu setFilters={setFilters} filters={filters} />
            <div className={`catalog-list ${isLoading && 'list-schools-loading'}`}>
              {isLoading && <Spinner className="loading" />}
              {schools.map(school => (
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
