import { Link } from "react-router-dom";

const NoSchool = ({ redirect, msg }) => {
  return (
    <div className="no-schools">
      <p>{msg}</p>
      <Link to={redirect.path}>{redirect.name}</Link>
    </div>
  );
};

export default NoSchool;
