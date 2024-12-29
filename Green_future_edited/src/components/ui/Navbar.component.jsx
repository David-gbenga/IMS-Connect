import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FaLightbulb } from "react-icons/fa";

const NavbarComponent = () => {
  const btnToggleRef = useRef();
  const navigate = useNavigate();

  const toggleMenu = () => {
    if (window.innerWidth < 992) {
      btnToggleRef.current.click();
    }
  };

  // Optional: If you have logout logic (e.g., clearing tokens), put it here
  const handleLogout = async (e) => {
    e.preventDefault(); // Prevent default link navigation

    try {
      // Make a request to the backend to clear the authentication token
      const response = await fetch("/api/v1/user/logout", {
        method: "GET",
        credentials: "include", // Ensure cookies are sent with the request
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Logout failed:", errorData.message);
        alert("Failed to log out. Please try again.");
        return;
      }

      // Clear user data on the frontend
      localStorage.removeItem("user"); // Optional: Clear saved user data
      alert("Logged out successfully!");

      // Redirect to login page
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        {/* Logo Section */}
        <div className="navbar-brand">
          <FaLightbulb className="navbar-logo-icon" />
          <span className="navbar-logo-text">IMS CONNECT</span>
        </div>

        {/* Toggle Button for Smaller Screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          ref={btnToggleRef}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item" onClick={toggleMenu}>
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item" onClick={toggleMenu}>
              <Link className="nav-link" to="/ideaSubmission">
                Idea Submission
              </Link>
            </li>
            <li className="nav-item" onClick={toggleMenu}>
              <Link className="nav-link" to="/voting">
                Voting
              </Link>
            </li>
            <li className="nav-item" onClick={toggleMenu}>
              <Link className="nav-link" to="/rewards">
                Rewards
              </Link>
            </li>
            <li className="nav-item" onClick={toggleMenu}>
              <Link className="nav-link" to="/analytics">
                Analytics & Reporting
              </Link>
            </li>
          </ul>

          {/* Logout Button */}
          <div className="auth-buttons">
            <Link
              to="/"
              className="btn btn-success me-2"
              onClick={handleLogout}
            >
              Log Out
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
