import { useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import ballMirage from "../img/Ball-Mirage.png";

function About() {
  // Állapot a GYIK (Gyakran Ismételt Kérdések) láthatóságának kezelésére
  const [faqVisible, setFaqVisible] = useState([false, false]);

  // Adminisztrátorok adatai
  const admins = [
    { name: "Baracskai Angyalka", email: "barang600@logiker.hu", phone: "123-456-7890" },
    { name: "Maráczi Péter", email: "marpet334@logiker.hu", phone: "+36-30-173-3442" }
  ];

  return (
    <Container fluid className="d-flex flex-column align-items-center min-vh-100" style={{ margin: "0 auto", padding: "0", marginBottom: "0" }}>
      <Row className="g-4 w-100 justify-content-center">
        {/* Adminisztrátorok kártyái */}
        {admins.map((admin, index) => (
          <Col md="6" key={index} className="d-flex align-items-stretch">
            <Card className="shadow w-100 text-center">
              <Card.Img variant="top" src={ballMirage} alt="Admin Profile pictures" className="rounded-circle mx-auto mt-3" style={{ width: "120px", height: "120px" }} />
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
  );
}

export default About;
