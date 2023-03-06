import { createContext, useReducer, useState } from "react";
import { bookReducer } from "../reducers/bookReducer";
import {
  apiUrl,
  BOOKS_LOADED_SUCCESS,
  BOOKS_LOADED_FAIL,
  BOOKS_BY_CATEGORY_SUCCESS,
  BOOKS_BY_CATEGORY_FAIL,
  BOOKS_BY_USER_SUCCESS,
  BOOKS_BY_USER_FAIL,
  ADD_BOOK,
  FIND_BOOK,
  UPDATE_BOOK,
  GET_BOOK,
  DELETE_BOOK,
  UPDATE_VIEW,
} from "./constants";
import axios from "axios";

export const BookContext = createContext();

const BookContextProvider = ({ children }) => {
  // state
  const [bookState, dispatch] = useReducer(bookReducer, {
    book: null,
    books: [],
    booksLoading: true,
  });

  // show Toast, modal
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [showUpdateBookModal, setShowUpdateBookModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  // Function
  // function get all books
  const getBooks = async () => {
    try {
      const response = await axios.get(`${apiUrl}/books`);
      if (response.data.success) {
        dispatch({
          type: BOOKS_LOADED_SUCCESS,
          payload: response.data.books,
        });
      }
    } catch (error) {
      dispatch({ type: BOOKS_LOADED_FAIL });
    }
  };

  // function getBooksByCategory
  const getBooksByCategory = async (categoryId) => {
    try {
      const response = await axios.get(
        `${apiUrl}/books/category/${categoryId}`
      );
      if (response.data.success) {
        dispatch({
          type: BOOKS_BY_CATEGORY_SUCCESS,
          payload: response.data.books,
        });
      }
    } catch (error) {
      dispatch({ type: BOOKS_BY_CATEGORY_FAIL });
    }
  };

  // function get book of user
  const getBooksByUser = async (userId) => {
    try {
      const response = await axios.get(`${apiUrl}/books/user/${userId}`);
      if (response.data.success) {
        dispatch({
          type: BOOKS_BY_USER_SUCCESS,
          payload: response.data.books,
        });
      }
    } catch (error) {
      dispatch({ type: BOOKS_BY_USER_FAIL });
    }
  };

  // function get one book by id
  const getOneBook = async (bookId) => {
    try {
      const response = await axios.get(`${apiUrl}/books/${bookId}`);
      if (response.data.success) {
        dispatch({
          type: GET_BOOK,
          payload: response.data.book,
        });
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // function add book
  const createBook = async (newBook) => {
    try {
      const response = await axios.post(`${apiUrl}/books`, newBook);
      if (response.data.success) {
        dispatch({
          type: ADD_BOOK,
          payload: response.data.book,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // function find book
  const findBook = (bookId) => {
    const book = bookState.books.find((book) => book._id === bookId);
    dispatch({ type: FIND_BOOK, payload: book });
  };

  // function update category
  const updateBook = async (updatedBook) => {
    try {
      const response = await axios.put(
        `${apiUrl}/books/${updatedBook.book._id}`,
        updatedBook
      );
      if (response.data.success) {
        dispatch({
          type: UPDATE_BOOK,
          payload: response.data.book,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // function delete book
  const deleteBook = async (bookId) => {
    try {
      const response = await axios.delete(`${apiUrl}/books/${bookId}`);
      if (response.data.success) {
        dispatch({
          type: DELETE_BOOK,
          payload: bookId,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // function count view of book
  const countView = async (bookId) => {
    try {
      const response = await axios.get(`${apiUrl}/books/view/${bookId}`);
      if (response.data.success) {
        dispatch({
          type: UPDATE_VIEW,
          payload: response.data.book,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // book context data
  const bookContextData = {
    bookState,
    getBooks,
    getBooksByCategory,
    getBooksByUser,
    getOneBook,
    createBook,
    showAddBookModal,
    setShowAddBookModal,
    showToast,
    setShowToast,
    findBook,
    updateBook,
    showUpdateBookModal,
    setShowUpdateBookModal,
    deleteBook,
    countView,
  };

  // return
  return (
    <BookContext.Provider value={bookContextData}>
      {children}
    </BookContext.Provider>
  );
};

export default BookContextProvider;
