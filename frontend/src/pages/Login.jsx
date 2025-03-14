import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", credentials);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-4 border rounded shadow bg-light">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Felhasználónév/ E-mail cím"
              name="username"
              value={credentials.username}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Jelszó"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="fs-4 text-center"
            />
          </Form.Group>

          <div className="d-flex justify-content-around">
            <Button variant="outline-primary" type="submit">
              Sign Up
            </Button>
            <Button variant="primary" type="submit">
              Log In
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}

export default Login;
