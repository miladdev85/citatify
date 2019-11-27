import React from "react";
import { Link } from "react-router-dom";
import { convertFirestoreDate } from "./Utils/utilities";
import noProfileImage from "./Assets/noprofile.jpg";

const CurrentUser = ({ displayName, photoURL, email, createdAt }) => {
  return (
    <section className="mt-4 mb-5">
      <div className="row">
        <div className="col-3 col-md-2">
          <img src={photoURL ? photoURL : noProfileImage} alt={displayName} className="img-fluid" />
        </div>
        <div className="col-9 col-md-10 d-flex flex-column pl-0">
          <h5 className="mb-0">{displayName}</h5>
          <div className="d-none d-md-block">
            <p className="mb-0" style={{ fontSize: "14px" }}>
              E-mail: {email}
            </p>
            <p className="mb-0" style={{ fontSize: "14px" }}>
              Joined: {convertFirestoreDate(createdAt)}
            </p>
          </div>
          <Link
            to="/profile"
            className="btn text-info btn-link align-self-start p-0 m-0 mt-auto"
            style={{ lineHeight: 0.8 }}
          >
            Edit profile
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CurrentUser;
