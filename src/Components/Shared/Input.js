import React from "react";

const Input = ({ containerClass, inputType, inputClass, children, ...otherProps }) => {
  let inputElement = null;
  switch (inputType) {
    case "input":
      inputElement = (
        <input {...otherProps} className={`form-control ${inputClass ? inputClass : ""}`} />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          {...otherProps}
          className={`form-control md-textarea ${inputClass ? inputClass : ""}`}
        />
      );
      break;
    default:
      inputElement = (
        <input {...otherProps} className={`form-control ${inputClass ? inputClass : ""}`} />
      );
  }

  return (
    <div className={`md-form ${containerClass ? containerClass : ""}`}>
      {inputElement}
      {children}
    </div>
  );
};

export default Input;
