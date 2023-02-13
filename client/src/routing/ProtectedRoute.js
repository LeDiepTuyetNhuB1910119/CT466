import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import NavbarMenu from "../components/layout/NavbarMenu";

// prop là component, đổi tên prop từ component sang Component
// ...rest là những điều kiện còn lại
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading) {
    return (
      <div className="spinner-container">
        <Spinner animmation="border" variant="info" />
      </div>
    );
  }

  return (
    // check điều kiện ...rest để render
    <Route
      {...rest}
      render={(props) => (
        <>
          <NavbarMenu />
          <Component {...rest} {...props} />
        </>
      )}
    />
  );
};

export default ProtectedRoute;
