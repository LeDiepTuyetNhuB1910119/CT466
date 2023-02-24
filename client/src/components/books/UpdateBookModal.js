import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap//Row";
import Col from "react-bootstrap//Col";
import Image from "react-bootstrap/Image";

import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CategoryContext } from "../../contexts/CategoryContext";
import { BookContext } from "../../contexts/BookContext";
import { AuthContext } from "../../contexts/AuthContext";

const UpdateBookModal = () => {
  // category context
  const {
    bookState: { book },
    showUpdateBookModal,
    setShowUpdateBookModal,
    updateBook,
    setShowToast,
    getBooks,
    getBooksByUser,
  } = useContext(BookContext);

  // auth context
  const {
    authState: { user },
  } = useContext(AuthContext);

  // category context
  const {
    categoryState: { categories },
    getCategories,
  } = useContext(CategoryContext);

  // use effect get categories to show in form select
  useEffect(() => {
    const gettingCategories = async () => {
      await getCategories();
    };
    gettingCategories();
  }, []);

  // use location
  const location = useLocation();

  // state ban đầu là book ban đầu
  const [updatedBook, setUpdatedBook] = useState("");

  // state
  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const setInfoBook = async () => {
      // set trạng thái là thông tin của book đã chọn
      setUpdatedBook(book);
      setImagePreview(book.image.url);
      setTitle(book.title);
      setDescription(book.description);
      setCategory(book.category._id);
    };
    setInfoBook();
  }, [book]);

  // function transform file data
  const transformFileData = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
        setImagePreview(reader.result);
      };
    } else {
      setImage("");
    }
  };

  // function on change image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    // call function transform
    transformFileData(file);
  };

  // function submit
  const onSubmit = async (event) => {
    event.preventDefault();

    const { success, message } = await updateBook({
      image,
      book: {
        ...updatedBook,
        title,
        description,
        category,
      },
    });

    setShowUpdateBookModal(false);

    setShowToast({
      show: true,
      message,
      type: success ? "success" : "danger",
    });

    if (location.pathname === "/mypage") {
      getBooksByUser(user._id);
    } else {
      getBooks();
    }
  };

  // function closeDialog
  const closeDialog = () => {
    // set về trạng thái book ban đầu trước khi tắt
    setUpdatedBook(book);
    setImagePreview(book.image.url);
    setTitle(book.title);
    setDescription(book.description);
    setCategory(book.category._id);

    setShowUpdateBookModal(false);
  };

  return (
    <Modal show={showUpdateBookModal} onHide={closeDialog} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Update book</Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Title:</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  required
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Image:</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category:</Form.Label>
                <Form.Select
                  name="category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <option>Please select a category</option>
                  {categories.map((category) => (
                    <option value={category._id} key={category._id}>
                      {category.categoryName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </Form.Group>
            </Col>

            <Col className="image-preview">
              {imagePreview ? (
                <Image src={imagePreview} alt="img-view" width="100%" />
              ) : (
                <p>Product image upload preview will appear here!</p>
              )}
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdateBookModal;
