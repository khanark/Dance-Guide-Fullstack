import './Catalog.scss';

import Card from '../../components/CardComponent/Card';
import { FiSearch } from 'react-icons/fi';
import Layout from '../../components/Layout/Layout';
import PageContainer from '../../components/Layout/PageContainer/PageContainer';

const Catalog = () => {
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
          <div className="search-wrap">
            <input type="text" name="search" id="seach" placeholder="Търсене" />
            <span className="search-icon__container">
              <FiSearch />
            </span>
          </div>
          <div className="card-container">
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default Catalog;
