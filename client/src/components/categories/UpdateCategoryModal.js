import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useContext, useState, useEffect } from "react";
import { CategoryContext } from "../../contexts/CategoryContext";

const UpdateCategoryModal = () => {
  // category context
  const {
    categoryState: { category },
    showUpdateCategoryModal,
    setShowUpdateCategoryModal,
    updateCategory,
    setShowToast,
  } = useContext(CategoryContext);

  // state ban đầu là category ban đầu
  const [updatedCategory, setUpdatedCategory] = useState(category);

  const { categoryName } = updatedCategory;

  // effect thay đổi state của updatedCategory khi người dùng update xong
  useEffect(() => {
    const setAfterUpdatedCategory = async () => {
      setUpdatedCategory(category);
    };
    setAfterUpdatedCategory();
  }, [category]);

  // function on change updated category
  const onChangeUpdatedCategoryForm = (event) => {
    setUpdatedCategory({
      ...updatedCategory,
      [event.target.name]: event.target.value,
    });
  };

  // function close dialog
  const closeDialog = () => {
    setUpdatedCategory(category);
    setShowUpdateCategoryModal(false);
  };

  // funtion submit
  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updateCategory(updatedCategory);
    setShowUpdateCategoryModal(false);
    setShowToast({ show: true, message, type: success ? "success" : "danger" });

    // nếu k update được, set state updatedCategory về giá trị ban đầu
    if (!success) {
      setUpdatedCategory(category);
    }
  };

  // return
  return (
    <Modal show={showUpdateCategoryModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Update Category</Modal.Title>
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
              value={categoryName}
              onChange={onChangeUpdatedCategoryForm}
            />
            <Form.Text title="category-help">Required</Form.Text>
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

export default UpdateCategoryModal;
