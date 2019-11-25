import React, { useContext } from "react";
import CurrentUser from "./CurrentUser";
import SignIn from "./SignInOLD";
import { AuthContext } from "./Context/AuthContext";

const Authentication = () => {
  const { user } = useContext(AuthContext);

  return <>{user ? <CurrentUser {...user} /> : <SignIn />}</>;
};

export default Authentication;
