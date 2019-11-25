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
  const postId = match.params.id;

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

    return () => {
      unsubscribeFromFirestore();
      unsubscribeFromComments();
    };
  }, [postId]);

  const increaseCommentCount = () => {
    db.doc(`posts/${postId}`).update({
      comments: post.comments + 1
    });
  };

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

  return (
    <section>
      {post && <Post postPage={true} {...post} />}
      <Comments comments={comments} user={user} onCreate={createComment} />
    </section>
  );
};

export default withRouter(PostPage);
