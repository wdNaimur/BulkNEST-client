import React, { use } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router";

const AboutUsPage = () => {
  const { user } = use(AuthContext);
  return (
    <div className="p-6 bg-gradient-to-t from-base-100 to-base-200 lg:p-12 text-secondary">
      <div className=" space-y-12 container mx-auto">
        {/* Heading */}
        <section className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">
            About BulkNest
          </h1>
          <p className="text-secondary/60">
            At <span className="font-semibold">BulkNest</span>, we connect
            businesses, suppliers, and delivery networks across Bangladesh
            through a secure and efficient B2B wholesale platform.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-8 mx-auto">
          <div className="bg-base-200 p-6 rounded-xl  shadow-xl shadow-primary/5 border-3 border-primary/15">
            <h2 className="text-xl font-bold mb-3">Our Mission</h2>
            <p className="text-secondary/60">
              To empower suppliers and businesses by providing a seamless,
              technology-driven wholesale marketplace that promotes trust,
              transparency, and growth.
            </p>
          </div>
          <div className="bg-base-200 p-6 rounded-xl  shadow-xl shadow-primary/5 border-3 border-primary/10">
            <h2 className="text-xl font-bold mb-3">Our Vision</h2>
            <p className="text-secondary/60">
              To become Bangladesh’s most trusted and widely used B2B platform,
              enabling businesses to expand their reach and operate with maximum
              efficiency.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Our Core Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-base-200 p-5 rounded-xl  shadow-xl shadow-primary/5 text-center border-3 border-primary/15">
              <h3 className="font-semibold mb-2">Trust</h3>
              <p className="text-secondary/80">
                Building long-term relationships based on honesty and
                reliability.
              </p>
            </div>
            <div className="bg-base-200 p-5 rounded-x  shadow-xl shadow-primary/5 text-center border-3 border-primary/15">
              <h3 className="font-semibold mb-2">Innovation</h3>
              <p className="text-secondary/60">
                Continuously improving our platform to meet evolving market
                needs.
              </p>
            </div>
            <div className="bg-base-200 p-5 rounded-xl  shadow-xl shadow-primary/5 text-center border-3 border-primary/15">
              <h3 className="font-semibold mb-2">Collaboration</h3>
              <p className="text-secondary/60">
                Encouraging teamwork between buyers, sellers, and logistics
                partners.
              </p>
            </div>
            <div className="bg-base-200 p-5 rounded-xl  shadow-xl shadow-primary/5 text-center border-3 border-primary/10">
              <h3 className="font-semibold mb-2">Customer Focus</h3>
              <p className="text-secondary/60">
                Prioritizing the needs and success of our business users.
              </p>
            </div>
          </div>
        </section>

        {!user && (
          <section className="bg-secondary text-base-100 p-8 rounded-xl  shadow-xl shadow-primary/5 text-center mx-auto">
            <h2 className="text-2xl font-bold mb-3">
              Join the BulkNest Network
            </h2>
            <p className="mb-4">
              Whether you're a supplier or a buyer, BulkNest is here to help you
              grow your business and reach new markets.
            </p>
            <Link
              to={`/signIn`}
              className="btn-primary btn text-secondary font-semibold px-6 py-2 rounded-lg  shadow-xl shadow-primary/5  transition"
            >
              Get Started
            </Link>
          </section>
        )}
      </div>
    </div>
  );
};

export default AboutUsPage;
