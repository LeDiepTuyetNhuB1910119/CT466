import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";

import { useContext, useState } from "react";

import AlertMessage from "../layout/AlertMessage";
import { AuthContext } from "../../contexts/AuthContext";

const RegisterForm = () => {
  // context
  const { registerUser } = useContext(AuthContext);

  // login state
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  // alert state
  const [alert, setAlert] = useState(null);

  // destructuring username, password từ loginForm (state)
  const { username, password, confirmPassword } = registerForm;

  // function onChangeLoginForm
  const onChangeRegisterForm = (event) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  };

  // function on submit register
  const register = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setAlert({ type: "danger", message: "Passwords do not match" });
      setTimeout(() => setAlert(null), 5000);
      return;
    }

    try {
      const registerData = await registerUser(registerForm);
      if (!registerData.success) {
        setAlert({ type: "danger", message: registerData.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // return
  return (
    <>
      <h1 className="text-warning">Register</h1>
      <Form className="my-4" onSubmit={register}>
        <AlertMessage info={alert} />
        <Form.Group className="mb-2">
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
      <p>
        Already have an account?
        <Link to="/login">
          <Button variant="info" size="sm" className="ml-2">
            Login
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

export default RegisterForm;
