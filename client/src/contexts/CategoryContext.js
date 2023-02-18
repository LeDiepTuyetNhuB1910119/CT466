import { createContext, useReducer, useState } from "react";
import { categoryReducer } from "../reducers/categoryReducer";
import {
  apiUrl,
  CATEGORIES_LOADED_SUCCESS,
  CATEGORIES_LOADED_FAIL,
  ADD_CATEGORY,
  FIND_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from "./constants";
import axios from "axios";

export const CategoryContext = createContext();

const CategoryContextProvider = ({ children }) => {
  // state
  const [categoryState, dispatch] = useReducer(categoryReducer, {
    category: null,
    categories: [],
    categoriesLoading: true,
  });

  // state show modal
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showUpdateCategoryModal, setShowUpdateCategoryModal] = useState(false);

  // state show toast
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  // function get all category
  const getCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/categories`);
      if (response.data.success) {
        dispatch({
          type: CATEGORIES_LOADED_SUCCESS,
          payload: response.data.categories,
        });
      }
    } catch (error) {
      dispatch({ type: CATEGORIES_LOADED_FAIL });
    }
  };

  // function add category
  const createCategory = async (newCategory) => {
    try {
      const response = await axios.post(`${apiUrl}/categories`, newCategory);
      if (response.data.success) {
        dispatch({
          type: ADD_CATEGORY,
          payload: response.data.category,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // function find category
  const findCategory = (categoryId) => {
    const category = categoryState.categories.find(
      (category) => category._id === categoryId
    );
    dispatch({ type: FIND_CATEGORY, payload: category });
  };

  // function update category
  const updateCategory = async (updatedCategory) => {
    try {
      const response = await axios.put(
        `${apiUrl}/categories/${updatedCategory._id}`,
        updatedCategory
      );
      if (response.data.success) {
        dispatch({
          type: UPDATE_CATEGORY,
          payload: response.data.category,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // function delete category
  const deleteCategory = async (categoryId) => {
    try {
      const response = await axios.delete(`${apiUrl}/categories/${categoryId}`);
      if (response.data.success) {
        dispatch({
          type: DELETE_CATEGORY,
          payload: categoryId,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // context data
  const categoryContextData = {
    categoryState,
    getCategories,

    createCategory,
    showAddCategoryModal,
    setShowAddCategoryModal,

    showToast,
    setShowToast,

    findCategory,
    updateCategory,
    showUpdateCategoryModal,
    setShowUpdateCategoryModal,

    deleteCategory,
  };

  // return
  return (
    <CategoryContext.Provider value={categoryContextData}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
