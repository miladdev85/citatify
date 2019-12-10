import React from "react";
import Comment from "./Comment";
import AddComment from "./AddComment";

const Comments = ({ comments, onCreate, onEdit, user }) => {
  return (
    <>
      {user && <AddComment onCreate={onCreate} />}
      {comments.map(comment => (
        <Comment {...comment} key={comment.id} currentUser={user} onEdit={onEdit} />
      ))}
    </>
  );
};
export default Comments;
