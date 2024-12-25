import React, { useState } from "react";
import "./IdeaSubmissionPage.css";

const IdeaSubmissionPage = () => {
  const [idea, setIdea] = useState("");
  const [ideaCategory, setIdeaCategory] = useState("Renewable Energy");
  const [language, setLanguage] = useState("English");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the payload to match your Idea schema
    const payload = {
      idea,
      ideaCategory,
      language,
    };

    try {
      // POST request to your idea endpoint
      const response = await fetch("/api/v1/ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData?.error || "An error occurred while submitting the idea."
        );
      }

      const data = await response.json();
      console.log("Idea submitted:", data);
      alert("Idea submitted successfully!");

      // Reset form fields
      setIdea("");
      setIdeaCategory("Renewable Energy");
      setLanguage("English");
    } catch (error) {
      console.error("Error submitting idea:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="idea-submission-container">
      <h2>Submit Your Idea</h2>
      <form onSubmit={handleSubmit} className="idea-form">
        {/* Idea Text */}
        <textarea
          placeholder="Describe your idea..."
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          required
        />

        {/* Idea Category */}
        <select
          value={ideaCategory}
          onChange={(e) => setIdeaCategory(e.target.value)}
        >
          <option value="Renewable Energy">Renewable Energy</option>
          <option value="Eco-Friendly Urban Development">
            Eco-Friendly Urban Development
          </option>
          <option value="Environmental Policies">Environmental Policies</option>
        </select>

        {/* Language */}
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="Chinese">Chinese</option>
        </select>

        <button type="submit">Submit Idea</button>
      </form>
    </div>
  );
};

export default IdeaSubmissionPage;
