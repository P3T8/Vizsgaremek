import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "diak", // Alapértelmezett bejelentkezési típus (diák)
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error message

    try {
      // A végpont dinamikusan változik a userType alapján
      const endpoint = formData.userType === "diak"
        ? "http://localhost:5000/api/diak/login"
        : "http://localhost:5000/api/tanar/login";

      // Bejelentkezési kérés küldése
      const response = await axios.post(endpoint, {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.token) {
        // Ha sikeres a bejelentkezés, mentsük el a token-t
        localStorage.setItem("token", response.data.token);
        alert("Bejelentkezés sikeres!");
        navigate("/dashboard"); // Átirányítás a felhasználói felületre
      } else {
        setError("Hiba történt a bejelentkezés során.");
      }
    } catch (error) {
      const errMessage = error.response?.data?.error || "Hiba történt a bejelentkezés során.";
      setError(errMessage);
      console.error("Login failed:", error.response || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-70">
      <Form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-white" style={{ width: "350px" }}>
        <h2>Bejelentkezés</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Group className="mb-3">
          <Form.Label>E-mail:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Jelszó:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Felhasználói típus választása */}
        <Form.Group className="mb-3">
          <Form.Label>Felhasználói típus:</Form.Label>
          <Form.Check
            type="radio"
            label="Diák"
            name="userType"
            value="diak"
            checked={formData.userType === "diak"}
            onChange={handleChange}
          />
          <Form.Check
            type="radio"
            label="Tanár"
            name="userType"
            value="tanar"
            checked={formData.userType === "tanar"}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit" variant="primary" disabled={loading} style={{ width: "100%" }}>
          {loading ? "Bejelentkezés..." : "Bejelentkezés"}
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
