import React from "react";
import { BookContext } from "../../contexts/BookContext";
import { useContext, useEffect } from "react";

import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import ActionBookAdmin from "../../components/books/ActionBookAdmin";
import AddBookModal from "../../components/books/AddBookModal";
import UpdateBookModal from "../../components/books/UpdateBookModal";

const BookList = () => {
  // book context
  const {
    bookState: { book, books, booksLoading },
    getBooks,
    setShowAddBookModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(BookContext);

  // effect

  // effect get all books
  useEffect(() => {
    const gettingBooks = async () => {
      await getBooks();
    };
    gettingBooks();
  }, []);

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
        <div className="table-responsive">
          <table className="table table-bordered border-primary table-hover">
            <thead className="table-primary">
              <tr className="text-center align-middle">
                <th width="250">ID</th>
                <th>Title</th>
                <th width="100">Image</th>
                <th>Category</th>
                <th>Poster</th>
                <th>View</th>
                <th>Created At</th>
                <th width="200">Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id} className="align-middle">
                  <td>{book._id}</td>
                  <td>{book.title}</td>
                  <td className="text-center">
                    {book.image ? (
                      <img src={book.image.url} alt={book.title} width="50%" />
                    ) : (
                      ""
                    )}
                  </td>
                  <td className="text-center">{book.category.categoryName}</td>
                  <td className="text-center">
                    {book.user ? book.user.username : "unknow"}
                  </td>
                  <td className="text-center">{book.view}</td>
                  <td className="text-center">{book.createdAt.slice(0, 10)}</td>
                  <td className="text-center">
                    <ActionBookAdmin _id={book._id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  // return
  return (
    <>
      <Container>
        <h1 className="text-center mt-4 my-4">List books</h1>
        <div className="d-grid d-md-flex justify-content-end my-4">
          <Button
            onClick={() => {
              setShowAddBookModal(true);
            }}
          >
            Create
          </Button>
        </div>

        <div className="mb-4">
          <b>Total: </b>
          <b className="text-success font-weight-bold">{books.length}</b> books
        </div>

        <div>{body}</div>

        {/* add book */}
        <AddBookModal />

        {/* update book */}
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

export default BookList;
