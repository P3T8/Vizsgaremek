import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 🔄 useHistory helyett

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // 🔄 Navigáláshoz React Router v6-ban

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/login", credentials);

      if (response.data.success) {
        console.log("Bejelentkezve:", response.data);
        alert("Sikeres bejelentkezés!");
        navigate("/dashboard"); // 🔄 Navigáció dashboardra
      } else {
        setError("Hibás felhasználónév vagy jelszó.");
      }
    } catch (error) {
      setError("Hiba történt a bejelentkezés során.");
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-60">
      <div className="p-4 border rounded shadow bg-light">
        <h2>Bejelentkezés</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Felhasználónév / E-mail"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
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
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-around">
            <Button variant="outline-primary" type="button" onClick={() => navigate("/signup")}>
              Regisztráció
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Bejelentkezés..." : "Bejelentkezés"}
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}

export default Login;
