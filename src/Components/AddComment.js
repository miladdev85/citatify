import React, { useState } from "react";
import Input from "./Shared/Input";
import Button from "./Shared/Button";
import ErrorMsg from "./Shared/ErrorMsg";

const AddComment = ({ onCreate }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = event => setContent(event.target.value);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      setLoading(true);
      await onCreate(content);
      setLoading(false);
      setContent("");
    } catch (error) {
      setLoading(false);
      setError(error);
    }
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
          {error && <ErrorMsg message={error.message} />}
        </div>
      </div>
      <div className="d-flex justify-content-end mb-5">
        <Button
          className="btn-sm btn-mdb-color px-3 py-2 mx-0"
          type="submit"
          disabled={!content || loading}
        >
          {loading ? "Submitting" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default AddComment;
