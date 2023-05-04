import Button from 'react-bootstrap/Button'
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap'
import AccountService from '../services/account-service';
import { useNavigate } from "react-router-dom";
import { FaGamepad } from 'react-icons/fa/';
import { IconContext } from "react-icons";

function TopNav({ authenticated, onAuthChange, username }) {
  const navigate = useNavigate();

  function logOut() {
    AccountService.logOut().then(response => {
      onAuthChange(false)
      navigate('/login')
    })
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
              <FaGamepad color="aqua" fontSize="1.2em"/> 
              <span style={{marginLeft:"5px"}}>MMO Manager</span>
            </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/characters">
              <Nav.Link>Characters</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/npcs">
              <Nav.Link>NPCs</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            {authenticated ?
              <Nav.Link onClick={logOut}>Logout, {username}</Nav.Link>
              :
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNav;