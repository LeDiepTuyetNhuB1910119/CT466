import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { BookContext } from "../../contexts/BookContext";

import InfoBook from "../books/InfoBook";
import CommentsOfBook from "../comments/CommentsOfBook";

import Container from "react-bootstrap/Container";

const DetailReviewBook = () => {
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
        <h3 className="text-center mt-4">Không tìm thấy thông tin</h3>
      </Container>
    );
  return (
    <>
      <InfoBook />
      <CommentsOfBook />
    </>
  );
};

export default DetailReviewBook;
