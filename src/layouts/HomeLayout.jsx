import React, { use } from "react";
import { Outlet, useNavigation } from "react-router";
import Navbar from "../components/Navbar";
import { AuthContext } from "../AuthContexts/AuthContext";
import Loader from "../UI/Loader";
import { Toaster } from "react-hot-toast";
import LoaderDataFetch from "../UI/LoaderDataFetch";
import Footer from "../components/Footer";

const HomeLayout = () => {
  const { loading } = use(AuthContext);
  const { state } = useNavigation();
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col bg-base-200 min-h-screen font-outfit">
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <main className="flex-1 lg:mt-[65px] mt-[64px] overflow-x-auto">
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
