import React, { useEffect } from "react";
import Banner from "../../components/home/Banner";
import HowItWorks from "../../components/home/HowItWorks";
import FeaturedCategoriesSection from "../../components/products/FeaturedCategoriesSection";
import FAQSection from "../../components/home/FAQSection";

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
        <FeaturedCategoriesSection />
      </section>
      <section>
        <FAQSection />
      </section>
    </>
  );
};

export default HomePage;
