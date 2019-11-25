import React, { useState } from "react";
import { auth, getUserReference } from "./Utils/firebase";

const Profile = () => {
  const [displayName, setDisplayName] = useState("");

  const getUid = () => {
    return auth.currentUser.uid;
  };

  const handleChange = event => {
    setDisplayName(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (displayName) {
      const userRef = await getUserReference(getUid());
      userRef.update({ displayName });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="md-form">
        <input
          type="text"
          name="displayName"
          className="form-control"
          placeholder="Display Name"
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
