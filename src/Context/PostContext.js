import React, { useState, useEffect, createContext } from "react";
import { db } from "../Utils/firebase";
import { collectIdsAndDocs } from "../Utils/utilities";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribeFromFirestore = db
      .collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot(snapshot => {
        const posts = snapshot.docs.map(collectIdsAndDocs);
        setPosts(posts);
      });

    return () => {
      unsubscribeFromFirestore();
    };
  }, []);

  return <PostContext.Provider value={{ posts }}>{children}</PostContext.Provider>;
};
