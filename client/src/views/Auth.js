import React from "react";
import Spinner from "react-bootstrap/Spinner";
import { Redirect } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

const Auth = ({ authRoute }) => {
  // state
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  let body;

  if (authLoading) {
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (isAuthenticated) {
    return <Redirect to="/home" />; // đã login, chuyển tới /home
  } else {
    body = (
      <>
        {authRoute === "login" && <LoginForm />}
        {authRoute === "register" && <RegisterForm />}
      </>
    );
  }
  // return
  return (
    <div className="landing">
      <div className="landing-background">
        <div className="landing-inner">
          <h2 className=" text-white">Lemon</h2>
          {body}
        </div>
      </div>
    </div>
  );
};

export default Auth;
