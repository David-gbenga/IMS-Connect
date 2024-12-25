import React from "react";
import "./AnalyticsPage.css";

const AnalyticsPage = () => {
  const submissions = 56; // Example data
  const votes = 342;
  const activeUsers = 20;

  return (
    <div className="analytics-page-container">
      <h2>Analytics Dashboard</h2>
      <div className="stats">
        <div className="stat-item">
          <h3>Total Submissions</h3>
          <p>{submissions}</p>
        </div>
        <div className="stat-item">
          <h3>Total Votes</h3>
          <p>{votes}</p>
        </div>
        <div className="stat-item">
          <h3>Active Users</h3>
          <p>{activeUsers}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
