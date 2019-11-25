import React, { useContext } from "react";
import Post from "./Post";
import AddPost from "./AddPost";
import { PostContext } from "./Context/PostContext";
import { AuthContext } from "./Context/AuthContext";

const Posts = () => {
  const { posts } = useContext(PostContext);
  const { user } = useContext(AuthContext);

  return (
    <>
      {user && <AddPost user={user} />}
      {posts.map(post => (
        <Post {...post} key={post.id} />
      ))}
    </>
  );
};

export default Posts;
