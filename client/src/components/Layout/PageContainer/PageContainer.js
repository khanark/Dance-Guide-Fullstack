import "./PageContainer.scss";

const PageContainer = ({ children, styles }) => {
  return <article style={styles}>{children}</article>;
};

export default PageContainer;
