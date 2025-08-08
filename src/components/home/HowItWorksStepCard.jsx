import React from "react";

const HowItWorksStepCard = ({ step }) => {
  return (
    <div className="bg-base-200 text-secondary rounded-2xl p-6 shadow-sm relative hover:scale-[1.02] hover:shadow-xl shadow-primary/5 transition-transform duration-300 cursor-default overflow-hidden">
      <div className="flex flex-col justify-center items-center">
        <div className="mb-4 text-primary text-3xl ">{step.icon}</div>
        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
        <p className="text-sm opacity-80">{step.desc}</p>
      </div>
      <div className="absolute top-4 right-2 text-9xl  text-primary w-8 h-8 flex items-center justify-center font-bold font-unbounded opacity-20">
        {step.id}
      </div>
    </div>
  );
};

export default HowItWorksStepCard;
