import React, { useContext } from "react";
import { useLocation, useParams } from "react-router-dom";

import Button from "react-bootstrap/Button";

import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import { CommentContext } from "../../contexts/CommentContext";
import { AuthContext } from "../../contexts/AuthContext";

const ActionCommentAdmin = ({ _id, userComment, show }) => {
  // comment context
  const {
    getComments,
    getCommentsByBook,
    findComment,
    setShowUpdateCommentOfBookModal,
    updateShowComment,
    deleteComment,
    setShowToast,
  } = useContext(CommentContext);

  // auth context
  const {
    authState: { user },
  } = useContext(AuthContext);

  // use location
  const location = useLocation();

  // use params
  const params = useParams();

  // function handler update state comment
  const handlerUpdateStateComment = async (commentId) => {
    const { success, message } = await updateShowComment(commentId);
    setShowToast({
      show: true,
      message,
      type: success ? "success" : "danger",
    });
    if (location.pathname === "/admin/comments") {
      getComments();
    } else {
      getCommentsByBook(params.id);
    }
  };

  // function handle update comment
  const handleUpdateComment = async (commentId) => {
    findComment(commentId);
    setShowUpdateCommentOfBookModal(true);
  };

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
        className="show-button"
        style={{ width: "75px" }}
        variant="outline-primary"
        onClick={handlerUpdateStateComment.bind(this, _id)}
      >
        {show ? "Show" : "Hide"}
      </Button>
      &nbsp;
      {user._id === userComment?._id && (
        <>
          <Button
            className="edit-button"
            variant="outline-primary"
            onClick={handleUpdateComment.bind(this, _id)}
          >
            <img src={editIcon} alt="edit" width="24" height="24" />
          </Button>
          &nbsp;
        </>
      )}
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
