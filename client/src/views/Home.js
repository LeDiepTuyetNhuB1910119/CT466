import React, { useContext, useEffect, useState } from "react";
import { BookContext } from "../contexts/BookContext";

import SingleBook from "../components/books/SingleBook";

import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";

import { AuthContext } from "../contexts/AuthContext";

const Home = () => {
  // book context
  const {
    bookState: { book, books, booksLoading },
    getBooks,
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
      </Container>
    </>
  );
};

export default Home;
