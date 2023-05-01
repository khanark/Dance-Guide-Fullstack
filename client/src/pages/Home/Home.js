import "./Home.css";

import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";
import customerImages from "../../assets/images/customers/CustomerImages";
import { setPageTitle } from "../../util/util";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    setPageTitle("Home");
  }, []);

  return (
    <div className="home-page">
      <Layout isLandingPage={true}>
        {/* <header>
        <Navigation />
      </header> */}

        <section className="hero container">
          <h1 className="title-primary">
            Your <span>ultimate</span> resource for dance schools in your area!
          </h1>
          <p className="desc">
            With DanceGuide, you can easily search for dance schools by
            location, dance style, and even instructor. Our user-friendly
            interface makes it easy to find the information you need quickly, so
            you can get back to what you love - dancing.
          </p>
          <div className="customers-wrapper">
            <ul className="customers">
              {customerImages.map((img, i) => (
                <img
                  className="customer-img"
                  key={i}
                  src={img}
                  alt={`img, ${i}`}
                />
              ))}
            </ul>
            <p className="customer-description">
              Over <span>250,000+</span> people already found their passion!
            </p>
          </div>
          <Link to="/catalog" className="btn btn--browse">
            Browse Catalog
          </Link>
          <Link to="/login" className="btn btn--signin">
            Sign In
          </Link>
        </section>
      </Layout>
    </div>
  );
};

export default Home;
