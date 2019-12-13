import React, { useState, useEffect, useContext, useCallback } from "react";
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

  // useCallback to ensure that the function does not change on every render unless postId changes. We do this because we use it as a dependency in the useEffect.
  // docRef is reference to the document. We use this everywhere we want to get the document reference.
  const docRef = useCallback(() => {
    return db.doc(`posts/${postId}`);
  }, [postId]);

  // Subscribe to any changes using the onSnapshot method on posts and comments. Dependency is set on the postId - each time we mount this component with different postId it will
  // re-run this effect. Similar to componentDidMount lifecycle in class components
  useEffect(() => {
    const unsubscribeFromFirestore = docRef().onSnapshot(snapshot => {
      const post = collectIdsAndDocs(snapshot);
      setPost(post);
    });

    const unsubscribeFromComments = docRef()
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
  }, [docRef]);

  // Create the comment and invoke increaseCommentCount function. Getting the user from AuthContext.
  const createComment = async comment => {
    await docRef()
      .collection("comments")
      .add({
        content: comment,
        createdAt: new Date(),
        user
      });
    increaseCommentCount();
  };

  // Increase the comment count. Will be invoked after the comment is created from createComment function.
  const increaseCommentCount = () => {
    docRef().update({
      comments: post.comments + 1
    });
  };
  // Decrease the comment count. Will be invoked after the comment is removed from removeComment function.
  const decreaseCommentCount = () => {
    docRef().update({
      comments: post.comments - 1
    });
  };

  // Using postId to reference the post. Then we get the specific comment by taking in the id as parameter to the function.
  // Update comment content with new content that is the second parameter to this function.

  const editComment = (id, content) => {
    return docRef()
      .collection("comments")
      .doc(id)
      .update({
        content
      });
  };

  const removeComment = async id => {
    await docRef()
      .collection("comments")
      .doc(id)
      .delete();
    decreaseCommentCount();
  };

  return (
    <section>
      {post && <Post postPage={true} {...post} currentUser={user} />}
      <Comments
        postId={postId}
        onIncrease={increaseCommentCount}
        comments={comments}
        user={user}
        onCreate={createComment}
        onRemove={removeComment}
        onEdit={editComment}
      />
    </section>
  );
};

export default withRouter(PostPage);
