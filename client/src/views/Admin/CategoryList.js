import React from "react";
import { CategoryContext } from "../../contexts/CategoryContext";
import { useContext, useEffect } from "react";

import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";

import ActionCategoryAdmin from "../../components/categories/ActionCategoryAdmin";
import AddCategoryModal from "../../components/categories/AddCategoryModal";
import UpdateCategoryModal from "../../components/categories/UpdateCategoryModal";

const CategoryList = () => {
  // category context
  const {
    categoryState: { category, categories, categoriesLoading },
    getCategories,
    setShowAddCategoryModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(CategoryContext);

  // effect

  // effect get all categories
  useEffect(() => {
    const gettingCategories = async () => {
      getCategories();
    };
    gettingCategories();
  }, []);

  let body = null;

  if (categoriesLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (categories.length === 0) {
    body = <h1>Rỗng</h1>;
  } else {
    body = (
      <>
        <div className="table-responsive">
          <table className="table table-bordered border-primary table-hover">
            <thead className="table-primary">
              <tr className="text-center align-middle">
                <th width="250">ID</th>
                <th>Category Name</th>
                <th width="200">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id} className="align-middle">
                  <td>{category._id}</td>
                  <td className="text-center">{category.categoryName}</td>
                  <td className="text-center">
                    <ActionCategoryAdmin _id={category._id} />
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
        <h1 className="text-center mt-4 my-4">List categories</h1>
        <div className="d-grid d-md-flex justify-content-end my-4">
          <Button
            onClick={() => {
              setShowAddCategoryModal(true);
            }}
          >
            Create
          </Button>
        </div>

        <div className="mb-4">
          <b>Total: </b>
          <b className="text-success font-weight-bold">
            {categories.length}
          </b>{" "}
          categories
        </div>

        <div>{body}</div>

        {/* add category */}
        <AddCategoryModal />

        {/* update category when category != null */}
        {category !== null && <UpdateCategoryModal />}

        {/* After category is added, show toast */}
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

export default CategoryList;
