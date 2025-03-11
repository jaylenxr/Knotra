/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function NavBar() {
  const { user } = useAuth();

  return (
    <Navbar expand="lg" bg="light" variant="light" className="sidebar" style={{ paddingLeft: '15px' }}>
      <Container>
        <Link href="/" className="navbar-brand" style={{ fontWeight: 'bold', color: '#00BF67' }}>
          Knotra
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link href={`/profile/${user.uid}`} className="nav-link" style={{ color: '#3E5D43' }}>
              My Profile
            </Link>
            <Link href="/log/new" className="nav-link" style={{ color: '#3E5D43' }}>
              New Log
            </Link>
            <Link href="/favorites" className="nav-link" style={{ color: '#3E5D43' }}>
              Favorites
            </Link>
            <Link href="/public" className="nav-link" style={{ color: '#3E5D43' }}>
              Public Logs
            </Link>
          </Nav>

          <Button variant="outline-success" onClick={signOut} style={{ borderColor: '#00BF67', color: '#00BF67' }}>
            Sign Out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
