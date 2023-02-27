import { createContext, useReducer, useState } from "react";
import { commentReducer } from "../reducers/commentReducer";
import {
  apiUrl,
  COMMENTS_LOADED_SUCCESS,
  COMMENTS_LOADED_FAIL,
  COMMENTS_BY_BOOK_LOADED_SUCCESS,
  COMMENTS_BY_BOOK_LOADED_FAIL,
  DELETE_COMMENT,
  ADD_COMMENT,
  FIND_COMMENT,
  UPDATE_COMMENT,
} from "../contexts/constants";

import axios from "axios";

export const CommentContext = createContext();

const CommentContextProvider = ({ children }) => {
  // state
  const [commentState, dispatch] = useReducer(commentReducer, {
    comment: null,
    comments: [],
    commentsLoading: true,
  });

  // state show modal
  const [showAddCommentModal, setShowAddCommentModal] = useState(false);
  const [showUpdateCommentOfBookModal, setShowUpdateCommentOfBookModal] =
    useState(false);

  // state show toast
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  // function get all comment
  const getComments = async () => {
    try {
      const response = await axios.get(`${apiUrl}/comments`);
      if (response.data.success) {
        dispatch({
          type: COMMENTS_LOADED_SUCCESS,
          payload: response.data.comments,
        });
      }
    } catch (error) {
      dispatch({ type: COMMENTS_LOADED_FAIL });
    }
  };

  // function getCommentsByBook
  const getCommentsByBook = async (bookId) => {
    try {
      const response = await axios.get(`${apiUrl}/comments/book/${bookId}`);
      if (response.data.success) {
        dispatch({
          type: COMMENTS_BY_BOOK_LOADED_SUCCESS,
          payload: response.data.comments,
        });
      }
    } catch (error) {
      dispatch({ type: COMMENTS_BY_BOOK_LOADED_FAIL });
    }
  };

  // function deleteComment
  const deleteComment = async (commentId) => {
    try {
      const response = await axios.delete(`${apiUrl}/comments/${commentId}`);
      if (response.data.success) {
        dispatch({
          type: DELETE_COMMENT,
          payload: commentId,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  //function add comment
  const createComment = async (newComment) => {
    try {
      const response = await axios.post(
        `${apiUrl}/comments/book/${newComment.book}`,
        newComment
      );
      if (response.data.success) {
        dispatch({
          type: ADD_COMMENT,
          payload: response.data.comment,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // function find comment by id
  const findComment = (commentId) => {
    const comment = commentState.comments.find(
      (comment) => comment._id === commentId
    );
    dispatch({ type: FIND_COMMENT, payload: comment });
  };

  // function update comment
  const updateComment = async (updatedComment) => {
    try {
      const response = await axios.put(
        `${apiUrl}/comments/${updatedComment._id}`,
        updatedComment
      );
      if (response.data.success) {
        dispatch({
          type: UPDATE_COMMENT,
          payload: response.data.comment,
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
  const commentContextData = {
    commentState,
    getCommentsByBook,
    deleteComment,
    showToast,
    setShowToast,
    createComment,
    getComments,
    showAddCommentModal,
    setShowAddCommentModal,
    findComment,
    updateComment,
    showUpdateCommentOfBookModal,
    setShowUpdateCommentOfBookModal,
  };

  // return
  return (
    <CommentContext.Provider value={commentContextData}>
      {children}
    </CommentContext.Provider>
  );
};

export default CommentContextProvider;
