import React, { useContext } from "react";
import CurrentUser from "./CurrentUser";
import Profile from "./Profile";
import Posts from "./Posts";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import PostPage from "./PostPage";
import Navbar from "./Navbar";

import { Switch, Route } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

import "../Styles/App.css";

const App = () => {
  // Hook in to AuthContext to get information weither there is an authenticated user
  const { user } = useContext(AuthContext);

  return (
    <div className="customcontainer p-4 p-lg-5">
      <Navbar currentUser={user} />
      {user && <CurrentUser {...user} />}
      <Switch>
        <Route exact path="/" component={Posts} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/posts/:id" component={PostPage} />
      </Switch>
    </div>
  );
};

export default App;
