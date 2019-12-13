import React from "react";

const ErrorMsg = ({ message }) => {
  return <small className="form-text text-left mb-4 text-danger">{message}</small>;
};

export default ErrorMsg;
