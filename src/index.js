import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { PostProvider } from "./Context/PostContext";
import { AuthProvider } from "./Context/AuthContext";
import "./index.css";

ReactDOM.render(
  <Router>
    <AuthProvider>
      <PostProvider>
        <App />
      </PostProvider>
    </AuthProvider>
  </Router>,
  document.getElementById("root")
);
