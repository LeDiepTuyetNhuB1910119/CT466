import {
  USERS_LOADED_SUCCESS,
  USERS_LOADED_FAIL,
  DELETE_USER,
  ADD_USER,
  UPDATE_STATE_USER,
} from "../contexts/constants";

export const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case USERS_LOADED_SUCCESS:
      return {
        ...state,
        users: payload,
        usersLoading: false,
      };
    case USERS_LOADED_FAIL:
      return {
        ...state,
        users: [],
        usersLoading: false,
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== payload),
      };
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, payload],
      };
    case UPDATE_STATE_USER:
      const newUsers = state.users.map((user) =>
        user._id === payload._id ? payload : user
      );
      return {
        ...state,
        users: newUsers,
      };
    default:
      return state;
  }
};
