import {
  BOOKS_LOADED_SUCCESS,
  BOOKS_LOADED_FAIL,
  GET_BOOK,
  ADD_BOOK,
  FIND_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK,
} from "../contexts/constants";

export const bookReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case BOOKS_LOADED_SUCCESS:
      return {
        ...state,
        books: payload,
        booksLoading: false,
      };

    case BOOKS_LOADED_FAIL:
      return {
        ...state,
        books: [],
        booksLoading: false,
      };

    case GET_BOOK:
      return {
        ...state,
        book: payload,
      };

    case ADD_BOOK:
      return {
        ...state,
        books: [...state.books, payload],
      };

    case FIND_BOOK:
      return {
        ...state,
        book: payload,
      };

    case UPDATE_BOOK:
      const newBooks = state.books.map((book) =>
        book._id === payload._id ? payload : book
      );
      return {
        ...state,
        books: newBooks,
      };

    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter((book) => book._id !== payload),
      };

    default:
      return state;
  }
};
