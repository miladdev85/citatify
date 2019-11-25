import React, { useState, useEffect, createContext } from "react";
import { auth, createUserProfileDocument } from "../Utils/firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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
