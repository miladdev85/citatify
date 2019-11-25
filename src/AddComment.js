import React, { useState } from "react";

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
          <div className="md-form mt-0">
            <input
              type="text"
              name="content"
              required
              placeholder="Comment"
              value={content}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end mb-5">
        <button className="btn btn-sm btn-mdb-color px-3 py-2 mx-0" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddComment;
