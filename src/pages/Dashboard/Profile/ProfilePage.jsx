import React, { use, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import ProfileDetails from "../../../components/profile/ProfileDetails";
import Loader from "../../../components/common/Loader";
import useRole from "../../../hooks/useRole";
import DashboardHeading from "../../../components/common/DashboardHeading";

const ProfilePage = () => {
  useEffect(() => {
    document.title = "BulkNest | Profile";
  }, []);
  const { loading } = use(AuthContext);
  const [, isRoleLoading] = useRole();
  if (loading || isRoleLoading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col">
      <DashboardHeading title={`Profile`} />
      <main className="flex-1">
        <ProfileDetails />
      </main>
    </div>
  );
};

export default ProfilePage;
