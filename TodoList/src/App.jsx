import "./App.css";
import Home from "./components/home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import { Link } from "react-router-dom";
import { useState } from "react";
import LandingPage from "./components/landingPage/LandingPage";
import { AuthProvider } from "./components/AuthContext";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/tasks"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
