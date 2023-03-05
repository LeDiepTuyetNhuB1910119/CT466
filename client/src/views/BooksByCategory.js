import React from "react";
import { BookContext } from "../contexts/BookContext";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import SingleBook from "../components/books/SingleBook";

import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const BooksByCategory = () => {
  // context
  const {
    bookState: { books, booksLoading },
    getBooksByCategory,
  } = useContext(BookContext);

  // use params
  const params = useParams();

  // effect
  // effect get all books
  useEffect(() => {
    if (params.id) {
      const gettingBooksByCategory = async () => {
        getBooksByCategory(params.id);
      };
      gettingBooksByCategory();
    }
  }, [params.id]);

  let body = null;

  if (booksLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (books.length === 0) {
    body = (
      <Container>
        <h3 className="text-center mt-5">Không tìm thấy thông tin</h3>
      </Container>
    );
  } else {
    body = (
      <>
        <Container>
          <Row className="row-cols-2 row-cols-md-4 g-4 mx-auto mt-3">
            {books.map((book) => (
              <Col key={book._id} className="my-2">
                <SingleBook book={book} />
              </Col>
            ))}
          </Row>
        </Container>
      </>
    );
  }

  // return
  return <>{body}</>;
};

export default BooksByCategory;
