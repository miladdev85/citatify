import React, { useState, useEffect, createContext } from "react";
import { db } from "../Utils/firebase";
import { collectIdsAndDocs } from "../Utils/utilities";

export const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    console.log("here");
    const unsubscribeFromComments = db
      .doc(`posts/${postId}`)
      .collection("comments")
      .onSnapshot(snapshot => {
        const comments = snapshot.docs.map(collectIdsAndDocs);
        setComments(comments);
      });

    return () => {
      unsubscribeFromComments();
    };
  }, []);

  return <CommentContext.Provider value={{ comments }}>{children}</CommentContext.Provider>;
};
