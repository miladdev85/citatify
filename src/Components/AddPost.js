import React, { useState } from "react";
import { db, auth } from "../Utils/firebase";
import Input from "./Shared/Input";
import Button from "./Shared/Button";

const AddPost = () => {
  const [post, setPost] = useState({ author: "", title: "", content: "" });

  // Spred existing state so we don't overwrite existing because Hooks don't merge existing state.
  const handleChange = event => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };

  // Get authenticated user and add properties to the object before posting to Firestore.
  // Submit button is disabled if quote content is less than 10 characters and if author is empty.
  // That is why we don't validate content or author here.
  const handleSubmit = event => {
    event.preventDefault();
    const { author, title, content } = post;
    const { uid, displayName, email, photoURL } = auth.currentUser;
    const newPost = {
      author,
      title,
      content,
      user: {
        uid,
        displayName,
        email,
        photoURL
      },
      favorites: 0,
      comments: 0,
      createdAt: new Date()
    };

    // Get posts collection from Firestore and add the new post object in to that collection.
    // Empty input fields
    db.collection("posts").add(newPost);
    setPost({ author: "", title: "", content: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col">
          <Input
            inputType="input"
            type="text"
            name="author"
            containerClass="mt-0"
            required
            placeholder="Author"
            value={post.author}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <Input
            containerClass="mt-0"
            inputType="input"
            type="text"
            name="title"
            placeholder="Title"
            value={post.title}
            onChange={handleChange}
          />
        </div>
      </div>
      <Input
        containerClass="md-outline"
        inputType="textarea"
        name="content"
        required
        inputClass="rounded-0"
        rows="3"
        placeholder="Quote"
        value={post.content}
        onChange={handleChange}
      >
        {post.content.length < 10 && (
          <small className="form-text text-muted">Quote must contain atleast 10 characters</small>
        )}
      </Input>
      <div className="d-flex justify-content-end mb-5">
        <Button
          className="btn-mdb-color mx-0 px-3 py-2"
          disabled={post.content.length < 10 || !post.author}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default AddPost;
