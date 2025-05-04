import './App.css';
import { useState, useEffect } from 'react';
import { Container, Navbar, Nav, NavDropdown, Form, Button, Image, Dropdown, Row, Col } from 'react-bootstrap';
import { BsSun, BsMoon } from 'react-icons/bs';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Selection from './pages/Selection';
import About from './pages/About';

// AppNavbar: Navbar a bejelentkezett felhasználóval és sötét móddal
function AppNavbar({ darkMode, toggleDarkMode, searchTerm, setSearchTerm, subjects }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('userEmail');
    if (token && email) {
      setIsLoggedIn(true);
      setUserEmail(email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserEmail('');
    navigate('/');
  };

  const handleNavigation = (subject) => {
    navigate(`/selection?subject=${encodeURIComponent(subject)}`);
    setSearchTerm('');
  };

  const handleKeyDown = (e, subject) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNavigation(subject);
    }
  };

  return (
    <Navbar expand="lg" bg="primary" variant="dark" className="w-100">
      <Container fluid>
        <Navbar.Brand href="/">Teacher Search</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => navigate('/')}>Home</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/selection')}>Selection</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/about')}>About</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Form className="position-relative mx-auto w-50">
            <Form.Control
              type="search"
              placeholder="Keresés tantárgy szerint..."
              aria-label="Search by subject"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <ul className="list-group position-absolute w-100 mt-1 shadow z-3">
                {subjects
                  .filter((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((subject) => (
                    <li
                      key={subject}
                      className="list-group-item list-group-item-action"
                      role="option"
                      tabIndex={0}
                      onClick={() => handleNavigation(subject)}
                      onKeyDown={(e) => handleKeyDown(e, subject)}
                    >
                      {subject}
                    </li>
                  ))}
              </ul>
            )}
          </Form>

          <Button variant="outline-light" className="ms-2" onClick={toggleDarkMode}>
            {darkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
          </Button>

          {isLoggedIn ? (
            <Dropdown align="end" className="ms-3">
              <Dropdown.Toggle variant="light" id="avatar-dropdown">
                <Image
                  src="https://www.gravatar.com/avatar?d=mp"
                  roundedCircle
                  width="30"
                  height="30"
                  className="me-2"
                  alt="Avatar"
                />
                {userEmail}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate('/dashboard')}>Profil</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Kijelentkezés</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <>
              <Button variant="outline-light" className="ms-2" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button variant="outline-light" className="ms-2" onClick={() => navigate('/signup')}>
                Sign Up
              </Button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

// AppLayout: Az oldal tartalom része, ami dinamikusan változik a Route-októl függően
function AppLayout({ toggleDarkMode, darkMode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const subjects = ['Matematika', 'Fizika', 'Kémia', 'Biológia', 'Történelem', 'Irodalom', 'Angol', 'Informatika'];

  return (
    <>
      <AppNavbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        subjects={subjects}
      />
      <main className="flex-grow-1 w-100 d-flex justify-content-center align-items-center">
        <Container fluid>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/selection" element={<Selection />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Container>
      </main>
      <footer className="py-4 mt-auto w-100 bg-primary text-white">
        <Container fluid>
          <p className="text-center">
            <a href="https://github.com/P3T8" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
              <img src="https://github.com/P3T8.png?size=60" alt="GitHub Profile" width="60" height="60" className="rounded-circle" />
            </a>
            <br />
            © 2025 Teacher Search Platform
          </p>
        </Container>
      </footer>
    </>
  );
}

// Home Component (placeholder)
const Home = () => (
  <Row className="px-4 my-5 justify-content-center">
    <Col sm={8} className="text-center">
      <h1 className="fw-light">Home</h1>
      <p className="mt-4">Welcome to our homepage!</p>
    </Col>
  </Row>
);

// App: Fő komponens, amely az alkalmazás állapotát és sötét módot kezeli
function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Bootstrap sötét mód alkalmazása
  document.documentElement.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light');

  return (
    <div className="d-flex flex-column min-vh-100 w-100">
      <Router>
        <AppLayout toggleDarkMode={() => setDarkMode(!darkMode)} darkMode={darkMode} />
      </Router>
    </div>
  );
}

export default App;
