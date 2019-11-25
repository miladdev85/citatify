import React from "react";
import { convertFirestoreDate } from "./Utils/utilities";

const Comment = ({ content, user, createdAt }) => {
  return (
    <article className="container mt-5">
      <div className="rounded-0">
        <div className="row" style={{ marginLeft: "10px", marginRight: "10px" }}>
          <div className="col-3 col-md-1 pl-0">
            <img src={user.photoUrl} alt="profile" className="img-fluid" />
          </div>
          <div className="col-9 col-md-11 border">
            <p className="text-muted small mt-1 mb-0 py-1">
              {convertFirestoreDate(createdAt)} by {user.displayName}
            </p>
            <p className="font-weight-bolder py-2 mb-1">{content}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Comment;
