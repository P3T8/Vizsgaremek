import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Véletlenszerű adatok generálása
const generateRandomData = () => {
  const randomNames = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown"];
  const randomEmails = ["teacher1@mail.com", "teacher2@mail.com", "teacher3@mail.com"];
  const randomPassword = "password123";
  const randomSchool = "Iskola ABC";
  const randomSubjects = "Matematika, Fizika";
  const randomPhone = "06123456789";
  const randomZip = "1234";
  const randomCity = "Budapest";
  const randomStreet = "Fő utca";
  const randomHouseNumber = "12";
  const randomRate = "2000 Ft/óra";
  const randomDescription = "Szakértő tanár vagyok a matematika és fizika területén.";
  const randomBankAccount = "HU12345678901234567890123456";
  const randomTaxNumber = "12345678-1-23";
  const randomIban = "HU12345678901234567890123456";
  
  return {
    t_nev: randomNames[Math.floor(Math.random() * randomNames.length)],
    email: randomEmails[Math.floor(Math.random() * randomEmails.length)],
    password: randomPassword,
    confirmPassword: randomPassword,
    school: randomSchool,
    subjects: randomSubjects,
    phone: randomPhone,
    zip: randomZip,
    city: randomCity,
    street: randomStreet,
    houseNumber: randomHouseNumber,
    rate: randomRate,
    description: randomDescription,
    bankAccount: randomBankAccount,
    taxNumber: randomTaxNumber,
    iban: randomIban,
  };
};

function SignUp() {
  const [formData, setFormData] = useState({
    t_nev: "",
    d_nev: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
    isTeacher: false,
    school: "",
    subjects: "",
    phone: "",
    zip: "",
    city: "",
    street: "",
    houseNumber: "",
    rate: "",
    description: "",
    bankAccount: "",
    taxNumber: "",
    iban: "",
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
    setError(""); // Reset error message

    try {
      let response;

      if (formData.isTeacher) {
        // Ha tanár a regisztráló, töltsük ki a mezőket random adatokká
        const teacherData = { ...formData, ...generateRandomData() };
        response = await axios.post("http://localhost:5000/api/tanar", {
          t_nev: teacherData.t_nev,
          email: teacherData.email,
          password: teacherData.password,
          school: teacherData.school,
          subjects: teacherData.subjects,
          phone: teacherData.phone,
          zip: teacherData.zip,
          city: teacherData.city,
          street: teacherData.street,
          houseNumber: teacherData.houseNumber,
          rate: teacherData.rate,
          description: teacherData.description,
          bankAccount: teacherData.bankAccount,
          taxNumber: teacherData.taxNumber,
          iban: teacherData.iban,
        });

        if (response.data.t_nev) {
          alert("Tanár regisztráció sikeres!");
          navigate("/login");
        } else {
          setError("Hiba történt a tanár regisztrációja során.");
        }
      } else {
        // Diák regisztráció
        response = await axios.post("http://localhost:5000/api/diak", {
          d_nev: formData.d_nev,
          email: formData.email,
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
      const errMessage = error.response?.data?.error || "Hiba történt a regisztráció során.";
      setError(errMessage);
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
          <>
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

            <Form.Group className="mb-3">
              <Form.Label>Iskola:</Form.Label>
              <Form.Control
                type="text"
                name="school"
                value={formData.school}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tantárgyak:</Form.Label>
              <Form.Control
                type="text"
                name="subjects"
                value={formData.subjects}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Telefonszám:</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Irányítószám:</Form.Label>
              <Form.Control
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Város:</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Utca:</Form.Label>
              <Form.Control
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Házszám:</Form.Label>
              <Form.Control
                type="text"
                name="houseNumber"
                value={formData.houseNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Díjszabás:</Form.Label>
              <Form.Control
                type="text"
                name="rate"
                value={formData.rate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Bemutatkozás:</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Bankszámla:</Form.Label>
              <Form.Control
                type="text"
                name="bankAccount"
                value={formData.bankAccount}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Adószám:</Form.Label>
              <Form.Control
                type="text"
                name="taxNumber"
                value={formData.taxNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>IBAN:</Form.Label>
              <Form.Control
                type="text"
                name="iban"
                value={formData.iban}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </>
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

        <Button type="submit" variant="primary" disabled={loading} style={{ width: "100%" }}>
          {loading ? "Regisztrálás..." : "Regisztráció"}
        </Button>

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
