import "./PageHeader.css";

const PageHeader = ({ image }) => {
  return (
    <header className="page-header container-secondary section grid grid--cols-2">
      <div className="header-left-box">
        <h1 className="title-primary">
          Find your dance school from all around the country!
        </h1>
        <h2 className="title-secondary">Search by different criteria.</h2>
        <p className="desc">
          Our search feature allows users to easily find what they are looking
          for by filtering through various criteria, such as location, style,
          and more.
        </p>
      </div>
      <div className="header-right-box">
        <img src={image} className="page-header--img" alt="catalog header" />
      </div>
    </header>
  );
};

export default PageHeader;
