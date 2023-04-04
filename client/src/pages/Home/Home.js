import "./Home.scss";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <article className="home-page page">
      <div className="primary__slogan">
        <p className="first__paragraph">
          Намерете <span className="the-best-schools">най-добрите</span>
        </p>
        <p className="second__paragraph">
          танцови <span>училища в България</span> днес!
        </p>
      </div>
      <Link className="btn__call-to-action" to="/catalog">
        Разгледай
      </Link>
    </article>
  );
};

export default Home;
