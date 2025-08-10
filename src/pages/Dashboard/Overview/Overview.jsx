import React from "react";
import useRole from "../../../hooks/useRole";
import SellerOverview from "./SellerOverview";
import Loader from "../../../components/common/Loader";

const Overview = () => {
  const [role, isRoleLoading] = useRole();
  if (isRoleLoading) {
    return <Loader />;
  }
  if (role === "seller") {
    return <SellerOverview />;
  }
};

export default Overview;
