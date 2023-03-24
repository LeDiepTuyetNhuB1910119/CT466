import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import { CommentContext } from "../../contexts/CommentContext";
import { AuthContext } from "../../contexts/AuthContext";

import UpdateCommentOfBookModal from "./UpdateCommentOfBookModal";

import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";

const CommentsOfBook = () => {
  // auth context
  const {
    authState: { user },
  } = useContext(AuthContext);

  // comment context
  const {
    commentState: { comment, comments, commentsLoading },
    getComments,
    getCommentsByBook,
    deleteComment,
    showToast: { show, message, type },
    setShowToast,
    createComment,
    findComment,
    updateShowComment,
    setShowUpdateCommentOfBookModal,
  } = useContext(CommentContext);

  // use params
  const params = useParams();

  // use location
  const location = useLocation();

  // use effect
  useEffect(() => {
    if (params.id) {
      const gettingCommentByBook = async () => {
        await getCommentsByBook(params.id);
      };
      gettingCommentByBook();
    }
  }, [params.id]);

  // comment state
  const [newComment, setNewComment] = useState({
    book: params.id,
    content: "",
  });

  const { content } = newComment;

  // function on change new comment
  const onChangeNewComment = (event) => {
    setNewComment({ ...newComment, [event.target.name]: event.target.value });
  };

  // function reset comment
  const resetCommentData = () => {
    setNewComment({ book: params.id, content: "" });
  };

  // function on submit create new comment
  const onSubmit = async (event) => {
    event.preventDefault();
    if (user) {
      const { success, message } = await createComment(newComment);
      resetCommentData();
      setShowToast({
        show: true,
        message,
        type: success ? "success" : "danger",
      });
      getCommentsByBook(params.id);
    } else {
      setShowToast({
        show: true,
        message: "Vui lòng đăng nhập để thêm bình luận",
        type: "danger",
      });
    }
  };

  // function handle delete comment
  const handleDeleteComment = async (commentId) => {
    if (user) {
      const { success, message } = await deleteComment(commentId);
      setShowToast({
        show: true,
        message,
        type: success ? "success" : "danger",
      });
    } else {
      setShowToast({
        show: true,
        message: "Vui lòng đăng nhập để xóa bình luận",
        type: "danger",
      });
    }
  };

  // function handle update comment
  const handleUpdateComment = async (commentId) => {
    findComment(commentId);
    setShowUpdateCommentOfBookModal(true);
  };

  // function handle hide comment
  const handleHideComment = async (commentId) => {
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

  let body = null;

  if (commentsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (comments.length === 0) {
    body = <div>Không có bình luận nào</div>;
  } else {
    body = (
      <>
        {comments.map(
          (comment) =>
            comment.show && (
              <Row className="row-cols-3 mt-4" key={comment._id}>
                <Col className="col-2 col-lg-1">
                  <div>{comment.user ? comment.user.username : "unknow"}:</div>
                </Col>
                <Col className="col-9 col-lg-10">{comment.content}</Col>
                <Col className="col-1" align="end">
                  {user?._id === comment.user?._id ||
                  user?._id === comment.book.user ||
                  user?.isAdmin ? (
                    <DropdownButton
                      variant="outline-primary"
                      align="end"
                      title=""
                    >
                      {user?._id === comment.book.user || user?.isAdmin ? (
                        <Dropdown.Item
                          key="hide-cmt"
                          onClick={handleHideComment.bind(this, comment._id)}
                        >
                          Hide
                        </Dropdown.Item>
                      ) : null}

                      {user?._id === comment.user?._id && (
                        <Dropdown.Item
                          key="edit-cmt"
                          onClick={handleUpdateComment.bind(this, comment._id)}
                        >
                          Edit
                        </Dropdown.Item>
                      )}

                      <Dropdown.Item
                        key="delete-cmt"
                        onClick={handleDeleteComment.bind(this, comment._id)}
                      >
                        Delete
                      </Dropdown.Item>
                    </DropdownButton>
                  ) : null}
                </Col>
              </Row>
            )
        )}
      </>
    );
  }

  return (
    <Container className="justify-content mb-4">
      <h3 className="mt-6 my-4">
        {comments.length !== 0 ? comments.length + " " : null}Comments
      </h3>
      <Row>
        <div className="form-group">
          <textarea
            className="form-control"
            placeholder="Enter your comment"
            rows="3"
            name="content"
            value={content}
            onChange={onChangeNewComment}
          ></textarea>
        </div>
        <div className="mt-2 mb-2 d-grid d-md-flex justify-content-end">
          <Button variant="secondary" onClick={resetCommentData}>
            Cancel
          </Button>
          &nbsp;
          <Button variant="primary" type="submit" onClick={onSubmit}>
            Submit
          </Button>
        </div>
      </Row>

      <div>{body}</div>

      {/* update comment */}
      {comment !== null && <UpdateCommentOfBookModal />}

      {/* Show toast */}
      <Toast
        show={show}
        style={{ position: "fixed", top: "10%", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={() =>
          setShowToast({
            show: false,
            message: "",
            type: null,
          })
        }
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </Container>
  );
};

export default CommentsOfBook;
