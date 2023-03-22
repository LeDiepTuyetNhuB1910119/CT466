import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Container from "react-bootstrap/Container";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Toast from "react-bootstrap/Toast";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import background from "../assets/lemon-bg.png";
import addIcon from "../assets/plus-circle-fill.svg";

import { AuthContext } from "../contexts/AuthContext";
import { BookContext } from "../contexts/BookContext";

import AddBookModal from "../components/books/AddBookModal";
import UpdateBookModal from "../components/books/UpdateBookModal";

const MyPage = () => {
  // auth context
  const {
    authState: { user },
  } = useContext(AuthContext);

  // book context
  const {
    bookState: { book, books, booksLoading },
    getBooksByUser,
    deleteBook,
    showToast: { show, message, type },
    setShowToast,
    setShowAddBookModal,
    findBook,
    setShowUpdateBookModal,
    countView,
  } = useContext(BookContext);

  // effect get all books
  useEffect(() => {
    const gettingBooks = async () => {
      await getBooksByUser(user._id);
    };
    gettingBooks();
  }, [user._id]);

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

  let body = null;

  if (booksLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (books.length === 0) {
    body = <h1>Rỗng</h1>;
  } else {
    body = (
      <>
        <div className="col align-self-center">
          {books.map((book) => (
            <Row
              key={book._id}
              className="col-auto mt-4 mb-4 text-center"
              style={{ justifyContent: "center" }}
            >
              <Card style={{ width: "60%" }}>
                <div align="end">
                  <DropdownButton
                    variant="outline-primary"
                    align="end"
                    title=""
                    className="mt-2"
                  >
                    <Dropdown.Item
                      key="edit-cmt"
                      onClick={handleUpdateBook.bind(this, book._id)}
                    >
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item
                      key="delete-cmt"
                      onClick={handleDeleteBook.bind(this, book._id)}
                    >
                      Delete
                    </Dropdown.Item>
                  </DropdownButton>
                </div>

                <Card.Body>
                  <Card.Title className="text-primary">{book.title}</Card.Title>

                  <Card.Img
                    variant="top"
                    src={book.image.url}
                    alt={book.title}
                    style={{ width: "60%" }}
                    className="mt-2 mb-2"
                  />
                  <Card.Text>Thể loại: {book.category.categoryName}</Card.Text>
                  <Card.Link
                    style={{ cursor: "pointer" }}
                    onClick={handleDetailBook.bind(this, book._id)}
                  >
                    Continue reading ⟶
                  </Card.Link>
                </Card.Body>
              </Card>
            </Row>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <img src={background} alt="bg" width="100%" height="250px"></img>
        <h3 className="text-center mt-3">{user.username.toUpperCase()} PAGE</h3>
        <hr></hr>
      </div>

      <Container>
        <h4 className="text-center">List reviews of me</h4>
        <div>{body}</div>

        {/* Open Add Post Modal */}
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add a new review book</Tooltip>}
        >
          <Button
            className="btn-floating"
            onClick={setShowAddBookModal.bind(this, true)}
          >
            <img src={addIcon} alt="add-post" width="60" height="60" />
          </Button>
        </OverlayTrigger>

        {/* Add review */}
        <AddBookModal />

        {/* Update review book */}
        {book !== null && <UpdateBookModal />}

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
    </>
  );
};

export default MyPage;
