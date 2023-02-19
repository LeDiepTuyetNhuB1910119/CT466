import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useContext, useState } from "react";
import { CategoryContext } from "../../contexts/CategoryContext";

const AddCategoryModal = () => {
  // category context
  const {
    showAddCategoryModal,
    setShowAddCategoryModal,
    createCategory,
    setShowToast,
  } = useContext(CategoryContext);

  // state
  const [newCategory, setNewCategory] = useState({
    categoryName: "",
  });

  const { categoryName } = newCategory;

  // function on change new category form
  const onChangeNewCategoryForm = (event) => {
    setNewCategory({ ...newCategory, [event.target.name]: event.target.value });
  };
  // function submit
  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await createCategory(newCategory);
    resetAddCategoryData();
    setShowToast({
      show: true,
      message,
      type: success ? "success" : "danger",
    });
  };

  //  function reset form và tắt modal
  const resetAddCategoryData = () => {
    setNewCategory({ categoryName: "" });
    setShowAddCategoryModal(false);
  };

  // function closeDialog
  const closeDialog = () => {
    resetAddCategoryData();
  };

  return (
    <Modal show={showAddCategoryModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Add category</Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Category name:</Form.Label>
            <Form.Control
              type="text"
              name="categoryName"
              placeholder="category name"
              required
              aria-describedby="category-help"
              value={categoryName}
              onChange={onChangeNewCategoryForm}
            />
            <Form.Text id="category-help" muted>
              Required
            </Form.Text>
          </Form.Group>
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

export default AddCategoryModal;
