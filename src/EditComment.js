import React from "react";
import Input from "./Components/Input";
import Button from "./Components/Button";

const EditComment = ({ value, onInputChange, onCancel, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <Input style={{ width: "100%" }} value={value} onChange={onInputChange} autoFocus />
      <Button className="btn-sm btn-mdb-color px-3 py-2 ml-0" type="submit">
        Save
      </Button>
      <Button onClick={onCancel} type="button" className="btn-sm btn-danger px-3 py-2 ml-2">
        Cancel
      </Button>
    </form>
  );
};

export default EditComment;
