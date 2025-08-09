import React from "react";

const HomeSectionHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-3xl lg:text-4xl font-bold mb-2 text-secondary">
        {title}
      </h2>
      <p className="opacity-80 px-4">{subtitle}</p>
    </div>
  );
};

export default HomeSectionHeader;
