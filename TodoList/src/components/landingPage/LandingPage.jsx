import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="landingPage container">
      <div className="heading">
        <h1>Todo App</h1>
      </div>
      <div className="buttons">
        <button
          className="btn btn-primary btn-lg "
          onClick={() => navigate("/register")}
        >
          Register
        </button>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
