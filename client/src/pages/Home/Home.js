import "./Home.css";

import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
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
        <section className="hero container section">
          <h1 className="title-primary">
            Your <span>ultimate</span> resource for dance schools in your area!
          </h1>
          <h5 className="desc text-shadow">
            With DanceGuide, you can easily search for dance schools by
            location, dance style, and even instructor. Our user-friendly
            interface makes it easy to find the information you need quickly, so
            you can get back to what you love - dancing.
          </h5>
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
            <h4 className="customer-description text-shadow">
              Over <span>250,000+</span> people already found their passion!
            </h4>
          </div>
          <Link to="/catalog" className="btn btn--browse">
            Catalog
          </Link>
          <Link to="/register" className="btn btn--signin">
            Sign Up
          </Link>
        </section>
      </Layout>
    </div>
  );
};

export default Home;
