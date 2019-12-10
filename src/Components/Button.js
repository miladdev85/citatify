import React from "react";

const Button = ({ className, children, ...otherProps }) => {
  return (
    <button className={`btn ${className ? className : ""}`} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
