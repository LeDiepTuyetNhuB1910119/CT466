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

const AddBookModal = () => {
  // book context
  const {
    showAddBookModal,
    setShowAddBookModal,
    createBook,
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

  // state
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  // function transform file data
  const transformFileData = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
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

    const { success, message } = await createBook({
      title,
      description,
      category,
      image,
    });
    resetAddBookData();

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

  //  function reset form và tắt modal
  const resetAddBookData = () => {
    setTitle("");
    setCategory("");
    setDescription("");
    setImage("");
    setShowAddBookModal(false);
  };

  // function closeDialog
  const closeDialog = () => {
    resetAddBookData();
  };

  return (
    <Modal show={showAddBookModal} onHide={closeDialog} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add book</Modal.Title>
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
              {image ? (
                <Image src={image} alt="img-view" width="100%" />
              ) : (
                <p>Book image upload preview will appear here!</p>
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

export default AddBookModal;
