import './App.css';
import Header from './components/TopNav'
import CharacterForm from './components/CharacterForm'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import Characters from './views/Characters'
import Container from 'react-bootstrap/esm/Container';
import AccountService from './services/account-service';
import { useEffect, useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    AccountService.isAuthenticated().then(response => {
        setIsAuthenticated(response.data.success)
        setUsername(response.data.user.username)
    }).catch(error => {
        alert(`Error: ${error.response.data}`)
    })
  })

  return (
    <div className="App">
      <Router>
        <Header authenticated={isAuthenticated} onAuthChange={setIsAuthenticated} username={username} />
        <Container className='nav-margin'>
          <Routes>
            <Route exact path="/" element={<Home />}>
            </Route>
            <Route path="/characters" element={<Characters />}></Route>
            <Route path="/characters/manage/:name?" element={<CharacterForm />}></Route>
            <Route path="/login" element={<Login authenticated={isAuthenticated} onAuthChange={setIsAuthenticated} />}></Route>
            <Route path="/register" element={<Register authenticated={isAuthenticated} onAuthChange={setIsAuthenticated} />}></Route>
          </Routes>
          <div className="mt-5"></div>
        </Container>
      </Router>
    </div>
  );
}

export default App;
