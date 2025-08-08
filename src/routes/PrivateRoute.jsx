import React, { use } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";
import LoaderDataFetch from "../components/common/LoaderDataFetch";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();
  if (loading) {
    return <LoaderDataFetch />;
  }
  if (!user) {
    return (
      <Navigate
        to="/signIn"
        state={{ from: location.pathname, fromPrivateRoute: true }}
      />
    );
  }
  return children;
};

export default PrivateRoute;
