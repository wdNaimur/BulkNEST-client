import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";

const HomePage = () => {
  useEffect(() => {
    document.title = "BulkNEST | Home";
  }, []);

  return (
    <div className="w-screen min-h-96">
      <Banner />
    </div>
  );
};

export default HomePage;
