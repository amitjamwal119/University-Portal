import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const SchoolNavbar = () => {
  return (
    <Navbar expand="lg" bg="light" className="border border-secondary mb-3">
      <Container>
        <Navbar.Brand as={Link} to="/">University Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas id="offcanvasNavbar" placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>University Portal</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="mx-auto">
            <Nav.Link as={Link} to="/" className="mx-3">Home</Nav.Link>
              <Nav.Link as={Link} to="/students" className="mx-3">Students</Nav.Link>
              <Nav.Link as={Link} to="/teachers" className="mx-3">Teachers</Nav.Link>
              <Nav.Link as={Link} to="/attendance" className="mx-3">Attendance</Nav.Link>
              <Nav.Link as={Link} to="/register" className="mx-3 text-primary">Register</Nav.Link>
              <Nav.Link as={Link} to="/login" className="mx-3 text-success">Login</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default SchoolNavbar;
