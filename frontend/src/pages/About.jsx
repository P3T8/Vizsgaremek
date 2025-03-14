import './App.css';
import { Button, Container, Nav, Navbar, NavDropdown, Row, Col } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

function About() {
  return (
    <div className="d-flex flex-column min-vh-100 w-100">
      <header>
        <Navbar expand="lg" bg="dark" variant="dark" className="w-100">
          <Container fluid>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title="Main" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#" onClick={() => window.location.reload()}>Home</NavDropdown.Item>
                  <NavDropdown.Item href="#" onClick={() => window.location.reload()}>Selection</NavDropdown.Item>
                  <NavDropdown.Item href="#" onClick={() => window.location.reload()}>About</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main className="flex-grow-1 w-100 d-flex justify-content-center align-items-center">
        <Container fluid>
          <Row className="px-4 my-5 justify-content-center">
            <Col sm="8" className="text-center">
              <h1 className="font-weight-light">Welcome</h1>
              <p className="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores sed odit, nisi fuga facilis ab, nemo amet neque cum assumenda omnis harum! Aut facilis nam quod cupiditate. Consequatur, dignissimos dolor?</p>
            </Col>
          </Row>
        </Container>
      </main>
      <footer className="py-5 mt-auto bg-dark w-100">
        <Container fluid className='px-8'>
        <p className="text-center text-white"> &copy; 2025 Our Website for teacher searching! <br/>
            <a href="https://github.com/P3T8/Vizsgaremek.git" target="_blank" rel="noopener noreferrer"><br/>
              <img src="https://github.com/P3T8.png" alt="GitHub Profile" width="50" height="50" className="rounded-circle"/>
            </a></p>
        </Container>
      </footer>
    </div>
  );
}

export default About;