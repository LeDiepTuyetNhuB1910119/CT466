import React from "react";
import { UserContext } from "../../contexts/UserContext";
import { useContext, useEffect } from "react";

import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";

import deleteIcon from "../../assets/trash.svg";
import AddUserByAdminModal from "../../components/users/AddUserByAdminModal";

const UserList = () => {
  // user context
  const {
    userState: { users, usersLoading },
    getUsers,
    deleteUser,
    showToast: { show, message, type },
    setShowToast,
    setShowAddUserModal,
  } = useContext(UserContext);

  // effect
  // effect get all users
  useEffect(() => {
    const gettingUsers = async () => {
      getUsers();
    };
    gettingUsers();
  }, []);

  // function handler delete user
  const handlerDeleteUser = async (userId) => {
    const { success, message } = await deleteUser(userId);
    setShowToast({
      show: true,
      message,
      type: success ? "success" : "danger",
    });
  };

  let body = null;

  if (usersLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (users.length === 0) {
    body = <h1>Rỗng</h1>;
  } else {
    body = (
      <>
        <div className="table-responsive">
          <table className="table table-bordered border-primary table-hover">
            <thead className="table-primary">
              <tr className="text-center align-middle">
                <th width="250">ID</th>
                <th>Username</th>
                <th>Is Admin</th>
                <th width="200">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="align-middle">
                  <td>{user._id}</td>
                  <td>{user.username}</td>
                  <td className="text-center">
                    {user.isAdmin ? "true" : "false"}
                  </td>
                  <td className="text-center">
                    <Button
                      className="delete-button"
                      variant="outline-primary"
                      onClick={handlerDeleteUser.bind(this, user._id)}
                    >
                      <img
                        src={deleteIcon}
                        alt="delete"
                        width="24"
                        height="24"
                      />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  // return
  return (
    <>
      <Container>
        <h1 className="text-center mt-4 my-4">List users</h1>
        <div className="d-grid d-md-flex justify-content-end my-4">
          <Button
            type="button"
            onClick={() => {
              setShowAddUserModal(true);
            }}
          >
            Create
          </Button>
        </div>

        <div className="mb-4">
          <b>Total: </b>
          <b className="text-success font-weight-bold">{users.length}</b> users
        </div>

        <div>{body}</div>

        {/* add user */}
        <AddUserByAdminModal />

        {/* Hiện thông báo */}
        <Toast
          show={show}
          style={{ position: "fixed", top: "10%", right: "10px" }}
          className={`bg-${type} text-white`}
          onClose={() =>
            setShowToast({
              show: false,
              message: "",
              type: null,
            })
          }
          delay={3000}
          autohide
        >
          <Toast.Body>
            <strong>{message}</strong>
          </Toast.Body>
        </Toast>
      </Container>
    </>
  );
};

export default UserList;
