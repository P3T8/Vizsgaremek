import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"; // Az axios importálása
import { useHistory } from "react-router-dom"; // React Router Hook a navigáláshoz

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [error, setError] = useState(""); // Hibakezelés
  const [loading, setLoading] = useState(false); // Betöltési állapot

  const history = useHistory(); // React Router history hook

  // A felhasználói input változások figyelése
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // A regisztrációs kérés kezelése
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
    setError(""); // Reseteljük a hibát a kérés előtt

    try {
      // API kérés a backendhez
      const response = await axios.post("http://localhost:5000/api/register", formData);

      // Ha a regisztráció sikeres
      if (response.data.success) {
        console.log("Sikeres regisztráció:", response.data);
        alert("Regisztráció sikeres!");
        // Átirányítjuk a felhasználót a bejelentkezés oldalra
        history.push("/login");
      } else {
        setError("Hiba történt a regisztráció során.");
      }
    } catch (error) {
      setError("Hiba történt a regisztráció során.");
      console.error("SignUp failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-70">
      <Form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow bg-white"
        style={{ width: "350px" }}
      >
        <h2>Regisztráció</h2>

        {/* Hibák megjelenítése, ha vannak */}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Group className="mb-3">
          <Form.Label>Név:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

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
          <Button
            variant="secondary"
            onClick={() => history.push("/login")}  // Bejelentkezés oldalra navigálás
          >
            Bejelentkezés
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default SignUp;
