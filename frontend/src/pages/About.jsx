import { useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

function About() {
  const [faqVisible, setFaqVisible] = useState([false, false]);

  const admins = [
    { name: "John Doe", email: "johndoe@example.com", phone: "123-456-7890" },
    { name: "Jane Smith", email: "janesmith@example.com", phone: "987-654-3210" }
  ];

  const toggleFaq = (index) => {
    setFaqVisible(prev => prev.map((visible, i) => (i === index ? !visible : visible)));
  };

  return (
    <Container fluid className="d-flex flex-column align-items-center min-vh-100" style={{ margin: "0px auto", padding: "0px auto", marginBottom: "0px" }}>
      <Row className="g-4 w-100 justify-content-center">
        {admins.map((admin, index) => (
          <Col md="6" key={index} className="d-flex align-items-stretch">
            <Card className="shadow w-100 text-center">
              <Card.Img variant="top" src="https://via.placeholder.com/150" alt="Profile" className="rounded-circle mx-auto mt-3" style={{ width: "120px", height: "120px" }} />
              <Card.Body>
                <Card.Text><strong>Name:</strong> {admin.name}</Card.Text>
                <Card.Text><strong>E-mail:</strong> {admin.email}</Card.Text>
                <Card.Text><strong>Tel:</strong> {admin.phone}</Card.Text>
                <Button variant="primary" onClick={() => toggleFaq(index)}>About</Button>
                {faqVisible[index] && <Card.Text className="mt-2">More information about {admin.name}.</Card.Text>}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default About;
