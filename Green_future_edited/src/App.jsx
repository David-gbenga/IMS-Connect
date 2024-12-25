import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavbarComponent from "./components/ui/Navbar.component";
import FooterComponent from "./components/ui/Footer.component";
import LoginPage from "./pages/Login.page";
import HomePage from "./pages/Home.page";
import AdminPage from "./pages/Admin.page"; // <-- Import your AdminPage
import AnalyticsPage from "./pages/Analytics.page";
import IdeaSubmission from "./pages/Ideasubmission.page";
import RewardsPage from "./pages/Rewards.page";
import VotingPage from "./pages/Voting.page";
import RegisterPage from "./pages/Register.page"; // Optional, if you have a register page

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");
  // userRole can be "Employee", "Admin", or "Innovation Manager"
  // based on your login logic

  // Handle login logic:
  //   If credentials match an admin, set userRole to "Admin".
  //   If credentials match an employee, set userRole to "Employee".
  //   If invalid, show an alert or handle error.
  const handleLogin = (employeeId, password, selectedRole) => {
    // Example validation:
    if (
      employeeId === "admin" &&
      password === "admin" &&
      selectedRole === "Admin"
    ) {
      setIsAuthenticated(true);
      setUserRole("Admin");
    } else if (
      employeeId === "user1" &&
      password === "user1" &&
      selectedRole === "employee"
    ) {
      setIsAuthenticated(true);
      setUserRole("Employee");
    } else {
      alert("Invalid credentials or incorrect role! Please try again.");
    }
  };

  // If user is authenticated, decide if they're an admin or employee
  // and redirect accordingly.
  // If not authenticated, show login page.
  return (
    <div>
      {/* Show Navbar only if the user is authenticated */}
      {isAuthenticated && <NavbarComponent />}

      <div className="wrapper">
        <Routes>
          {/* Landing Page (Login) */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                // If user is Admin, redirect to /admin; if Employee, redirect to /home
                userRole === "Admin" ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <Navigate to="/home" replace />
                )
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />

          {/* Optional Register Page, if you have it */}
          <Route path="/register" element={<RegisterPage />} />

          {/* Admin Routes (Protected) */}
          {/* You can show these only if isAuthenticated && userRole==="Admin" */}
          {isAuthenticated && userRole === "Admin" && (
            <>
              <Route path="/admin" element={<AdminPage />} />
              {/* Add other admin-specific routes here if needed */}
            </>
          )}

          {/* Employee Routes (Protected) */}
          {isAuthenticated && userRole === "Employee" && (
            <>
              <Route path="/home" element={<HomePage />} />
              <Route path="/ideaSubmission" element={<IdeaSubmission />} />
              <Route path="/rewards" element={<RewardsPage />} />
              <Route path="/voting" element={<VotingPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
            </>
          )}

          {/* Catch-all for unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* Show Footer only if the user is authenticated */}
      {isAuthenticated && <FooterComponent />}
    </div>
  );
}

export default App;
