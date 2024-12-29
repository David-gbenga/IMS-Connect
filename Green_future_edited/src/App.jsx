import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavbarComponent from "./components/ui/Navbar.component";
import FooterComponent from "./components/ui/Footer.component";
import LoginPage from "./pages/Login.page";
import HomePage from "./pages/Home.page";
import AdminPage from "./pages/Admin.page"; // Import your AdminPage
import AnalyticsPage from "./pages/Analytics.page";
import IdeaSubmission from "./pages/Ideasubmission.page";
import RewardsPage from "./pages/Rewards.page";
import VotingPage from "./pages/Voting.page";
import RegisterPage from "./pages/Register.page"; // Optional, if you have a register page

function App() {
  return (
    <div>
      <NavbarComponent />
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/ideaSubmission" element={<IdeaSubmission />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/voting" element={<VotingPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
          <Route path="/logout" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
      <FooterComponent />
    </div>
  );
}

export default App;
