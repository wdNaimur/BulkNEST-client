import React, { useEffect } from "react";
import Banner from "../components/Banner";
import HowItWorks from "../components/HowItWorks";

const HomePage = () => {
  useEffect(() => {
    document.title = "BulkNEST | Home";
    window.scrollTo(0, 0);
  }, []);

  return (
    <section>
      <div className="min-h-96">
        <Banner />
      </div>
      <div>
        <HowItWorks />
      </div>
    </section>
  );
};

export default HomePage;
