import './App.css';
import Header from './components/TopNav'
import LoginForm from './components/LoginForm'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './views/Home';
import Container from 'react-bootstrap/esm/Container';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Container className='mt-3'>
          <Routes>
            <Route exact path="/" element={<Home />}>
            </Route>
            <Route path="/about" element={<h1>About</h1>}></Route>
            <Route path="/login" element={<LoginForm />}></Route>
          </Routes>
        </Container>
      </Router>
    </div>
  );
}

export default App;
