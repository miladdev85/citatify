import React, { useState } from "react";
import { db, auth } from "./Utils/firebase";

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
          <div className="md-form mt-0">
            <input
              type="text"
              name="author"
              required
              placeholder="Author"
              value={post.author}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <div className="col">
          <div className="md-form mt-0">
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Title"
              value={post.title}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="md-form md-outline">
        <textarea
          value={post.content}
          onChange={handleChange}
          required
          name="content"
          className="md-textarea form-control rounded-0"
          rows="3"
          placeholder="Quote"
        ></textarea>
        {post.content.length < 10 && (
          <small className="form-text text-muted">Quote must contain atleast 10 characters</small>
        )}
      </div>
      <div className="d-flex justify-content-end mb-5">
        <button
          className="btn btn-mdb-color mx-0 px-3 py-2"
          type="submit"
          disabled={post.content.length < 10 || !post.author}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddPost;
