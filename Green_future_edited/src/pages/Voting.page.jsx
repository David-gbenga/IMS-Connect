import React, { useState } from "react";
import "./VotingPage.css";

const VotingPage = () => {
  const [ideas, setIdeas] = useState([
    { id: 1, text: "Solar-powered urban lighting systems", votes: 10 },
    {
      id: 2,
      text: "Plastic waste conversion into construction materials",
      votes: 8,
    },
  ]);

  const handleVote = (id) => {
    setIdeas((prevIdeas) =>
      prevIdeas.map((idea) =>
        idea.id === id ? { ...idea, votes: idea.votes + 1 } : idea
      )
    );
  };

  return (
    <div className="voting-page-container">
      <h2>Vote for Ideas</h2>
      <ul>
        {ideas.map((idea) => (
          <li key={idea.id}>
            <p>{idea.text}</p>
            <p>Votes: {idea.votes}</p>
            <button onClick={() => handleVote(idea.id)}>Vote</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VotingPage;
