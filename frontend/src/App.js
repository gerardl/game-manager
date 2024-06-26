import './App.css';
import Header from './components/TopNav'
import MessageToast from './components/MessageToast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import Characters from './views/Characters'
import ManageCharacter from './views/ManageCharacter';
import Npcs from './views/Npcs';
import ManageNpc from './views/ManageNpc';
import Container from 'react-bootstrap/esm/Container';
import AccountService from './services/account-service';
import { useEffect, useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  
  useEffect(() => {
    AccountService.isAuthenticated().then(response => {
        setIsAuthenticated(response.data.success)
        if (response.data.success) setUsername(response.data.user.username)
    }).catch(error => {
        alert(`Error: ${error.response.data}`)
    })
  })

  return (
    <div className="App">
      <Router>
        <Header authenticated={isAuthenticated} onAuthChange={setIsAuthenticated} username={username} />
        <Container className='nav-margin'>
          <MessageToast message="test" bg="warning" show={false}/>
          <Routes>
            <Route path="" element={<Home />}></Route>
            <Route path="/characters" element={<Characters />}></Route>
            <Route path="/characters/manage/:name?" element={<ManageCharacter />}></Route>
            <Route path="/npcs" element={<Npcs />}></Route>
            <Route path="/npcs/manage/:name?" element={<ManageNpc />}></Route>
            <Route path="/login" element={<Login authenticated={isAuthenticated} onAuthChange={setIsAuthenticated} />}></Route>
            <Route path="/register" element={<Register authenticated={isAuthenticated} onAuthChange={setIsAuthenticated} />}></Route>
          </Routes>
          <div className="mt-5"></div>
        </Container>
        <Container>
          <footer className="d-flex flex-wrap justify-content-between align-items-center py-2 my-2 border-top">
            <div className="col-md-4 d-flex align-items-center">
              <span className="mb-3 mb-md-0 text-muted">&copy; 2023 Gerard Lucas</span>
            </div>
            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
              <li className="ms-3"><a className="text-muted" href="https://github.com/gerardl/" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a></li>
            </ul>
          </footer>
        </Container>
      </Router>
    </div>
  );
}

export default App;
