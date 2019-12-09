import React, { useState, useEffect, useContext } from "react";
import Post from "./Post";
import Comments from "./Comments";
import { withRouter } from "react-router-dom";
import { db } from "./Utils/firebase";
import { collectIdsAndDocs } from "./Utils/utilities";
import { AuthContext } from "./Context/AuthContext";

const PostPage = ({ match }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  const { user } = useContext(AuthContext);

  // We will use the id value coming from React Router to reference the specific post in the posts collection.
  const postId = match.params.id;

  // Subscribe to any changes using the onSnapshot method on posts and comments. Dependency is set on the postId - each time we mount this component with different postId it will
  // re-run this effect. Similar to componentDidMount class lifecycle
  useEffect(() => {
    const unsubscribeFromFirestore = db.doc(`posts/${postId}`).onSnapshot(snapshot => {
      const post = collectIdsAndDocs(snapshot);
      setPost(post);
    });

    const unsubscribeFromComments = db
      .doc(`posts/${postId}`)
      .collection("comments")
      .orderBy("createdAt", "desc")
      .onSnapshot(snapshot => {
        const comments = snapshot.docs.map(collectIdsAndDocs);
        setComments(comments);
      });

    // Clean up and remove the listeners.
    return () => {
      unsubscribeFromFirestore();
      unsubscribeFromComments();
    };
  }, [postId]);

  // Create the comment and invoke increaseCommentCount function.
  const createComment = async comment => {
    try {
      db.doc(`posts/${postId}`)
        .collection("comments")
        .add({
          content: comment,
          createdAt: new Date(),
          user
        });

      increaseCommentCount();
    } catch (error) {
      console.error(error);
    }
  };

  // Increase the comment count. Will be invoked after the comment is created from createComment function.
  const increaseCommentCount = () => {
    db.doc(`posts/${postId}`).update({
      comments: post.comments + 1
    });
  };

  return (
    <section>
      {post && <Post postPage={true} {...post} />}
      <Comments comments={comments} user={user} onCreate={createComment} />
    </section>
  );
};

export default withRouter(PostPage);
