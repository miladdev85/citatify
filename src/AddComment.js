import React, { useState } from "react";
import Input from "./Components/Input";
import Button from "./Components/Button";

const AddComment = ({ onCreate }) => {
  const [content, setContent] = useState("");

  const handleChange = event => setContent(event.target.value);

  const handleSubmit = event => {
    event.preventDefault();
    onCreate(content);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="row">
        <div className="col">
          <Input
            containerClass="mt-0"
            type="text"
            name="content"
            required
            placeholder="Comment"
            value={content}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="d-flex justify-content-end mb-5">
        <Button className="btn-sm btn-mdb-color px-3 py-2 mx-0" type="submit" disabled={!content}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default AddComment;
