import React, { use } from "react";
import { Outlet, useNavigation } from "react-router";
import Loader from "../components/common/Loader";
import { Toaster } from "react-hot-toast";
import LoaderDataFetch from "../components/common/LoaderDataFetch";
import Footer from "../components/navigation/Footer";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/navigation/Navbar";

const HomeLayout = () => {
  const { loading } = use(AuthContext);
  const { state } = useNavigation();
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="bg-base-200 flex flex-col min-h-screen font-outfit">
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <main className="lg:mt-[65px] mt-[64px] flex-1">
        {state == "loading" ? <LoaderDataFetch /> : <Outlet />}
      </main>
      {/* footer  */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default HomeLayout;
