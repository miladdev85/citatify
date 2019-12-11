import React, { useState } from "react";
import { convertFirestoreDate, belongsToCurrentUser } from "./Utils/utilities";
import noProfileImage from "./Assets/noprofile.jpg";
import Button from "./Components/Button";
import EditComment from "./EditComment";

const Comment = ({ content, id, currentUser, user, createdAt, onEdit, onRemove }) => {
  const [editMode, setEditMode] = useState(false);
  const [input, setInput] = useState(content);
  const [loading, setLoading] = useState(false);

  const handleInputChange = event => setInput(event.target.value);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      await onEdit(id, input);
      setLoading(false);
      setEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = () => onRemove(id);

  const toggleEditMode = () => {
    setEditMode(prevMode => !prevMode);
  };

  return (
    <article className="container mt-5">
      <div className="rounded-0">
        <div className="row mx-md-3">
          <div className="col-3 col-md-1 pl-0">
            <img
              src={user.photoURL ? user.photoURL : noProfileImage}
              alt="profile"
              className="img-fluid"
            />
          </div>
          <div className="col-9 col-md-11 border">
            <p className="text-muted small mt-1 mb-0 py-1">
              {convertFirestoreDate(createdAt)} by {user.displayName}
            </p>
            {editMode ? (
              <EditComment
                loading={loading}
                value={input}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
                onCancel={toggleEditMode}
              />
            ) : (
              <p className="font-weight-bolder py-2 mb-1">{content}</p>
            )}
            {belongsToCurrentUser(currentUser, user) && !editMode && (
              <div>
                <Button className="btn-sm btn-link p-0 py-2 ml-0" onClick={toggleEditMode}>
                  Edit
                </Button>
                <Button
                  className="btn-sm btn-link p-0 py-2 ml-1 text-danger"
                  onClick={handleRemove}
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Comment;
