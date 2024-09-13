import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import Home from './home';
import About from './about';
import Login from './login';
import Signup from './signup';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  return (
    <Router>
      <div>
        <Navbar bg="primary" expand="lg" className="navbar">
          <Navbar.Brand href="/" className="navbar-brand">
            <img
              src="/images/rbc-logo.png"
              alt="RBC Logo"
              width="40"
              height="40"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
            <Nav>
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/">Services</Nav.Link>
              <Nav.Link as={Link} to="/">International</Nav.Link>
              <Nav.Link as={Link} to="/">Benefits</Nav.Link>
              <Nav.Link as={Link} to="/about">About RBC</Nav.Link>
              {isLoggedIn && (
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
              )}
            </Nav>
            <Nav className="align-items-center">
              <NavDropdown title="Contact Us" id="other-sites-dropdown">
                <NavDropdown.Item href="#site1">Find a Branch</NavDropdown.Item>
                <NavDropdown.Item href="#site2">Call 1-800-769-2511</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="EN" id="language-dropdown">
                <NavDropdown.Item href="#en">EN</NavDropdown.Item>
                <NavDropdown.Item href="#fr">FR</NavDropdown.Item>
              </NavDropdown>
              {isLoggedIn ? (
                <LogoutButton setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Button as={Link} to="/login" variant="warning" className="sign-in-button">
                  Sign In
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Login />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-links">
            <div className="footer-column">
              <p><strong>About RBC</strong></p>
              <Link to="/about">Our Company</Link>
              <Link to="/governance">Corporate Governance</Link>
              <Link to="/investor-relations">Investor Relations</Link>
              <Link to="/history">History</Link>
              <Link to="/contact">Contact Us</Link>
            </div>
            <div className="footer-column">
              <p><strong>Resources</strong></p>
              <Link to="/news">News</Link>
              <Link to="/media-newsroom">Media Newsroom</Link>
              <Link to="/thought-leadership">Thought Leadership</Link>
              <Link to="/publications">Publications</Link>
              <Link to="/esg-reporting">ESG Reporting</Link>
            </div>
            <div className="footer-column">
              <p><strong>Corporate Citizenship</strong></p>
              <Link to="/corporate-citizenship">Our Impact</Link>
              <Link to="/codes">Voluntary Codes and Public Commitments</Link>
              <Link to="/modern-slavery">Statement Regarding Modern Slavery</Link>
            </div>
            <div className="footer-column">
              <p><strong>Work with Us</strong></p>
              <Link to="/careers">Careers at RBC</Link>
              <Link to="/diversity-inclusion">Diversity & Inclusion</Link>
              <Link to="/suppliers">Become a Supplier</Link>
            </div>
          </div>
          <p>© 2024 RBC MyApp. All rights reserved.</p>
          <p><Link to="/privacy-policy">Privacy Policy</Link> | <Link to="/terms">Terms of Use</Link></p>
        </footer>
      </div>
    </Router>
  );
}

function LogoutButton({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };
  return (
    <Button variant="warning" className="sign-in-button" onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default App;
