import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    t_nev: "",
    d_nev: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
    isTeacher: false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("A jelszavak nem egyeznek meg!");
      return;
    }

    if (!formData.termsAccepted) {
      alert("El kell fogadnod a felhasználói feltételeket!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      let response;

      if (formData.isTeacher) {
        response = await axios.post("http://localhost:5000/api/tanar", {
          t_nev: formData.t_nev,
          email: formData.email,
          username: formData.username,
          password: formData.password,
        });

        console.log("Tanár regisztráció válasz:", response.data);

        if (response.data.t_nev) {
          alert("Tanár regisztráció sikeres!");
          navigate("/login");
        } else {
          setError("Hiba történt a tanár regisztrációja során.");
        }
      } else {
        response = await axios.post("http://localhost:5000/api/diak", {
          d_nev: formData.d_nev,
          email: formData.email,
          username: formData.username,
          password: formData.password,
        });

        console.log("Diák regisztráció válasz:", response.data);

        if (response.data.d_nev) {
          alert("Diák regisztráció sikeres!");
          navigate("/login");
        } else {
          setError("Hiba történt a diák regisztrációja során.");
        }
      }
    } catch (error) {
      setError(error.response?.data?.error || "Hiba történt a regisztráció során.");
      console.error("SignUp failed:", error.response || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-70">
      <Form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-white" style={{ width: "350px" }}>
        <h2>{formData.isTeacher ? "Tanár Regisztráció" : "Diák Regisztráció"}</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        {formData.isTeacher ? (
          <Form.Group className="mb-3">
            <Form.Label>Tanár Név:</Form.Label>
            <Form.Control
              type="text"
              name="t_nev"
              value={formData.t_nev}
              onChange={handleChange}
              required
            />
          </Form.Group>
        ) : (
          <Form.Group className="mb-3">
            <Form.Label>Diák Név:</Form.Label>
            <Form.Control
              type="text"
              name="d_nev"
              value={formData.d_nev}
              onChange={handleChange}
              required
            />
          </Form.Group>
        )}

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
          <Form.Label>Felhasználónév:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
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

        <Form.Group className="mb-3">
          <Form.Label>Jelszó újra:</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            name="termsAccepted"
            label="Elfogadom a felhasználói feltételeket"
            checked={formData.termsAccepted}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Regisztrálás..." : "Regisztráció"}
          </Button>
          <Button variant="secondary" onClick={() => navigate("/login")}>
            Bejelentkezés
          </Button>
        </div>

        <Form.Group className="mt-3">
          <Form.Check
            type="radio"
            name="isTeacher"
            label="Tanár"
            checked={formData.isTeacher}
            onChange={() => setFormData({ ...formData, isTeacher: true })}
          />
          <Form.Check
            type="radio"
            name="isTeacher"
            label="Diák"
            checked={!formData.isTeacher}
            onChange={() => setFormData({ ...formData, isTeacher: false })}
          />
        </Form.Group>
      </Form>
    </Container>
  );
}

export default SignUp;
