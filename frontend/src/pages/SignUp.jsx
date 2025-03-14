import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Sign-up successful!");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-70">
      <Form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-white" style={{ width: '350px' }}>
        <Form.Group className="mb-3">
          <Form.Label>Név:</Form.Label>
          <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>E-mail:</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Felhasználónév:</Form.Label>
          <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Jelszó:</Form.Label>
          <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Jelszó újra:</Form.Label>
          <Form.Control type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
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
          <Button type="submit" variant="primary">Sign Up</Button>
          <Button variant="secondary">Log In</Button>
        </div>
      </Form>
    </Container>
  );
}

export default SignUp;
