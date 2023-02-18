import {
  CATEGORIES_LOADED_SUCCESS,
  CATEGORIES_LOADED_FAIL,
  ADD_CATEGORY,
  FIND_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from "../contexts/constants";

export const categoryReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CATEGORIES_LOADED_SUCCESS:
      return {
        ...state,
        categories: payload,
        categoriesLoading: false,
      };
    case CATEGORIES_LOADED_FAIL:
      return {
        ...state,
        categories: [],
        categoriesLoading: false,
      };
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, payload],
      };
    case FIND_CATEGORY:
      return {
        ...state,
        category: payload,
      };
    case UPDATE_CATEGORY:
      const newCategories = state.categories.map((category) =>
        category._id === payload._id ? payload : category
      );
      return {
        ...state,
        categories: newCategories,
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category._id !== payload
        ),
      };
    default:
      return state;
  }
};
