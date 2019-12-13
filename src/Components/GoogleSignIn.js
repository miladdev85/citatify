import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { auth, provider } from "../Utils/firebase";
import google from "../Assets/google.png";

import "../Styles/Google.css";

const GoogleSignIn = ({ history }) => {
  const [error, setError] = useState("");

  const handleGoogleSignIn = async () => {
    try {
      await auth.signInWithPopup(provider);
      setError("");
      history.push("/");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <p>or sign in with:</p>
      <img src={google} className="googlesignin" alt="google" onClick={handleGoogleSignIn} />
      {error && (
        <p className="mt-3 mb-0 text-center text-danger">{error.message} Please try again.</p>
      )}
    </>
  );
};

export default withRouter(GoogleSignIn);
