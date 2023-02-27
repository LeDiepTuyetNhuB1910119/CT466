import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import lemonLogo from "../../assets/lemon.png";

import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const NavbarAdmin = () => {
  // auth context
  const {
    authState: { user },
    logoutUser,
  } = useContext(AuthContext);

  //return
  return (
    <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
      <Container fluid>
        <Navbar.Brand className="font-weight-bolder text-white">
          <img
            src={lemonLogo}
            alt="lemonLogo"
            width="32"
            height="32"
            className="mr-2"
          />
          Lemon
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link to="/admin/books" as={Link}>
              Books
            </Nav.Link>
            <Nav.Link to="/admin/categories" as={Link}>
              Categories
            </Nav.Link>
            <Nav.Link to="/admin/comments" as={Link}>
              Comments
            </Nav.Link>
            <Nav.Link to="/admin/users" as={Link}>
              Users
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown align="end" title={user.username}>
              <NavDropdown.Item key="admin" to="/home" as={Link}>
                Home
              </NavDropdown.Item>
              <NavDropdown.Item key="logout" onClick={logoutUser}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarAdmin;
