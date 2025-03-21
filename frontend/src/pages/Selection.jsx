import { useState } from 'react';
import { Container, Row, Col, Button, Card, Collapse } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

function Selection() {
  const [openFAQ, setOpenFAQ] = useState(null);
  
  const services = [
    { title: "Featured Selection", description: "Explore our latest and best selections of services." },
    { title: "Top Rated", description: "Check out the most popular services available." },
    { title: "Newest Offers", description: "Discover the newest services added to our platform." },
    { title: "Popular Services", description: "See what services are trending among users." },
    { title: "Recommended Teachers", description: "Find top-rated teachers recommended by others." }
  ];

  return (
    <Container fluid>
      <Row className="g-4 justify-content-center my-5">
        {services.map((service, index) => (
          <Col md="6" lg="4" key={index} className="d-flex align-items-stretch">
            <Card className="shadow w-100">
              <Card.Img variant="top" src="https://via.placeholder.com/300x180" alt="Example" />
              <Card.Body>
                <Card.Title>{service.title}</Card.Title>
                <Card.Text>{service.description}</Card.Text>
                <Button 
                  variant="primary" 
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  aria-controls={`faq-${index}`}
                  aria-expanded={openFAQ === index}
                >
                  Learn More
                </Button>
                <Collapse in={openFAQ === index}>
                  <div id={`faq-${index}`} className="mt-3">
                    <p className="text-muted">This is the FAQ section for {service.title}. Here you can find common questions and answers related to this service.</p>
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
