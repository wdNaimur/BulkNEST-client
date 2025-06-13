import React from "react";
import Marquee from "react-fast-marquee";

const TrustedByBusinesses = () => {
  return (
    <section className="bg-base-100 py-16">
      <div className="container px-4 mx-auto text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold mb-2 text-secondary">
          Trusted by Businesses
        </h2>
        <p className="opacity-80">Powering global wholesale growth.</p>
      </div>

      {/* Logos (placeholder) */}
      <Marquee>
        <div className="flex justify-center items-center">
          <img
            className="h-16"
            src={`https://i.ibb.co/2b7g4wk/O.png`}
            alt="CrewUp Logo"
          />
          <img
            className="h-16"
            src={`https://i.ibb.co/Hf5PKZ7z/carrer-NEST-Logo-dark.png`}
            alt="carrer-NEST"
          />
        </div>
      </Marquee>
    </section>
  );
};

export default TrustedByBusinesses;
