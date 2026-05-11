// src/App.js
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cows from "./pages/Cows";
import "./index.css";

// Component to handle hash scrolling when coming from cows page
const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.slice(1);
      // Wait for DOM to be ready
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          const offsetTop = section.offsetTop - 80;
          window.scrollTo({ top: offsetTop, behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  return null;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cows" element={<Cows />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
