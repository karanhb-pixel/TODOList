import "./App.css";
import Home from "./components/home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import { Link } from "react-router-dom";
import { useState } from "react";
import LandingPage from "./components/landingPage/LandingPage";
function App() {
  const [authToken, setAuthToken] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
    alert("You Have been logged out.");
  };
  return (
    <>
      <Router>
        <Navbar handleLogout={handleLogout} authToken={authToken} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login setAuthToken={setAuthToken} />}
          />
          <Route
            path="/tasks"
            element={
              authToken ? <Home authToken={authToken} /> : navigate("/login")
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
