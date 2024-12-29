import React, { useState } from "react";
import "./IdeaSubmissionPage.css";

const IdeaSubmissionPage = () => {
  const [formData, setFormData] = useState({
    idea: "",
    ideaCategory: "",
    language: "",
  });
  const [message, setMessage] = useState(""); // For success or error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message

    try {
      const response = await fetch("/api/v1/idea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || "Error creating idea.");
      }

      const { ideaData } = await response.json();
      console.log("Idea created:", ideaData);
      setMessage("Idea submitted successfully!");
      setFormData({
        idea: "",
        ideaCategory: "Renewable Energy",
        language: "English",
      });
    } catch (error) {
      console.error("Error creating idea:", error);
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="idea-submission-container">
      <h2>Submit Your Idea</h2>
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit} className="idea-form">
        <textarea
          name="idea"
          placeholder="Describe your idea..."
          value={formData.idea}
          onChange={handleChange}
          required
        />
        <select
          name="ideaCategory"
          value={formData.ideaCategory}
          onChange={handleChange}
        >
          <option value="Renewable Energy">Renewable Energy</option>
          <option value="Eco-Friendly Urban Development">
            Eco-Friendly Urban Development
          </option>
          <option value="Environmental Policies">Environmental Policies</option>
        </select>
        <select
          name="language"
          value={formData.language}
          onChange={handleChange}
        >
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
