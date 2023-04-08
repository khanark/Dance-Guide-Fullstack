import "./About.scss";

import CardInfo from "./CardInfo/CardInfo";
import Layout from "../../components/Layout/Layout";
import banner from "../../assets/images/another-about-page-logo.png";
import { setPageTitle } from "../../util/util";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    setPageTitle("За нас");
  }, []);

  return (
    <Layout>
      <div className="about_page">
        <div className="about-page__info">
          <CardInfo
            title="Мисия"
            text="В DanceGuideBG разбираме, че танцуването е повече от физическа активност. То е изкуство и начин да се изразим. Нашата мисия е да улесним всеки, който обича да танцува, да намери перфектното танцово училище за своите нужди и предпочитания."
          />
          <div className="inbetween-line"></div>
          <CardInfo
            title="Екип"
            text="Нашата екип от експерти е съставил изчерпателен списък на танцовите училища в България, който включва всичко от балет и салса до бални танци и хип хоп. Независимо дали сте начинаещ или опитен танцьор, търсите рекреативен клас или професионална програма за обучение, ще намерите това, от което се нуждаете в DanceGuideBG."
          />
        </div>
        <div className="about-page__logo">
          <img src={banner} alt="about-logo" />
        </div>
      </div>
    </Layout>
  );
};

export default About;
