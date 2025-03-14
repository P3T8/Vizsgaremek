import { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Row, Col, Form, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

function About() {
  const [searchTerm, setSearchTerm] = useState("");
  const suggestions = ["Home", "Selection", "About"];
  
  const filteredSuggestions = searchTerm
    ? suggestions.filter(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  return (
    <div className="d-flex flex-column min-vh-100 w-100">
      <header>
        <Navbar expand="lg" bg="dark" variant="dark" className="w-100">
          <Container fluid>
            <Nav>
              <NavDropdown title="Main" id="basic-nav-dropdown">
                {suggestions.slice(0, 3).map((item, index) => (
                  <NavDropdown.Item key={index} href="#" onClick={() => window.location.reload()}>
                    {item}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
              <Form className="position-relative w-50">
                <Form.Control 
                  type="search" 
                  placeholder="Search" 
                  aria-label="Search" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {filteredSuggestions.length > 0 && (
                  <ul className="list-group position-absolute w-100 mt-1 shadow">
                    {filteredSuggestions.map((suggestion, index) => (
                      <li key={index} className="list-group-item" onClick={() => setSearchTerm(suggestion)}>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </Form>
            </Navbar.Collapse>
            <Button variant="outline-light" className="ms-auto">Login</Button>
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
        <Container fluid>
          <p className="text-center text-white"> &copy; 2025 Our Website for teacher searching! <br/>
            <a href="https://github.com/P3T8/Vizsgaremek.git" target="_blank" rel="noopener noreferrer"><br/>
              <img src="https://github.com/P3T8.png" alt="GitHub Profile" width="50" height="50" className="rounded-circle"/>
            </a>
          </p>
        </Container>
      </footer>
    </div>
  );
}

export default About;
