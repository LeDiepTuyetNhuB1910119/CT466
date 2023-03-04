import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { BookContext } from "../../contexts/BookContext";
import { AuthContext } from "../../contexts/AuthContext";

import Button from "react-bootstrap/Button";

import viewIcon from "../../assets/view.png";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";

// component con của component SingleBook

const ActionButton = ({ _id }) => {
  // auth context
  const {
    authState: { user },
  } = useContext(AuthContext);

  // book context
  const {
    bookState: { book },
    deleteBook,
    setShowToast,
    findBook,
    setShowUpdateBookModal,
    countView,
  } = useContext(BookContext);

  // use history
  const history = useHistory();

  // function view detail book
  const handleDetailBook = async (bookId) => {
    await countView(bookId);
    const path = `/books/detail/${bookId}`;
    history.push(path);
  };

  // function handler delete book
  const handleDeleteBook = async (bookId) => {
    if (user) {
      const { success, message } = await deleteBook(bookId);
      setShowToast({
        show: true,
        message,
        type: success ? "success" : "danger",
      });
    } else {
      setShowToast({
        show: true,
        message: "Vui lòng đăng nhập để xóa review book",
        type: "danger",
      });
    }
  };

  // function handler update book
  const handleUpdateBook = async (bookId) => {
    if (user) {
      findBook(bookId);
      setShowUpdateBookModal(true);
    } else {
      setShowToast({
        show: true,
        message: "Vui lòng đăng nhập để cập nhật review book",
        type: "danger",
      });
    }
  };

  return (
    <>
      <Button
        className="view-button"
        variant="outline-info"
        onClick={handleDetailBook.bind(this, _id)}
      >
        <img src={viewIcon} alt="play" width="24" height="24" />
      </Button>
      &nbsp;
      <Button
        className="edit-button"
        variant="outline-info"
        onClick={handleUpdateBook.bind(this, _id)}
      >
        <img src={editIcon} alt="edit" width="24" height="24" />
      </Button>
      &nbsp;
      <Button
        className="delete-button"
        variant="outline-info"
        onClick={handleDeleteBook.bind(this, _id)}
      >
        <img src={deleteIcon} alt="delete" width="24" height="24" />
      </Button>
    </>
  );
};

export default ActionButton;
