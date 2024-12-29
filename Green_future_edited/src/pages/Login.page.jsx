import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const LoginPage = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  //const [role, setRole] = useState("Employee");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check if the user is already logged in
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser?.role === "Employee") {
      navigate("/home", { replace: true });
    } else if (loggedInUser?.role === "Admin") {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        employee_id: employeeId,
        password,
      };

      const response = await fetch("/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData?.error || "Login failed.");
        return;
      }

      const data = await response.json();
      const userRole = data?.user?.role;

      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect based on role
      if (userRole === "Employee") {
        navigate("/home", { replace: true });
      } else if (userRole === "Admin") {
        navigate("/admin", { replace: true });
      } else {
        setError("Invalid role. Unable to redirect.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <h2>Welcome to IMS-Connect</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="employeeId">Employee ID:</label>
          <input
            type="text"
            id="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">
          Login
        </button>
        <button
          type="button"
          className="register-button"
          onClick={goToRegister}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
