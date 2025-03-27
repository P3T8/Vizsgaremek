import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"; // Az axios importálása
import { useHistory } from "react-router-dom"; // React Router Hook a navigáláshoz

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(""); // Hibakezelés
  const [loading, setLoading] = useState(false); // Betöltési állapot kezelés

  const history = useHistory(); // React Router history hook

  // A felhasználói input változások figyelése
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // A bejelentkezési kérés kezelése
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reseteljük a hibát a kérés előtt

    try {
      // API kérés a backendhez
      const response = await axios.post("http://localhost:5000/api/login", credentials);

      // Ha a bejelentkezés sikeres
      if (response.data.success) {
        console.log("Bejelentkezve:", response.data);
        alert("Sikeres bejelentkezés!");
        // Átirányítjuk a felhasználót a főoldalra vagy dashboard-ra
        history.push("/dashboard");
      } else {
        // Hibás bejelentkezés esetén
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

        {/* Hibák megjelenítése, ha vannak */}
        {error && <Alert variant="danger">{error}</Alert>}

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
            <Button variant="outline-primary" type="button" onClick={() => history.push("/signup")}>
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
