import React from "react";
import { TiWarning } from "react-icons/ti";

const ErrorText = ({ children }) => {
  return (
    <div className="flex gap-1 items-center">
      <TiWarning size={16} className="text-red-500" />
      <span className="text-red-500">{children}</span>
    </div>
  );
};

export default ErrorText;
