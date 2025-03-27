import { useState } from 'react';
import { Container, Row, Col, Button, Card, Collapse } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import ballMirage from "../img/Ball-Mirage.png"; // ✅ Import the image

function Selection() {
  // Állapot a GYIK (Gyakran Ismételt Kérdések) megnyitásának kezelésére
  const [openFAQ, setOpenFAQ] = useState(null);
  
  // Új névlista
  const people = [
    { name: "Nagy Péter", description: "Részletes információ Nagy Péterről." },
    { name: "Szabó László", description: "Részletes információ Szabó Lászlóról." },
    { name: "Kovács Eszter", description: "Részletes információ Kovács Eszterről." },
    { name: "Horváth Zoltán", description: "Részletes információ Horváth Zoltánról." },
    { name: "Tóth Anita", description: "Részletes információ Tóth Anitáról." },
    { name: "Mészáros Katalin", description: "Részletes információ Mészáros Katalinról." },
    { name: "Juhász Ferenc", description: "Részletes információ Juhász Ferencről." },
    { name: "Balogh Zsófia", description: "Részletes információ Balogh Zsófiáról." },
    { name: "Varga Béla", description: "Részletes információ Varga Béláról." },
    { name: "Kiss Judit", description: "Részletes információ Kiss Juditról." },
    { name: "Farkas Tamás", description: "Részletes információ Farkas Tamásról." }
  ];

  return (
    <Container fluid>
      <Row className="g-4 justify-content-center my-5">
        {/* Nevek kártyái */}
        {people.map((person, index) => (
          <Col md="6" lg="4" key={index} className="d-flex align-items-stretch">
            <Card className="shadow w-100 text-center">
              <Card.Img 
                variant="top" 
                src={ballMirage} // ✅ Use imported image
                alt="Profile" 
                className="rounded-circle mx-auto mt-3"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{person.name}</Card.Title>
                <Card.Text>{person.description}</Card.Text>
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
                    <p className="text-muted">További információ {person.name}-ról/ről.</p>
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
