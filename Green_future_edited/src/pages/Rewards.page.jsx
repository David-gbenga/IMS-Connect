import React from "react";
import "./RewardsPage.css";

const RewardsPage = () => {
  const points = 120; // Example points value

  return (
    <div className="rewards-page-container">
      <h2>Your Rewards</h2>
      <p>You have {points} points!</p>
      <button onClick={() => alert("Redeeming points...")}>
        Redeem Points
      </button>
      <ul>
        <li>Gift Cards</li>
        <li>Recognition Badges</li>
        <li>Exclusive Sustainability Training</li>
      </ul>
    </div>
  );
};

export default RewardsPage;
