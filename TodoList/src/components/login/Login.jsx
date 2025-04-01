import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setAuthToken }) {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    //checking Username, Email, Pawword empty also checkbox is checked.

    if (!email.trim() || !password.trim()) {
      alert("Feild cannot be empty!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      if (!response.data.token) {
        console.log("Token not found!");
        return;
      }
      localStorage.setItem("authToken", response.data.token);
      // console.log(localStorage.getItem("authToken"));

      setAuthToken(response.data.token);
      alert("Login sucessfull!");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data) {
        // Check if the server returned a specific error message
        const errorMessage = error.response.data.error || "An error occurred.";
        alert(`${errorMessage}`);
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container">
      <div className="login">
        <div className="">
          <h1 className="heading_text">Welcome To Login Page</h1>
        </div>
        <div className="form" onSubmit={handleLogin}>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputpasswordword1" className="form-label">
                passwordword
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputpasswordword1"
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                value={password}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
