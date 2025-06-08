import React, { use } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { AuthContext } from "../AuthContexts/AuthContext";
import Loader from "../UI/Loader";
import { Toaster } from "react-hot-toast";

const HomeLayout = () => {
  const { loading } = use(AuthContext);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="flex bg-base-200 min-h-screen font-outfit">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <main className="flex-1 lg:mt-[65px] mt-[64px] overflow-x-auto">
        <Outlet />
      </main>
      {/* footer  */}
    </div>
  );
};

export default HomeLayout;
