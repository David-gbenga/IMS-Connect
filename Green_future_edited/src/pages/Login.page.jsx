import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const LoginPage = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee"); // If needed, pass or store role
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the payload
      const payload = {
        employee_id: employeeId,
        password,
        // You can also include role if the backend is checking it
        // role,
      };

      // Make a POST request to your login endpoint
      const response = await fetch("/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || "Login failed.");
      }

      const data = await response.json();
      console.log("Login successful:", data);

      // Optionally, store user info, token, or role in local storage or state
      // localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful!");
      // Redirect user to a protected page, or home page, etc.
      navigate("/home"); // Example: go to "/home" after login

      // Reset the form
      setEmployeeId("");
      setPassword("");
      setRole("employee");
    } catch (error) {
      console.error("Error logging in:", error);
      alert(`Error: ${error.message}`);
    }
  };

  // Navigate to register page if user clicks "Register"
  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <h2>Welcome to IMS-Connect</h2>
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
        <div className="form-group">
          <label>Role:</label>
          <div className="role-selection">
            <label>
              <input
                type="radio"
                name="role"
                value="employee"
                checked={role === "employee"}
                onChange={() => setRole("employee")}
              />
              Employee
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={() => setRole("admin")}
              />
              Admin
            </label>
          </div>
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
