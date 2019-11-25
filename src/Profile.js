import React, { useState } from "react";

const Profile = () => {
  const [displayName, setDisplayName] = useState("");

  const handleChange = event => {
    setDisplayName(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="md-form">
        <input
          type="text"
          name="displayName"
          className="form-control"
          placeholder="Name"
          onChange={handleChange}
          value={displayName}
        />
      </div>
      <button className="btn btn-mdb-color mx-0 px-3 py-2" type="submit">
        Update
      </button>
    </form>
  );
};

export default Profile;
