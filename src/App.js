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

const App = ({ location }) => {
  const { user } = useContext(AuthContext);

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
