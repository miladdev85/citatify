import React from "react";

const LoadingSpinner = ({ className }) => {
  return (
    <span
      className={`spinner-border spinner-border-sm ${className && className}`}
      role="status"
      aria-hidden="true"
    ></span>
  );
};

export default LoadingSpinner;
