import React, { useContext, useState } from "react";
import { convertFirestoreDate } from "./Utils/utilities";
import { Link } from "react-router-dom";
import { db } from "./Utils/firebase";
import { AuthContext } from "./Context/AuthContext";
import commentIcon from "./Assets/comments.png";
import likeIcon from "./Assets/like.png";

import "./Styles/Post.css";

const belongsToCurrentUser = (currentUser, postAuthor) => {
  if (!currentUser) return false;
  return currentUser.uid === postAuthor.uid;
};

// postPage props is used for weither or not display a link to Details

const Post = ({ author, title, id, content, user, createdAt, favorites, comments, postPage }) => {
  const [canStar, setCanStar] = useState(true);
  const { user: currentUser } = useContext(AuthContext);

  // A reference to the post so we can easily use it when needed.
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
          <button
            onClick={onAddStar}
            disabled={!canStar || !currentUser}
            className="btn btn-link text-dark p-1"
          >
            Like
          </button>
          {!postPage && (
            <Link to={`/posts/${id}`} className="btn btn-link text-dark p-1">
              Details
            </Link>
          )}
          {belongsToCurrentUser(currentUser, user) && (
            <>
              <button onClick={onRemove} className="btn btn-link text-danger p-1">
                Remove
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default Post;
