import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
const Navbar = ({ handleLogout }) => {
  const navigate = useNavigate();
  const [log, setLog] = useState(false);
  const handleLogoutClick = () => {
    setLog(false);
    handleLogout();
    navigate("/login");
  };
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          TodoList
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tasks">
                Link
              </Link>
            </li>
          </ul>
          <form className="d-flex gap-3" role="search">
            <button
              className="btn btn-info"
              type="submit"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
            <button
              className="btn btn-info"
              type="submit"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
