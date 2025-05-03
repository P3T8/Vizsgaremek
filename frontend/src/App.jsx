import './App.css';
import { useState } from 'react';
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsSun, BsMoon } from 'react-icons/bs';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Selection from './pages/Selection';
import About from './pages/About';

// AppLayout komponens
function AppLayout({ toggleDarkMode, darkMode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const suggestions = ['Home', 'Selection', 'About'];

  const handleNavigation = (page) => {
    navigate(page === 'Home' ? '/' : `/${page.toLowerCase()}`);
    setSearchTerm('');
  };

  const handleKeyDown = (e, suggestion) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNavigation(suggestion);
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar expand="lg" bg="primary" variant="dark" className="w-100">
        <Container fluid>
          <Navbar.Brand href="/">Teacher Search</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Menu" id="basic-nav-dropdown">
                {suggestions.map((item) => (
                  <NavDropdown.Item
                    key={item}
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
              {searchTerm && (
                <ul className="list-group position-absolute w-100 mt-1 shadow">
                  {suggestions
                    .filter((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((suggestion) => (
                      <li
                        key={suggestion}
                        className="list-group-item list-group-item-action"
                        role="option"
                        tabIndex={0}
                        onClick={() => handleNavigation(suggestion)}
                        onKeyDown={(e) => handleKeyDown(e, suggestion)}
                        aria-label={`Navigate to ${suggestion}`}
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
            <Button
              variant="outline-light"
              className="ms-2"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button
              variant="outline-light"
              className="ms-2"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Oldalak */}
      <main className="flex-grow-1 w-100 d-flex justify-content-center align-items-center">
        <Container fluid>
          <Routes>
            <Route
              path="/"
              element={
                <Row className="px-4 my-5 justify-content-center">
                  <Col sm={8} className="text-center">
                    <h1 className="fw-light">Home</h1>
                    <p className="mt-4">Welcome to our homepage!</p>
                  </Col>
                </Row>
              }
            />
            <Route path="/selection" element={<Selection />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Container>
      </main>

      {/* Lábléc */}
      <footer className="py-4 mt-auto w-100 bg-primary text-white">
        <Container fluid>
          <p className="text-center">
            <a
              href="https://github.com/P3T8"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <img
                src="https://github.com/P3T8.png?size=60"
                alt="GitHub Profile"
                width="60"
                height="60"
                className="rounded-circle"
              />
            </a>
            <br />
            © 2025 Teacher Search Platform
          </p>
        </Container>
      </footer>
    </>
  );
}

// App komponens
function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Bootstrap sötét mód alkalmazása
  document.documentElement.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light');

  return (
    <div className="d-flex flex-column min-vh-100 w-100">
      <Router>
        <AppLayout
          toggleDarkMode={() => setDarkMode(!darkMode)}
          darkMode={darkMode}
        />
      </Router>
    </div>
  );
}

export default App;