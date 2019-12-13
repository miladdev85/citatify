import React from "react";
import { Link, NavLink } from "react-router-dom";
import { signOut } from "../Utils/firebase";

import "../Styles/Navbar.css";

// signOut functionality from firebase auth.

const Navbar = ({ currentUser }) => {
  return (
    <div>
      <nav className="d-flex justify-content-between align-items-end border-bottom">
        <Link to="/" className="text-dark">
          <h1 className="logotitle">Citatify</h1>
        </Link>
        <div>
          {currentUser ? (
            <button className="btn btn-link p-0 m-0 orange-text" onClick={signOut}>
              <span className="btn_text">Sign Out</span>
            </button>
          ) : (
            <NavLink
              activeClassName="text-muted link-active"
              className="btn btn-link p-0 ml-3 m-0"
              exact
              to="/signin"
            >
              <span className="btn_text">Sign In</span>
            </NavLink>
          )}

          <NavLink
            activeClassName="text-muted link-active"
            className="btn btn-link p-0 ml-3 m-0"
            exact
            to="/"
          >
            <span className="btn_text">Home</span>
          </NavLink>
        </div>
      </nav>
      {!currentUser && (
        <div className="mt-2 pt-2">
          <p>
            In order to fully utilize this amazing website please{" "}
            <Link to="/signin">
              <span className="signin">sign in</span>
            </Link>{" "}
            or{" "}
            <Link to="/signup">
              <span className="signin">create</span>
            </Link>{" "}
            an account.
          </p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
