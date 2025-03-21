import { useState } from 'react';
import { Container, Navbar, Nav, NavDropdown, Row, Col, Button, Card, Modal } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../pages/Login";

function Selection() {
  const [showModal, setShowModal] = useState(false);
  const services = [
    { title: "Featured Selection", description: "Explore our latest and best selections of services." },
    { title: "Top Rated", description: "Check out the most popular services available." },
    { title: "Newest Offers", description: "Discover the newest services added to our platform." },
    { title: "Popular Services", description: "See what services are trending among users." },
    { title: "Recommended Teachers", description: "Find top-rated teachers recommended by others." }
  ];

  return (
    <div className="d-flex flex-column min-vh-100 w-100">
      <header>
        <Navbar expand="lg" bg="dark" variant="dark" className="w-100">
          <Container fluid>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title="Menu" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#">Home</NavDropdown.Item>
                  <NavDropdown.Item href="#">Selection</NavDropdown.Item>
                  <NavDropdown.Item href="#">About</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Button variant="outline-light" className="ms-2" onClick={() => setShowModal(true)}>
                Login
              </Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <main className="flex-grow-1 w-100 d-flex justify-content-center align-items-center">
        <Container fluid>
          <Row className="px-4 my-5 justify-content-center">
            <Col sm="8" className="text-center">
              <h1 className="font-weight-light">Selection</h1>
              <p className="mt-4">Browse our selection of services.</p>
            </Col>
          </Row>
          <Row className="g-4">
            {services.map((service, index) => (
              <Col md="6" lg="4" key={index} className="d-flex align-items-stretch">
                <Card className="shadow w-100">
                  <Card.Img variant="top" src="https://via.placeholder.com/300x180" alt="Example" />
                  <Card.Body>
                    <Card.Title>{service.title}</Card.Title>
                    <Card.Text>{service.description}</Card.Text>
                    <Button variant="primary">Learn More</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </main>

      <footer className="py-5 mt-auto bg-dark w-100">
        <Container fluid>
          <p className="text-center text-white">
            &copy; 2025 Our Website for teacher searching! <br/>
            <a href="https://github.com/P3T8/Vizsgaremek.git" target="_blank" rel="noopener noreferrer"> <br />
              <img src="https://github.com/P3T8.png" alt="GitHub Profile" width="50" height="50" className="rounded-circle"/>
            </a>
          </p>
        </Container>
      </footer>

      {/* Modal for Login */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Bejelentkezés</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-3">
          <Login />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Selection;
