import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

const AddUserByAdminModal = () => {
  // category context
  const { showAddUserModal, setShowAddUserModal, createUser, setShowToast } =
    useContext(UserContext);

  // state
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    isAdmin: "",
  });

  const { username, password, confirmPassword, isAdmin } = newUser;

  // function on change new user form
  const onChangeNewUserForm = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  // function submit
  const onSubmit = async (event) => {
    // event.preventDefault();
    const { success, message } = await createUser(newUser);
    resetAddUserData();
    setShowToast({
      show: true,
      message,
      type: success ? "success" : "danger",
    });
  };

  //  function reset form và tắt modal
  const resetAddUserData = () => {
    setNewUser({
      username: "",
      password: "",
      confirmPassword: "",
      isAdmin: "",
    });
    setShowAddUserModal(false);
  };

  // function closeDialog
  const closeDialog = () => {
    resetAddUserData();
  };

  return (
    <Modal show={showAddUserModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Create new user</Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-2">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              required
              value={username}
              onChange={onChangeNewUserForm}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              required
              value={password}
              onChange={onChangeNewUserForm}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Confirm password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={onChangeNewUserForm}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Is admin:</Form.Label>
            <div>
              <Form.Check
                inline
                label="true"
                type="radio"
                name="isAdmin"
                value="true"
                onChange={onChangeNewUserForm}
              />
              <Form.Check
                inline
                label="false"
                type="radio"
                name="isAdmin"
                value="false"
                onChange={onChangeNewUserForm}
              />
            </div>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddUserByAdminModal;
