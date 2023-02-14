import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import AlertMessage from "../layout/AlertMessage";
import { AuthContext } from "../../contexts/AuthContext";

const LoginForm = () => {
  // context
  const { loginUser } = useContext(AuthContext);

  // login state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  // alert state
  const [alert, setAlert] = useState(null);

  // destructuring username, password từ loginForm (state)
  const { username, password } = loginForm;

  // function onChangeLoginForm
  const onChangeLoginForm = (event) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };

  // function onsubmit login
  const login = async (event) => {
    event.preventDefault();

    try {
      const loginData = await loginUser(loginForm); // fn loginUser từ authContext
      if (!loginData.success) {
        setAlert({
          type: "danger",
          message: loginData.message,
        });
        setTimeout(() => setAlert(null), 5000); // hiện báo lỗi trong 5s
      }
    } catch (error) {
      console.log(error);
    }
  };

  // return
  return (
    <>
      <h1 className="text-warning">Login</h1>
      <Form className="my-4" onSubmit={login}>
        <AlertMessage info={alert} />
        <Form.Group className="mb-2">
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p>
        Don't have any account?
        <Link to="/register">
          <Button variant="info" size="sm" className="ml-2">
            Register
          </Button>
        </Link>
      </p>
      <p>
        <Link to="/home">
          <Button variant="info" size="sm" className="ml-2">
            Back to home page
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
