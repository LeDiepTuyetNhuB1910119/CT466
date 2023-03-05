import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

import lemonLogo from "../../assets/lemon.png";

import { AuthContext } from "../../contexts/AuthContext";
import { CategoryContext } from "../../contexts/CategoryContext";

const NavbarMenu = () => {
  // auth context
  const {
    authState: { user },
    logoutUser,
  } = useContext(AuthContext);

  // category context
  const {
    categoryState: { categories },
    getCategories,
  } = useContext(CategoryContext);

  // use effect
  useEffect(() => {
    const gettingCategories = async () => {
      getCategories();
    };
    gettingCategories();
  }, []);

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
            <Nav.Link to="/home" as={Link}>
              Home
            </Nav.Link>
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              {categories.map((category) => (
                <NavDropdown.Item
                  key={category._id}
                  to={`/category/${category._id}`}
                  as={Link}
                >
                  {category.categoryName}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <Nav.Link to="/about" as={Link}>
              About
            </Nav.Link>
          </Nav>

          {user ? (
            <>
              <Nav>
                <NavDropdown align="end" title={user.username}>
                  {user.isAdmin && (
                    <NavDropdown.Item key="admin" to="/admin" as={Link}>
                      Admin
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Item key="logout" onClick={logoutUser}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </>
          ) : (
            <Nav>
              <Nav.Link className="d-flex" to="/login" as={Link}>
                Login
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarMenu;
