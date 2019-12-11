import React, { useState } from "react";
import { convertFirestoreDate, belongsToCurrentUser } from "./Utils/utilities";
import { Link } from "react-router-dom";
import { db } from "./Utils/firebase";
import commentIcon from "./Assets/comments.png";
import likeIcon from "./Assets/like.png";

import "./Styles/Post.css";
import Button from "./Components/Button";

// If component is rendered in PostPage component, we use the postPage props and don't render link to Details

const Post = ({
  author,
  title,
  id,
  content,
  user,
  currentUser,
  createdAt,
  favorites,
  comments,
  postPage
}) => {
  const [canStar, setCanStar] = useState(true);

  // A reference to the post so we can easily use it in functions when needed further down.
  const postRef = db.doc(`posts/${id}`);

  const onRemove = () => postRef.delete();

  const onAddStar = () => {
    postRef.update({ favorites: favorites + 1 });
    setCanStar(false);
  };

  return (
    <article className="mt-5 ">
      <div className="card rounded-0">
        <div className="card-header d-flex align-items-center flex-wrap">
          <div>
            <p className="mb-0">
              {title}{" "}
              <span className="small font-weight-light">
                posted by {user.displayName} {convertFirestoreDate(createdAt)}
              </span>
            </p>
          </div>
          <div className="ml-auto d-flex">
            <Link to={`/posts/${id}`} style={{ lineHeight: 0 }}>
              <img src={commentIcon} alt="comments" className="card__title-icon-comment" />
            </Link>
            <p className="mb-0">{comments}</p>
            <img
              style={{ cursor: canStar && currentUser ? "pointer" : "not-allowed" }}
              src={likeIcon}
              alt="like"
              className="card__title-icon-like"
              onClick={canStar && currentUser && onAddStar}
            />
            <p className="mb-0">{favorites}</p>
          </div>
        </div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>{content}</p>
            <footer className="blockquote-footer">
              <cite title={author}>{author}</cite>
            </footer>
          </blockquote>
        </div>
        <div className="card-footer text-muted text-center mt-1 d-flex justify-content-end p-1 px-2">
          <Button
            onClick={onAddStar}
            disabled={!canStar || !currentUser}
            className="btn-link text-dark p-1"
          >
            Like
          </Button>
          {!postPage && (
            <Link to={`/posts/${id}`} className="btn btn-link text-dark p-1">
              Details
            </Link>
          )}
          {belongsToCurrentUser(currentUser, user) && (
            <>
              <Button onClick={onRemove} className="btn-link text-danger p-1">
                Remove
              </Button>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default Post;
