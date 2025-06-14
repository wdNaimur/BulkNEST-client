import React, { useEffect } from "react";
import Banner from "../components/Banner";
import HowItWorks from "../components/HowItWorks";
import FAQSection from "../components/FAQSection";
import CategoriesSection from "../components/CategoriesSection";

const HomePage = () => {
  useEffect(() => {
    document.title = "BulkNEST | Home";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="min-h-96">
        <Banner />
      </section>
      <section>
        <HowItWorks />
      </section>
      <section>
        <CategoriesSection />
      </section>
      <section>
        <FAQSection />
      </section>
    </>
  );
};

export default HomePage;
