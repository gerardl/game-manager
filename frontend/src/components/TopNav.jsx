import Button from 'react-bootstrap/Button'
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap'
import axios from 'axios';

function TopNav() {
  function isAuthenticated() {
    axios.get(`http://localhost:8099/api/user`, { withCredentials: true })
      .then(res => {
        console.log(res.data)
      })
  }
  function authenticate() {
    axios.post(`http://localhost:8099/api/login`, {
      username: 'userguy',
      password: 'password'
    }, { withCredentials: true }).then(res => {
      console.log(res.data)
    })
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
            <Navbar.Brand>MMO Manager</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
                <Nav.Link>About</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <Button onClick={authenticate}>Auth</Button>
            <Button onClick={isAuthenticated}>Test</Button>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNav;

// function Header() {
//     const [count, setCount] = useState(0);

//     return (
//         <div>
//             <h1>Header</h1>
//             <p>Count: {count}</p>
//             <Button onClick={() => setCount(count + 1)}>Increment</Button>
//         </div>
//     );
// }

