import React from "react";

const Wrapper = ({ children }) => {
  return <div className="position-absolute w-100">{children}</div>;
};

export default Wrapper;
