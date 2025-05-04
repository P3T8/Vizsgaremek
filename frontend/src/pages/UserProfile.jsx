import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
//import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  //const navigate = useNavigate();

  // Az alapadatok betöltése a helyi tárolóból
  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    const storedName = localStorage.getItem('userName');
    
    if (storedEmail && storedName) {
      setUserEmail(storedEmail);
      setUserName(storedName);
    } else {
      setError('Nincs bejelentkezett felhasználó.');
    }
  }, []);

  // Adatok mentése
  const handleSave = () => {
    if (userEmail === '' || userName === '') {
      setError('Minden mező kitöltése kötelező!');
      return;
    }

    // Mentés a helyi tárolóba
    localStorage.setItem('userEmail', userEmail);
    localStorage.setItem('userName', userName);

    setSuccessMessage('A változtatások mentésre kerültek!');
    setIsEditing(false);
    setError('');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError('');
    setSuccessMessage('');
    // Visszaállítja az adatokat szerkesztés előttire
    setUserEmail(localStorage.getItem('userEmail') || '');
    setUserName(localStorage.getItem('userName') || '');
  };

  return (
    <Container className="my-5">
      <Row>
        <Col md={8} className="mx-auto">
          <h2 className="text-center mb-4">Felhasználói profil</h2>
          
          {/* Hibák és siker üzenetek */}
          {error && <Alert variant="danger">{error}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}

          {/* Profil adatok */}
          <Form>
            <Form.Group controlId="userName">
              <Form.Label>Név</Form.Label>
              <Form.Control
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                disabled={!isEditing}
              />
            </Form.Group>

            <Form.Group controlId="userEmail" className="mt-3">
              <Form.Label>Email cím</Form.Label>
              <Form.Control
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                disabled={!isEditing}
              />
            </Form.Group>

            <div className="mt-4 d-flex justify-content-between">
              {isEditing ? (
                <>
                  <Button variant="secondary" onClick={handleCancel}>
                    Mégse
                  </Button>
                  <Button variant="primary" onClick={handleSave}>
                    Mentés
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="primary" onClick={handleEdit}>
                    Szerkesztés
                  </Button>
                </>
              )}
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UserProfile;
