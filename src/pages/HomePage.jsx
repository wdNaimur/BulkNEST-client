import React, { useEffect } from "react";
import Banner from "../components/Banner";

const HomePage = () => {
  useEffect(() => {
    document.title = "BulkNEST | Home";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-screen min-h-96">
      <Banner />
    </div>
  );
};

export default HomePage;
