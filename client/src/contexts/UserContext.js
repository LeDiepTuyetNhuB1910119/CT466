import { createContext, useReducer, useState } from "react";
import { userReducer } from "../reducers/userReducer";
import {
  apiUrl,
  USERS_LOADED_SUCCESS,
  USERS_LOADED_FAIL,
  DELETE_USER,
  ADD_USER,
  UPDATE_STATE_USER,
} from "./constants";
import axios from "axios";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  //state
  const [userState, dispatch] = useReducer(userReducer, {
    user: null,
    users: [],
    usersLoading: true,
  });

  // state show modal
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  // state show toast
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  // function get all users
  const getUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/users`);
      if (response.data.success) {
        dispatch({
          type: USERS_LOADED_SUCCESS,
          payload: response.data.users,
        });
      }
    } catch (error) {
      dispatch({ type: USERS_LOADED_FAIL });
    }
  };

  // function delete user
  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`${apiUrl}/users/${userId}`);
      if (response.data.success) {
        dispatch({
          type: DELETE_USER,
          payload: userId,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // function create user by admin
  const createUser = async (newUser) => {
    try {
      const response = await axios.post(`${apiUrl}/users`, newUser);
      if (response.data.success) {
        dispatch({
          type: ADD_USER,
          payload: response.data.user,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // function update state of user
  const updateStateUser = async (userId) => {
    try {
      const response = await axios.put(`${apiUrl}/users/state/${userId}`);
      if (response.data.success) {
        dispatch({
          type: UPDATE_STATE_USER,
          payload: response.data.user,
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
  const userContextData = {
    userState,
    getUsers,
    deleteUser,
    showToast,
    setShowToast,
    showAddUserModal,
    setShowAddUserModal,
    createUser,
    updateStateUser,
  };

  // return
  return (
    <UserContext.Provider value={userContextData}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
