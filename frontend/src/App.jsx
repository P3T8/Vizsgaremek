import './App.css';
import { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../src/pages/Login";
import SignUp from "../src/pages/SignUp";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isRegistered, setIsRegistered] = useState(true); // Új állapot regisztráció ellenőrzésére
  const suggestions = ["Home", "Selection", "About"];
  
  const filteredSuggestions = searchTerm
    ? suggestions.filter(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  const handleLoginClick = () => {
    setIsLogin(true);
    setShowModal(true);
  };

  const handleSignUpClick = () => {
    setIsLogin(false);
    setShowModal(true);
  };

  return (
    <div className="d-flex flex-column min-vh-100 w-100">
      <header>
        <Navbar expand="lg" bg="dark" variant="dark" className="w-100">
          <Container fluid>
            <Nav>
              <NavDropdown title="Main" id="basic-nav-dropdown">
                {suggestions.map((item, index) => (
                  <NavDropdown.Item key={index} href="#">{item}</NavDropdown.Item>
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
                  className="form-control"
                />
                {filteredSuggestions.length > 0 && (
                  <ul className="list-group position-absolute w-100 mt-1 shadow">
                    {filteredSuggestions.map((suggestion, index) => (
                      <li 
                        key={index} 
                        className="list-group-item" 
                        onClick={() => { setSearchTerm(suggestion); }}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </Form>
            </Navbar.Collapse>
            <Button variant="outline-light" className="ms-auto" onClick={handleLoginClick}>
              Login
            </Button>
            <Button variant="outline-light" className="ms-2" onClick={handleSignUpClick}>
              Sign Up
            </Button>
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
            </a>
          </p>
        </Container>
      </footer>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isLogin ? "Bejelentkezés" : "Regisztráció"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-3">
          {isLogin ? <Login /> : <SignUp />}
        </Modal.Body>
      </Modal>
    </div>
  );
}



export default App;