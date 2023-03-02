import React from "react";
import { CategoryContext } from "../../contexts/CategoryContext";
import { useContext, useEffect, useState } from "react";

import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import Form from "react-bootstrap/Form";

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

  // useState
  const [filteredCategories, setFilteredCategories] = useState("");

  // effect set filteredBook
  useEffect(() => {
    const setFilter = async () => {
      setFilteredCategories(categories);
    };
    setFilter();
  }, [categories]);

  // function handle search categories
  const handleSearch = (event) => {
    const query = event.target.value;
    const searchCategories = categories.filter((category) =>
      category.categoryName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCategories(searchCategories);
  };

  let body = null;

  if (categoriesLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (filteredCategories.length === 0) {
    body = <p className=" text-center mt-5">Không tìm thấy thông tin</p>;
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
              {filteredCategories.map((category) => (
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

        <div className="row">
          <div className="col col-md-4">
            <Form className="row">
              <Form.Label className="col-auto">Search category:</Form.Label>
              <Form.Control
                type="search"
                className="col"
                placeholder="Search"
                aria-label="Search"
                onChange={handleSearch}
              />
            </Form>
          </div>
          <div className="col d-grid justify-content-end">
            <Button
              onClick={() => {
                setShowAddCategoryModal(true);
              }}
            >
              Create
            </Button>
          </div>
        </div>

        <div className="mb-4 mt-4">
          <b>Total: </b>
          <b className="text-success font-weight-bold">
            {filteredCategories.length}
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
