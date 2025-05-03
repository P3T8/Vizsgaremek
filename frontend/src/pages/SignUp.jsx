import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    tanar_id: "", // Tanároknál ez szükséges
    diak_id: "", // Diákoknál ez szükséges
    t_nev: "", // Tanárok neve
    d_nev: "", // Diákok neve
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
    isTeacher: false, // Eldönthetjük, hogy tanár vagy diák
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
      // Ha tanár regisztrációról van szó
      if (formData.isTeacher) {
        const response = await axios.post("http://localhost:5000/tanar", {
          tanar_id: formData.tanar_id,
          t_nev: formData.t_nev,
          email: formData.email,
          username: formData.username,
          password: formData.password,
        });

        if (response.data.t_nev) {
          alert("Tanár regisztráció sikeres!");
          navigate("/login");
        } else {
          setError("Hiba történt a tanár regisztrációja során.");
        }
      } else {
        // Diák regisztráció
        const response = await axios.post("http://localhost:5000/diak", {
          diak_id: formData.diak_id,
          d_nev: formData.d_nev,
          email: formData.email,
          username: formData.username,
          password: formData.password,
        });

        if (response.data.d_nev) {
          alert("Diák regisztráció sikeres!");
          navigate("/login");
        } else {
          setError("Hiba történt a diák regisztrációja során.");
        }
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
      <Form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-white" style={{ width: "350px" }}>
        <h2>{formData.isTeacher ? "Tanár Regisztráció" : "Diák Regisztráció"}</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        {/* Tanár regisztrációs mezők */}
        {formData.isTeacher ? (
          <Form.Group className="mb-3">
            <Form.Label>Tanár ID:</Form.Label>
            <Form.Control
              type="text"
              name="tanar_id"
              value={formData.tanar_id}
              onChange={handleChange}
              required
            />
          </Form.Group>
        ) : (
          <Form.Group className="mb-3">
            <Form.Label>Diák ID:</Form.Label>
            <Form.Control
              type="text"
              name="diak_id"
              value={formData.diak_id}
              onChange={handleChange}
              required
            />
          </Form.Group>
        )}

        {/* Név mező */}
        <Form.Group className="mb-3">
          <Form.Label>{formData.isTeacher ? "Tanár Név" : "Diák Név"}:</Form.Label>
          <Form.Control
            type="text"
            name={formData.isTeacher ? "t_nev" : "d_nev"}
            value={formData.isTeacher ? formData.t_nev : formData.d_nev}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* E-mail mező */}
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

        {/* Felhasználónév mező */}
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

        {/* Jelszó mező */}
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

        {/* Jelszó megerősítése */}
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

        {/* Felhasználói feltételek elfogadása */}
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

        {/* Regisztrációs gomb */}
        <div className="d-flex justify-content-between">
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Regisztrálás..." : "Regisztráció"}
          </Button>
          <Button variant="secondary" onClick={() => navigate("/login")}>
            Bejelentkezés
          </Button>
        </div>

        {/* Választási lehetőség tanár vagy diák között */}
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
