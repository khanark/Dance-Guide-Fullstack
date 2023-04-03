import { Navigate, Outlet } from "react-router-dom";

import { UserContext } from "../contexts/AuthContext";
import { useContext } from "react";

const PrivateRoute = ({ redirectPath }) => {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
