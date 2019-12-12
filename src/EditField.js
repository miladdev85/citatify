import React from "react";
import Input from "./Components/Input";
import Button from "./Components/Button";
import LoadingSpinner from "./LoadingSpinner";

const EditField = ({ loading, value, onInputChange, onCancel, onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className="mb-3">
      <Input style={{ width: "100%" }} value={value} onChange={onInputChange} autoFocus />
      <Button className="btn-sm btn-mdb-color px-3 py-2 ml-0" type="submit">
        {loading && <LoadingSpinner className="mr-2 m-0 p-0" />}
        {loading ? "Saving" : "Save"}
      </Button>
      <Button
        onClick={onCancel}
        type="button"
        className="btn-sm btn-danger px-3 py-2 ml-2"
        disabled={loading}
      >
        Cancel
      </Button>
      {children}
    </form>
  );
};

export default EditField;
