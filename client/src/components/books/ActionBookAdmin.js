import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Button from "react-bootstrap/Button";

import viewIcon from "../../assets/view.png";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import commentsIcon from "../../assets/comment-icon.svg";

import { BookContext } from "../../contexts/BookContext";

const ActionBookAdmin = ({ _id }) => {
  // book context
  const { findBook, setShowUpdateBookModal, deleteBook, setShowToast } =
    useContext(BookContext);

  // use history
  const history = useHistory();

  // function view detail book
  const infoBook = (bookId) => {
    const path = `/admin/books/info/${bookId}`;
    history.push(path);
  };

  // function view list comments of book
  const handleListComment = async (bookId) => {
    const path = `/admin/comments-of-book/${bookId}`;
    history.push(path);
  };

  // function handler delete book
  const handleDeleteBook = async (bookId) => {
    const { success, message } = await deleteBook(bookId);
    setShowToast({
      show: true,
      message,
      type: success ? "success" : "danger",
    });
  };

  // function handler update book
  const handleUpdateBook = async (bookId) => {
    findBook(bookId);
    setShowUpdateBookModal(true);
  };

  // return
  return (
    <>
      <Button
        className="view-button"
        variant="outline-primary"
        onClick={infoBook.bind(this, _id)}
      >
        <img src={viewIcon} alt="play" width="24" height="24" />
      </Button>
      &nbsp;
      <Button
        className="delete-button"
        variant="outline-primary"
        onClick={handleListComment.bind(this, _id)}
      >
        <img src={commentsIcon} alt="comments" width="24" height="24" />
      </Button>
      &nbsp;
      <Button
        className="edit-button"
        variant="outline-primary"
        onClick={handleUpdateBook.bind(this, _id)}
      >
        <img src={editIcon} alt="edit" width="24" height="24" />
      </Button>
      &nbsp;
      <Button
        className="delete-button"
        variant="outline-primary"
        onClick={handleDeleteBook.bind(this, _id)}
      >
        <img src={deleteIcon} alt="delete" width="24" height="24" />
      </Button>
    </>
  );
};

export default ActionBookAdmin;
