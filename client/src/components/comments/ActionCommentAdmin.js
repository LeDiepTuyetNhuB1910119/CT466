import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";

import deleteIcon from "../../assets/trash.svg";
import { CommentContext } from "../../contexts/CommentContext";

const ActionCommentAdmin = ({ _id }) => {
  // comment context
  const { deleteComment, setShowToast } = useContext(CommentContext);

  // function delete comment
  const handleDeleteComment = async (commentId) => {
    const { success, message } = await deleteComment(commentId);
    setShowToast({
      show: true,
      message,
      type: success ? "success" : "danger",
    });
  };

  return (
    <>
      <Button
        className="delete-button"
        variant="outline-primary"
        onClick={handleDeleteComment.bind(this, _id)}
      >
        <img src={deleteIcon} alt="delete" width="24" height="24" />
      </Button>
    </>
  );
};

export default ActionCommentAdmin;
