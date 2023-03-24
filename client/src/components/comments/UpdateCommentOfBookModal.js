import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { CommentContext } from "../../contexts/CommentContext";

const UpdateCommentOfBookModal = () => {
  // comment context
  const {
    commentState: { comment },
    showUpdateCommentOfBookModal,
    setShowUpdateCommentOfBookModal,
    updateComment,
    setShowToast,
    getComments,
    getCommentsByBook,
  } = useContext(CommentContext);

  // state ban đầu là comment ban đầu
  const [updatedComment, setUpdatedComment] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const setComment = async () => {
      // set trạng thái là thông tin của comment đã chọn
      setUpdatedComment(comment);
      setContent(comment.content);
    };
    setComment();
  }, [comment]);

  // use params
  const params = useParams();

  // use location
  const location = useLocation();

  // function on submit
  const onSubmit = async (event) => {
    event.preventDefault();

    const { success, message } = await updateComment({
      ...updatedComment,
      content,
    });

    setShowUpdateCommentOfBookModal(false);

    setShowToast({
      show: true,
      message,
      type: success ? "success" : "danger",
    });

    if (location.pathname === "/admin/comments") {
      getComments();
    } else {
      console.log(params.id);
      getCommentsByBook(params.id);
    }
  };

  // function close dialog
  const closeDialog = () => {
    setUpdatedComment(comment);
    setContent(comment.content);

    setShowUpdateCommentOfBookModal(false);
  };

  return (
    <Modal show={showUpdateCommentOfBookModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Update comment</Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Content:</Form.Label>
            <Form.Control
              type="text"
              name="content"
              placeholder="content"
              required
              aria-describedby="content-help"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
            <Form.Text id="content-help" muted>
              Required
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdateCommentOfBookModal;
