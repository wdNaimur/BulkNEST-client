import React from "react";
import useRole from "../../../hooks/useRole";
import SellerOverview from "./SellerOverview";
import Loader from "../../../components/common/Loader";
import CustomerOverview from "./CustomerOverview";
import AdminOverview from "./AdminOverview";

const Overview = () => {
  const [role, isRoleLoading] = useRole();
  if (isRoleLoading) {
    return <Loader />;
  }
  if (role === "seller") {
    return <SellerOverview />;
  }
  if (role === "customer") {
    return <CustomerOverview />;
  }
  if (role === "admin") {
    return <AdminOverview />;
  }
};

export default Overview;
