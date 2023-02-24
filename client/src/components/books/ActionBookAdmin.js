import React, { useContext } from "react";
import Button from "react-bootstrap/Button";

import viewIcon from "../../assets/view.png";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";

import { BookContext } from "../../contexts/BookContext";

const ActionBookAdmin = ({ _id }) => {
  // book context
  const { findBook, setShowUpdateBookModal } = useContext(BookContext);

  // function view detail book
  const infoBook = (bookId) => {
    console.log("info book");
  };

  // function handler delete book
  const handleDeleteBook = async (bookId) => {
    console.log("delete book");
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
        <img src={viewIcon} alt="play" width="18" height="18" />
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
