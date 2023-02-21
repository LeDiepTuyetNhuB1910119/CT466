export const apiUrl =
  process.env.NODE_ENV !== "production" ? "http://localhost:5000/api" : "";

export const LOCAL_STORAGE_TOKEN_NAME = "lemon-review-book";

export const USERS_LOADED_SUCCESS = "USERS_LOADED_SUCCESS";
export const USERS_LOADED_FAIL = "USERS_LOADED_FAIL";
export const DELETE_USER = "DELETE_USER";
export const ADD_USER = "ADD_USER";

export const CATEGORIES_LOADED_SUCCESS = "CATEGORIES_LOADED_SUCCESS";
export const CATEGORIES_LOADED_FAIL = "CATEGORIES_LOADED_FAIL";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const FIND_CATEGORY = "FIND_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";

export const BOOKS_LOADED_SUCCESS = "BOOKS_LOADED_SUCCESS";
export const BOOKS_LOADED_FAIL = "BOOKS_LOADED_FAIL";
export const ADD_BOOK = "ADD_BOOK";
