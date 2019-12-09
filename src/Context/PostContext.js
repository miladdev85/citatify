import React, { useState, useEffect, createContext } from "react";
import { db } from "../Utils/firebase";
import { collectIdsAndDocs } from "../Utils/utilities";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  // subscribe to posts collection. If new posts are added, we set an id with collectIdsAndDocs function and return the data.
  // We set the id so we can use that id in our rendering
  // Posts are added to state

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
