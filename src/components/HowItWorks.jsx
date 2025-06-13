import React from "react";
import { FaUserPlus, FaBoxOpen, FaShippingFast } from "react-icons/fa";
import { MdOutlineHandshake } from "react-icons/md";

const HowItWorks = () => {
  const steps = [
    {
      id: "1",
      title: "Create an Account",
      icon: <FaUserPlus size={50} />,
      desc: "Sign up as a buyer or supplier and verify your profile to begin trading.",
    },
    {
      id: "2",
      title: "List or Browse Products",
      icon: <FaBoxOpen size={50} />,
      desc: "Suppliers can list their inventory while buyers browse or search for products.",
    },
    {
      id: "3",
      title: "Connect & Negotiate",
      icon: <MdOutlineHandshake size={50} />,
      desc: "Start conversations, negotiate deals, and agree on terms through our secure platform.",
    },
    {
      id: "4",
      title: "Manage Shipping & Delivery",
      icon: <FaShippingFast size={50} />,
      desc: "Coordinate fulfillment and logistics with ease once the deal is finalized.",
    },
  ];
  return (
    <section className="pt-16 pb-8 bg-base-100">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-2 text-secondary">
            How It Works
          </h2>
          <p className="opacity-80">
            Your Seamless Journey from Discovery to Delivery
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-base-200 text-secondary rounded-2xl p-6 shadow-sm relative hover:scale-[1.02] hover:shadow-xl shadow-primary/5 transition-transform duration-300 cursor-default overflow-hidden"
            >
              <div className="flex flex-col justify-center items-center">
                <div className="mb-4 text-primary text-3xl ">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-sm opacity-80">{step.desc}</p>
              </div>
              <div className="absolute top-4 right-2 text-9xl  text-primary w-8 h-8 flex items-center justify-center font-bold font-unbounded opacity-20">
                {step.id}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
