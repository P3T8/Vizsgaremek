import { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import ballMirage from "../img/Ball-Mirage.png";

function About() {
  const admins = [
    { name: "Baracskai Angyalka", email: "barang600@logiker.hu", phone: "123-456-7890" },
    { name: "Maráczi Péter", email: "marpet334@logiker.hu", phone: "+36-30-173-3442" }
  ];

  return (
    <>      
      <Container fluid className="d-flex justify-content-center align-items-center min-vh-100 p-0 mt-4 mb-4">
        <Row className="g-2 w-100 justify-content-center">
          {admins.map((admin, index) => (
            <Col md="4" key={index} className="d-flex justify-content-center">
              <Card className="shadow w-100 text-center p-3">
                <Card.Img 
                  variant="top" 
                  src={ballMirage} 
                  alt="Admin Profile pictures" 
                  className="rounded-circle mx-auto mt-3" 
                  style={{ width: "120px", height: "120px" }} 
                />
                <Card.Body>
                  <Card.Text><strong>Név:</strong> {admin.name}</Card.Text>
                  <Card.Text><strong>E-mail:</strong> {admin.email}</Card.Text>
                  <Card.Text><strong>Telefon:</strong> {admin.phone}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default About;
