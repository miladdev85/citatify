import React, { useState, useEffect, createContext } from "react";
import { auth, createUserProfileDocument } from "../Utils/firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Subscribing to authentication status from Firebase.
  // createUserProfileDocument will create the user document if it does not exist
  // createUserProfileDocument will return a reference to the user
  // We alse have onSnapshot for listening to any changes that a user might do - for example changing profile picture or display name

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async firebaseUser => {
      if (firebaseUser) {
        const userRef = await createUserProfileDocument(firebaseUser);
        userRef.onSnapshot(snapshot => {
          setUser({ uid: snapshot.id, ...snapshot.data() });
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};
