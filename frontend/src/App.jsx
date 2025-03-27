import './App.css';
import { useState, useMemo } from 'react';
import { Container, Nav, Navbar, NavDropdown, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { BsSun, BsMoon } from "react-icons/bs"; // Ikonok a váltáshoz
import Login from "../src/pages/Login";
import SignUp from "../src/pages/SignUp";
import Selection from '../src/pages/Selection'; 
import About from './pages/About';

function App() {
  // Állapotok
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [activePage, setActivePage] = useState("Home");
  const [darkMode, setDarkMode] = useState(false); // Dark mode állapot

  const suggestions = ["Home", "Selection", "About"];

  const filteredSuggestions = useMemo(() => 
    searchTerm ? suggestions.filter(s => s.toLowerCase().includes(searchTerm.toLowerCase())) : [],
    [searchTerm, suggestions]
  );

  const handleNavigation = (page) => {
    setActivePage(page);
    setSearchTerm("");
  };

  const handleLoginClick = () => {
    setIsLogin(true);
    setShowModal(true);
  };

  const handleSignUpClick = () => {
    setIsLogin(false);
    setShowModal(true);
  };

  return (
    <div className={`d-flex flex-column min-vh-100 w-100 ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`}>
      
      {/* Fejléc */}
      <header>
        <Navbar expand="lg" style={{ backgroundColor: "navy" }} variant="dark" className="w-100">
          <Container fluid>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
              
              {/* Menü */}
              <Nav className="me-auto">
                <NavDropdown title="Menu" id="basic-nav-dropdown">
                  {suggestions.map((item) => (
                    <NavDropdown.Item
                      key={item}
                      href="#"
                      onClick={() => handleNavigation(item)}
                      className={activePage === item ? "active text-warning" : ""}
                    >
                      {item}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              </Nav>
  
              {/* Keresőmező */}
              <Form className="position-relative mx-auto w-50">
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
                      <li
                        key={index}
                        className="list-group-item"
                        onClick={() => handleNavigation(suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </Form>
  
              {/* Dark mode váltó */}
              <Button variant="outline-light" className="ms-2" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
              </Button>
  
              {/* Bejelentkezés és regisztráció gombok */}
              <Button variant="outline-light" className="ms-auto" onClick={handleLoginClick}>
                Login
              </Button>
              <Button variant="outline-light" className="ms-2" onClick={handleSignUpClick}>
                Sign Up
              </Button>
  
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
  
      {/* Fő tartalom */}
      <main className="flex-grow-1 w-100 d-flex justify-content-center align-items-center">
        <Container fluid>
          <Row className="px-4 my-5 justify-content-center">
            <Col sm="8" className="text-center">
              <h1 className="font-weight-light">{activePage}</h1>
              <p className="mt-4">
                {activePage === "Home" ? "Welcome to our homepage!" : activePage === "Selection"}
              </p>
            </Col>
          </Row>
        </Container>
      </main>
  
      {/* Lábléc */}
      {/* Lábléc */}
<footer className="py-5 mt-auto w-100" style={{ backgroundColor: "navy", color: "white" }}>
  <Container fluid>
    <p className="text-center">
      <a href="https://github.com/P3T8/Vizsgaremek.git" target="_blank" rel="noopener noreferrer">
        <img src="https://github.com/P3T8.png" alt="GitHub Profile" width="50" height="50" className="rounded-circle"/>
      </a>
      <br />
      &copy; 2025 Our Website for teacher searching!
    </p>
  </Container>
</footer>

  
      {/* Bejelentkezési és regisztrációs modális ablak */}
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
