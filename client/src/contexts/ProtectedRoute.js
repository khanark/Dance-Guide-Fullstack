import { Navigate, Outlet } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "./UserContext";

const PrivateRoute = ({ redirectPath }) => {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
