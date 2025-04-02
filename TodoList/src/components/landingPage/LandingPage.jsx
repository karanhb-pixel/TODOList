import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const LandingPage = () => {
  const navigate = useNavigate();
  const { authToken } = useAuth();

  return (
    <div className="landingPage container">
      <div className="heading">
        <h1>Todo App</h1>
      </div>
      {!authToken ? ( // Conditional rendering based on authToken
        <div className="buttons">
          <button
            className="btn btn-primary btn-lg"
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
      ) : (
        <div className="heading_details">
          <h2>Welcome back! You are logged in.</h2>
          <button
            className="btn btn-primary btn-lg task-btn"
            onClick={() => navigate("/tasks")}
          >
            Go to Tasks
          </button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
