import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import logo from "./img/logo.png";
import "./App.css";
import Vacations from "./Vacations";

function Home() {
  return (
    <div>
      <h2>Welcome to Meadowlark Travel</h2>
      <p>
        Check out our "<Link to="/about">About</Link>" page!
      </p>
    </div>
  );
}

function About() {
  return <i>coming soon</i>;
}

function NotFound() {
  return <i>Not Found</i>;
}

function App() {
  return (
    <Router>
      <div className="container">
        <header>
          <h1>Meadowlark Travel</h1>
          <Link to="/">
            <img src={logo} alt="Meadowlark Travel Logo" />
          </Link>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/vacations" element={<Vacations />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
