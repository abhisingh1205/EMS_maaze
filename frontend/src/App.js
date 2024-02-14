import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from './components/Home'
import Profile from './components/Profile'
import Tasks from './components/Tasks'


function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" exact Component={Login} />

            <Route path="/register" Component={Register} />
            <Route path="/login" Component={Login} />
            <Route path="/logout" Component={Login} />
            <Route path="/home" Component={Home} />
            <Route path="/profile" Component={Profile} />
            <Route path="/tasks" Component={Tasks} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
