import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import NavbarAdmin from "../components/layout/NavbarAdmin";

// prop là component, đổi tên prop từ component sang Component
// ...rest là những điều kiện còn lại

const AdminRoute = ({ component: Component, ...rest }) => {
  // auth context
  const {
    authState: { authLoading, isAuthenticated, user },
  } = useContext(AuthContext);

  if (authLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }

  // return
  return (
    // check điều kiện ...rest để render
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          user.isAdmin ? (
            <>
              <NavbarAdmin />
              {/* <Row>
                <Col>
                  <SidebarAdmin />
                </Col>
                <Col> */}
              <Component {...rest} {...props} />
              {/* </Col>
              </Row> */}
            </>
          ) : (
            <Redirect to="/home" />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default AdminRoute;
