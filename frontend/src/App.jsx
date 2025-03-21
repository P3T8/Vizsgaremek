import './App.css';
import { useState, useMemo } from 'react';
import { Container, Nav, Navbar, NavDropdown, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../src/pages/Login";
import SignUp from "../src/pages/SignUp";
import Selection from '../src/pages/Selection'; 
import About from './pages/About';

function App() {
  // Állapotok a keresési kifejezéshez, modális ablakhoz és az aktív oldal nyomon követéséhez
  const [searchTerm, setSearchTerm] = useState(""); // Keresőmező beviteli állapota
  const [showModal, setShowModal] = useState(false); // Bejelentkező/regisztrációs modális megjelenítés állapota
  const [isLogin, setIsLogin] = useState(true); // Bejelentkezési vagy regisztrációs mód váltása
  const [activePage, setActivePage] = useState("Home"); // Aktív oldal állapota

  // Menüelemek listája
  const suggestions = ["Home", "Selection", "About"];

  // Szűrt találatok keresés alapján (useMemo optimalizálás miatt, hogy ne számolódjon újra minden rendereléskor)
  const filteredSuggestions = useMemo(() => 
    searchTerm ? suggestions.filter(s => s.toLowerCase().includes(searchTerm.toLowerCase())) : [],
    [searchTerm, suggestions]
  );

  // Oldalváltás funkció, amely törli a keresési kifejezést
  const handleNavigation = (page) => {
    setActivePage(page);
    setSearchTerm(""); 
  };

  // Bejelentkező modális megnyitása
  const handleLoginClick = () => {
    setIsLogin(true);
    setShowModal(true);
  };

  // Regisztrációs modális megnyitása
  const handleSignUpClick = () => {
    setIsLogin(false);
    setShowModal(true);
  };

  return (
    <>
      {/* Fejléc */}
      <header>
        <Navbar expand="lg" bg="dark" variant="dark" className="w-100">
          <Container fluid>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title="Menu" id="basic-nav-dropdown">
                  {/* Menüelemek dinamikus létrehozása */}
                  {suggestions.map((item) => (
                    <NavDropdown.Item
                      key={item}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(item);
                      }}
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
                {/* Keresési javaslatok megjelenítése */}
                {filteredSuggestions.length > 0 && (
                  <ul className="list-group position-absolute w-100 mt-1 shadow" style={{ zIndex: 1000 }}>
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
              <div className="mt-4">
                {/* Az aktív oldalnak megfelelő komponens megjelenítése */}
                {activePage === "Home" && <p>Welcome to our homepage!</p>}
                {activePage === "Selection" && <Selection />}
                {activePage === "About" && <About/>}
              </div>
            </Col>
          </Row>
        </Container>
      </main>

      {/* Lábléc */}
      <footer className="py-5 mt-auto bg-dark w-100">
        <Container fluid>
          <p className="text-center text-white">
            &copy; 2025 Our Website for teacher searching! <br />
            <a href="https://github.com/P3T8/Vizsgaremek.git" target="_blank" rel="noopener noreferrer"><br/>
              <img src="https://github.com/P3T8.png" alt="GitHub Profile" width="50" height="50" className="rounded-circle" />
            </a>
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
    </>
  );
}

export default App;
