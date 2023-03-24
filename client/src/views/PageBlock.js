import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Button from "react-bootstrap/Button";
import { AuthContext } from "../contexts/AuthContext";

const PageBlock = () => {
  const { logoutUser } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    logoutUser();
    history.push("/");
  };
  return (
    <div className="landing-inner">
      <h3 className="mt-5">Oops! Tài khoản của bạn đang bị block.</h3>
      <h4>Vui lòng đăng nhập sau.</h4>
      <p>
        <Button
          onClick={() => handleLogout()}
          variant="info"
          size="sm"
          className="mt-2"
        >
          Back to home page
        </Button>
      </p>
    </div>
  );
};

export default PageBlock;
