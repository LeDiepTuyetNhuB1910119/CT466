import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { CommentContext } from "../../contexts/CommentContext";
import { BookContext } from "../../contexts/BookContext";

const AddCommentModal = () => {
  // comment context
  const {
    showAddCommentModal,
    setShowAddCommentModal,
    createComment,
    setShowToast,
    getComments,
    getCommentsByBook,
  } = useContext(CommentContext);

  // book context
  const {
    bookState: { books },
    getBooks,
  } = useContext(BookContext);

  // use effect select book
  useEffect(() => {
    const gettingBooks = async () => {
      getBooks();
    };
    gettingBooks();
  }, []);

  const params = useParams();

  // state

  const [newComment, setNewComment] = useState({
    book: "",
    content: "",
  });

  const { book, content } = newComment;

  // function on change new comment
  const onChangeNewCommentForm = (event) => {
    if (params.id) {
      setNewComment({
        ...newComment,
        book: params.id,
        [event.target.name]: event.target.value,
      });
    } else
      setNewComment({ ...newComment, [event.target.name]: event.target.value });
  };

  // function on submit
  const onSubmit = async (event) => {
    event.preventDefault();
    if (!book) {
      resetAddCommentData();
      setShowToast({
        show: true,
        message: "Thiếu trường dữ liệu",
        type: "danger",
      });
    } else {
      const { success, message } = await createComment(newComment);

      resetAddCommentData();

      setShowToast({
        show: true,
        message,
        type: success ? "success" : "danger",
      });

      if (params.id) {
        getCommentsByBook(params.id);
      } else getComments();
    }
  };

  // function reset form và tắt modal
  const resetAddCommentData = () => {
    setNewComment({
      book: "",
      content: "",
    });

    setShowAddCommentModal(false);
  };

  // function close dialog
  const closeDialog = () => {
    resetAddCommentData();
  };

  return (
    <Modal show={showAddCommentModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Add Comment</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          {!params.id && (
            <Form.Group className="mb-3">
              <Form.Label>Book:</Form.Label>
              <Form.Select
                name="book"
                value={book}
                onChange={onChangeNewCommentForm}
              >
                <option>Please select a book</option>
                {books.map((book) => (
                  <option key={book._id} value={book._id}>
                    {book.title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Content:</Form.Label>
            <Form.Control
              type="text"
              name="content"
              placeholder="content"
              required
              aria-describedby="content-help"
              value={content}
              onChange={onChangeNewCommentForm}
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
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddCommentModal;
