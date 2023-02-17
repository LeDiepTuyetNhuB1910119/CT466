export const apiUrl =
  process.env.NODE_ENV !== "production" ? "http://localhost:5000/api" : "";

export const LOCAL_STORAGE_TOKEN_NAME = "lemon-review-book";

export const USERS_LOADED_SUCCESS = "USERS_LOADED_SUCCESS";
export const USERS_LOADED_FAIL = "USERS_LOADED_FAIL";
export const DELETE_USER = "DELETE_USER";
export const ADD_USER = "ADD_USER";
