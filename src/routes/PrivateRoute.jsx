import React, { use } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../AuthContexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = use(AuthContext);
  const location = useLocation();
  console.log(location);
  if (!user) {
    return (
      <Navigate
        to="/signin"
        state={{ from: location.pathname, fromPrivateRoute: true }}
      />
    );
  }
  return children;
};

export default PrivateRoute;
