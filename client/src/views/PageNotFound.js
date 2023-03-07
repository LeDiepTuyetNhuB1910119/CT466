import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="landing-inner">
      <h3 className="mt-5">Oops! Không thể tìm thấy trang.</h3>
      <p>
        <Link to="/home">
          <Button variant="info" size="sm" className="mt-2">
            Back to home page
          </Button>
        </Link>
      </p>
    </div>
  );
};

export default PageNotFound;
