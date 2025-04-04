import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../config";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    //checking Username, Email, Pawword empty also checkbox is checked.
    if (!isChecked) {
      alert("Please check the checkbox before submitting!");
      return;
    }

    if (!username.trim()) {
      alert("Username cannot be empty!");
      return;
    }

    if (!email.trim()) {
      alert("Email cannot be empty!");
      return;
    }

    if (!password.trim()) {
      alert("passwordword cannot be empty!");
      return;
    }
    try {
      const response = await axios.post(`${config.BASE_URL}/auth/register`, {
        username,
        email,
        password,
      });
      setUser((prevUsers) => [...prevUsers, response.data]);
      alert("Registration sucessfull!");
      navigate("/login");
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
      <div className="register">
        <div className="">
          <h1 className="heading_text">Welcome To Registration Page</h1>
        </div>
        <div className="form" onSubmit={handleRegister}>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputUsername" className="form-label">
                UserName
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername"
                aria-describedby="userNameHelp"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
              />
              <div id="userNameHelp" className="form-text">
                We'll never share your Username with anyone else.
              </div>
            </div>
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
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
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
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                onChange={(e) => {
                  setIsChecked(!isChecked);
                }}
                checked={isChecked}
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Check me out
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
