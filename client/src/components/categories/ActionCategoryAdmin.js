import React from "react";
import Button from "react-bootstrap/Button";

import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";

import { CategoryContext } from "../../contexts/CategoryContext";
import { useContext } from "react";

const ActionCategoryAdmin = ({ _id }) => {
  // category context
  const {
    findCategory,
    setShowUpdateCategoryModal,
    deleteCategory,
    setShowToast,
  } = useContext(CategoryContext);

  // function choose category and show modal update
  const chooseCategory = (categoryId) => {
    findCategory(categoryId);
    setShowUpdateCategoryModal(true);
  };

  const handlerDeleteCategory = async (categoryId) => {
    const { success, message } = await deleteCategory(categoryId);
    setShowToast({
      show: true,
      message,
      type: success ? "success" : "danger",
    });
  };

  return (
    <>
      <Button
        className="edit-button"
        variant="outline-primary"
        onClick={chooseCategory.bind(this, _id)}
      >
        <img src={editIcon} alt="edit" width="24" height="24" />
      </Button>
      &nbsp;
      <Button
        className="delete-button"
        variant="outline-primary"
        onClick={handlerDeleteCategory.bind(this, _id)}
      >
        <img src={deleteIcon} alt="delete" width="24" height="24" />
      </Button>
    </>
  );
};

export default ActionCategoryAdmin;
