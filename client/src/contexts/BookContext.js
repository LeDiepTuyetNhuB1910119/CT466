import { createContext, useReducer, useState } from "react";
import { bookReducer } from "../reducers/bookReducer";
import {
  apiUrl,
  BOOKS_LOADED_SUCCESS,
  BOOKS_LOADED_FAIL,
  ADD_BOOK,
  FIND_BOOK,
  UPDATE_BOOK,
  GET_BOOK,
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

  // book context data
  const bookContextData = {
    bookState,
    getBooks,
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
  };

  // return
  return (
    <BookContext.Provider value={bookContextData}>
      {children}
    </BookContext.Provider>
  );
};

export default BookContextProvider;
