import React, { useContext } from "react";
import Post from "./Post";
import AddPost from "./AddPost";
import { PostContext } from "./Context/PostContext";
import { AuthContext } from "./Context/AuthContext";

// Utilizing Post context where we subscribe to new posts and render Post component
// Utilizing Auth context to check if user is authenticated

const Posts = () => {
  const { posts } = useContext(PostContext);
  const { user } = useContext(AuthContext);

  return (
    <>
      {user && <AddPost />}
      {posts.map(post => (
        <Post {...post} key={post.id} currentUser={user} />
      ))}
    </>
  );
};

export default Posts;
