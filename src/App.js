import React, { useContext } from "react";
import CurrentUser from "./CurrentUser";
import Profile from "./Profile";
import Posts from "./Posts";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import PostPage from "./PostPage";
import Navbar from "./Navbar";

import { Switch, Route, withRouter } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";
import { useTransition, animated } from "react-spring";

import "./Styles/App.css";

const App = ({ location }) => {
  // Hook in to AuthContext to get information weither there is an authenticated user
  const { user } = useContext(AuthContext);

  // Animations on router view changes
  const transitions = useTransition(location, location => location.pathname, {
    from: { opacity: 0, transform: "translate(10%, 0)", display: "none" },
    enter: { opacity: 1, transform: "translate(0%, 0)", display: "block" },
    leave: { opacity: 0, transform: "translate(-50%, 0)", display: "none" }
  });

  return (
    <div className="customcontainer p-4 p-lg-5">
      <Navbar currentUser={user} />
      {user && <CurrentUser {...user} />}
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <Switch location={item}>
            {/* Posts component will hook in to PostContext and AuthContext and show function for adding post if user is authenticated */}
            <Route exact path="/" component={Posts} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/posts/:id" component={PostPage} />
          </Switch>
        </animated.div>
      ))}
    </div>
  );
};

export default withRouter(App);
