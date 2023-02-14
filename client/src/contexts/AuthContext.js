import { createContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  // Function Authenticate user (xác thực user có trong csdl server k)
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    try {
      const response = await axios.get(`${apiUrl}/auth`);
      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: true, user: response.data.user },
          // return user từ router.get / của server/routes/auth.js
        });
      }
    } catch (error) {
      // xóa accessToken trong localStorage
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      // xóa tất cả header axios trong các request về sau (gán token === null)
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, user: null },
      });
    }
  };

  // useEffect gọi hàm loadUser() ngay khi bắt đầu app
  useEffect(() => {
    const loadingUser = async () => {
      loadUser();
    };
    loadingUser();
  }, []);

  // Login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
          // khi success, gán accessToken return từ server route auth/login
          // cho localStrorage
        );
      }

      await loadUser(); // kiểm tra lại user có token k, có trong csdl k

      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data; // lỗi lấy từ backend
      else return { success: false, message: error.message }; // lỗi khác
    }
  };

  // Logout
  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch({
      type: "SET_AUTH",
      payload: { isAuthenticated: false, user: null },
    });
  };

  // context data
  const authContextData = {
    authState,
    loadUser,
    loginUser,
    logoutUser,
  };

  // return
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
