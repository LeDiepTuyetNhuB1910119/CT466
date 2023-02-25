import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { BookContext } from "../../contexts/BookContext";

const DetailBook = () => {
  // book context
  const {
    bookState: { book },
    getOneBook,
  } = useContext(BookContext);

  // use params
  const params = useParams();

  // effect load detail book by id
  useEffect(() => {
    if (params.id) {
      const getBook = async () => {
        await getOneBook(params.id);
      };
      getBook();
    }
  }, [params.id]);

  if (book === null)
    return (
      <Container>
        <h1 className="text-center mt-4 my-4">Info book</h1>
        <h3 className="text-center">Không tìm thấy thông tin</h3>
      </Container>
    );
  return (
    <>
      <Container className="justify-content mb-4">
        <h1 className="text-center mt-4 my-4">Info book</h1>
        <Card className="border-primary" style={{ fontSize: 18 }}>
          <Row className="row-cols-1 row-cols-md-1">
            <Col className="col-md-4 mt-3 mb-3">
              <Card.Img
                variant="top"
                src={book.image.url}
                alt={book.title}
                style={{ width: "100%" }}
              />
            </Col>
            <Col className="col-md-7">
              <Card.Body>
                <Row>
                  <Col className="col-4 col-md-6 col-lg-4 col-xl-3">
                    <h2 className="text-success">Title:</h2>
                  </Col>

                  <Col>
                    <h2 className="text-success">{book.title}</h2>
                  </Col>
                </Row>
                <Row>
                  <Col className="col-4 col-md-6 col-lg-4 col-xl-3">
                    Poster:
                  </Col>
                  <Col>{book.user ? book.user.username : "unknow"}</Col>
                </Row>

                <Row>
                  <Col className="col-4 col-md-6 col-lg-4 col-xl-3">
                    Category:
                  </Col>
                  <Col>{book.category.categoryName}</Col>
                </Row>

                <Row>
                  <Col className="col-4 col-md-6 col-lg-4 col-xl-3">View:</Col>
                  <Col>{book.view}</Col>
                </Row>

                <Row>
                  <Col className="col-4 col-md-6 col-lg-4 col-xl-3">
                    Description:
                  </Col>
                  <Col style={{ textAlign: "justify" }}>{book.description}</Col>
                </Row>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
};

export default DetailBook;
