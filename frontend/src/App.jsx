import './App.css';
import { useState, useMemo } from 'react';
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  Button,
  Modal,
  Row,
  Col
} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { BsSun, BsMoon } from "react-icons/bs";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Selection from './pages/Selection';
import About from './pages/About';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

function AppLayout({
  toggleDarkMode,
  darkMode,
  handleLoginClick,
  handleSignUpClick,
  showModal,
  setShowModal,
  isLogin,

}) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const suggestions = ["Home", "Selection", "About"];
  const filteredSuggestions = useMemo(() =>
    searchTerm ? suggestions.filter(s => s.toLowerCase().includes(searchTerm.toLowerCase())) : [],
    [searchTerm]
  );

  const handleNavigation = (page) => {
    navigate(page === "Home" ? "/" : `/${page.toLowerCase()}`);
    setSearchTerm("");
  };

  return (
    <>
      {/* Navbar */}
      <Navbar expand="lg" style={{ backgroundColor: "navy" }} variant="dark" className="w-100">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Menu" id="basic-nav-dropdown">
                {suggestions.map((item) => (
                  <NavDropdown.Item
                    key={item}
                    as="div"
                    role="button"
                    tabIndex={0}
                    onClick={() => handleNavigation(item)}
                  >
                    {item}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>

            <Form className="position-relative mx-auto w-50">
              <Form.Control
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {filteredSuggestions.length > 0 && (
                <ul className="list-group position-absolute w-100 mt-1 shadow search-suggestions">
                  {filteredSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="list-group-item"
                      role="button"
                      tabIndex={0}
                      onClick={() => handleNavigation(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </Form>

            <Button variant="outline-light" className="ms-2" onClick={toggleDarkMode}>
              {darkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
            </Button>
            <Button variant="outline-light" className="ms-2" onClick={handleLoginClick}>
              Login
            </Button>
            <Button variant="outline-light" className="ms-2" onClick={handleSignUpClick}>
              Sign Up
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Oldalak */}
      <main className="flex-grow-1 w-100 d-flex justify-content-center align-items-center">
        <Container fluid>
          <Routes>
            <Route path="/" element={
              <Row className="px-4 my-5 justify-content-center">
                <Col sm="8" className="text-center">
                  <h1 className="font-weight-light">Home</h1>
                  <p className="mt-4">Welcome to our homepage!</p>
                </Col>
              </Row>
            } />
            <Route path="/selection" element={<Selection />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Container>
      </main>

      {/* Lábléc */}
      <footer className="py-4 mt-auto w-100" style={{ backgroundColor: "navy", color: "white" }}>
        <Container fluid>
          <p className="text-center">
            <a href="https://github.com/P3T8/Vizsgaremek.git" target="_blank" rel="noopener noreferrer">
              <img src="https://github.com/P3T8.png" alt="GitHub Profile" width="60" height="60" className="rounded-circle" />
            </a>
            <br />
            &copy; 2025 Our Website for teacher searching!
          </p>
        </Container>
      </footer>

      {/* Login / SignUp modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isLogin ? "Bejelentkezés" : "Regisztráció"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-3">
          {isLogin
            ? <Login closeModal={() => setShowModal(false)} />
            : <SignUp closeModal={() => setShowModal(false)} />
          }
        </Modal.Body>
      </Modal>
    </>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

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
      <Router>
        <AppLayout
          toggleDarkMode={() => setDarkMode(!darkMode)}
          darkMode={darkMode}
          handleLoginClick={handleLoginClick}
          handleSignUpClick={handleSignUpClick}
          showModal={showModal}
          setShowModal={setShowModal}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
        />
      </Router>
    </div>
  );
}

export default App;
