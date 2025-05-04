import React, { useState } from "react";
import { Form, Button, Container, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "diak",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { email, password, userType } = formData;
    const endpoint = `http://localhost:5000/api/${userType}/login`;

    if (!validateEmail(email)) {
      setError("Érvénytelen email formátum.");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("A jelszónak legalább 6 karakter hosszúnak kell lennie.");
      setLoading(false);
      return;
    }

    try {
      const requestBody =
        userType === "tanar" ? { email, jelszo: password } : { email, password };

      const response = await axios.post(endpoint, requestBody, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userEmail", email);
        navigate("/dashboard");
      } else {
        setError("Bejelentkezés sikertelen. Token nem található.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Váratlan hiba történt.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow bg-white"
        style={{ width: "350px" }}
      >
        <h2 className="text-center mb-4">Bejelentkezés</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Group className="mb-3">
          <Form.Label>E-mail cím</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Jelszó</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Felhasználói típus</Form.Label>
          <div>
            <Form.Check
              type="radio"
              label="Diák"
              name="userType"
              value="diak"
              checked={formData.userType === "diak"}
              onChange={handleChange}
              inline
            />
            <Form.Check
              type="radio"
              label="Tanár"
              name="userType"
              value="tanar"
              checked={formData.userType === "tanar"}
              onChange={handleChange}
              inline
            />
          </div>
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100" disabled={loading}>
          {loading ? (
            <>
              <Spinner as="span" animation="border" size="sm" className="me-2" />
              Bejelentkezés...
            </>
          ) : (
            "Bejelentkezés"
          )}
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
