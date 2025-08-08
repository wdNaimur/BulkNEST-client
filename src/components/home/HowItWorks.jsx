import React from "react";
import { FaUserPlus, FaBoxOpen, FaShippingFast } from "react-icons/fa";
import { MdOutlineHandshake } from "react-icons/md";
import { motion, useInView } from "framer-motion";
import Step from "./HowItWorksStepCard";
import HowItWorksStepCard from "./HowItWorksStepCard";

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

  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(6px)", scale: 0.9 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }
          : { opacity: 0, y: 40, filter: "blur(6px)", scale: 0.9 }
      }
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="pt-16 pb-8 bg-base-100"
    >
      <div className="container mx-auto px-4 text-center">
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-2 text-secondary">
            How It Works
          </h2>
          <p className="opacity-80 px-4">
            Seamless Journey from Discovery to Delivery
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <HowItWorksStepCard key={step.id} step={step} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default HowItWorks;
