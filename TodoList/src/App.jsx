import "./App.css";
import Home from "./components/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import { Link } from "react-router-dom";
import { useState } from "react";
function App() {
  const [authToken, setAuthToken] = useState(null);
  return (
    <>
      <Router>
        <Navbar />
        {!authToken ? (
          <Login setAuthToken={setAuthToken} />
        ) : (
          <Home authToken={authToken} />
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
