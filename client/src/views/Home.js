import React, { useContext, useEffect, useState } from "react";

import { BookContext } from "../contexts/BookContext";
import { AuthContext } from "../contexts/AuthContext";

import SingleBook from "../components/books/SingleBook";
import AddBookModal from "../components/books/AddBookModal";

import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/esm/Toast";

import addIcon from "../assets/plus-circle-fill.svg";

const Home = () => {
  // book context
  const {
    bookState: { book, books, booksLoading },
    getBooks,
    showToast: { show, message, type },
    setShowToast,
    setShowAddBookModal,
  } = useContext(BookContext);

  // auth context
  const {
    authState: { user },
  } = useContext(AuthContext);

  // effect
  // effect get all books
  useEffect(() => {
    const gettingBooks = async () => {
      getBooks();
    };
    gettingBooks();
  }, []);

  // useState
  const [filteredBooks, setFilteredBooks] = useState("");

  // effect set filteredBook
  useEffect(() => {
    const setFilter = async () => {
      setFilteredBooks(books);
    };
    setFilter();
  }, [books]);

  // function handle search book
  const handleSearch = (event) => {
    const query = event.target.value;
    const searchBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.category.categoryName
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        book.user.username.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBooks(searchBooks);
  };

  // function handle add review book
  const handleAddBook = async (check) => {
    if (user) {
      setShowAddBookModal(check);
    } else {
      setShowToast({
        show: true,
        message: "Vui lòng đăng nhập để tạo review book",
        type: "danger",
      });
    }
  };

  let body = null;

  if (booksLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (filteredBooks.length === 0) {
    body = <h3 className="text-center mt-5">Không tìm thấy thông tin</h3>;
  } else {
    body = (
      <>
        <Row className="row-cols-2 row-cols-md-4 g-4 mx-auto mt-3">
          {filteredBooks.map((book) => (
            <Col key={book._id} className="my-2">
              <SingleBook book={book} />
            </Col>
          ))}
        </Row>
      </>
    );
  }

  // return
  return (
    <>
      <Container>
        <Form className="row mt-4">
          <Form.Label className="col-auto">Search book:</Form.Label>
          <Form.Control
            type="search"
            className="col"
            placeholder="Search"
            aria-label="Search"
            onChange={handleSearch}
          />
        </Form>

        {body}

        {/* Open Add Post Modal */}
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add a new review book</Tooltip>}
        >
          <Button
            className="btn-floating"
            onClick={handleAddBook.bind(this, true)}
          >
            <img src={addIcon} alt="add-post" width="60" height="60" />
          </Button>
        </OverlayTrigger>

        {/* Add review */}
        <AddBookModal />

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

export default Home;
