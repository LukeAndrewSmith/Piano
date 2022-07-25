import * as React from "react"
import Dropdown from "react-bootstrap/Dropdown"
import { Link } from "gatsby"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = ({ title }) => {
    return (
        <Navbar bg="light" expand="lg" style={{ maxHeight: '64px' }} >
          <Container>
            <Navbar.Brand href="#home">{title}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#link">Help</Nav.Link>
                <Nav.Link href="#link">Midi Device</Nav.Link>
                <NavDropdown title="Navigation" id="basic-nav-dropdown">
                    <NavDropdown.Item><Link style={{ color: 'inherit', textDecoration: 'none' }} to="/exercise-analysis">Exercise Analysis</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link style={{ color: 'inherit', textDecoration: 'none' }} to="/">(Pedal Analysis)</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link style={{ color: 'inherit', textDecoration: 'none' }} to="/">(Chord Analysis)</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link style={{ color: 'inherit', textDecoration: 'none' }} to="/">(Piece Analysis)</Link></NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}

export default Header
