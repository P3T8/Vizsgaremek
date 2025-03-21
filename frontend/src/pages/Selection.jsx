import { useState } from 'react';
import { Container, Row, Col, Button, Card, Collapse } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

function Selection() {
  // Állapot a GYIK (Gyakran Ismételt Kérdések) megnyitásának kezelésére
  const [openFAQ, setOpenFAQ] = useState(null);
  
  // Szolgáltatások listája
  const services = [
    { title: "Kiemelt válogatás", description: "Fedezd fel a legújabb és legjobb szolgáltatásokat." },
    { title: "Legjobbra értékeltek", description: "Tekintsd meg a legnépszerűbb szolgáltatásokat." },
    { title: "Legújabb ajánlatok", description: "Ismerd meg a legfrissebb szolgáltatásokat a platformon." },
    { title: "Népszerű szolgáltatások", description: "Nézd meg, mely szolgáltatások trendik a felhasználók körében." },
    { title: "Ajánlott tanárok", description: "Találd meg a legjobbra értékelt tanárokat." }
  ];

  return (
    <Container fluid>
      <Row className="g-4 justify-content-center my-5">
        {/* Szolgáltatások kártyái */}
        {services.map((service, index) => (
          <Col md="6" lg="4" key={index} className="d-flex align-items-stretch">
            <Card className="shadow w-100">
              <Card.Img variant="top" src="https://via.placeholder.com/300x180" alt="Example" />
              <Card.Body>
                <Card.Title>{service.title}</Card.Title>
                <Card.Text>{service.description}</Card.Text>
                {/* GYIK szakasz kezelése */}
                <Button 
                  variant="primary" 
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  aria-controls={`faq-${index}`}
                  aria-expanded={openFAQ === index}
                >
                  Tudj meg többet
                </Button>
                <Collapse in={openFAQ === index}>
                  <div id={`faq-${index}`} className="mt-3">
                    <p className="text-muted">Ez a {service.title} GYIK szakasza. Itt megtalálod a leggyakoribb kérdéseket és válaszokat ezzel a szolgáltatással kapcsolatban.</p>
                  </div>
                </Collapse>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Selection;
