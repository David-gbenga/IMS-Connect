import React, { useState, useEffect } from "react";
import Spinner from "../components/ui/Spinner.component"; // Import Spinner
import "./HomePage.css";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (e.g., fetching data)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust time as needed (e.g., 2 seconds)

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div className="homepage-container">
      {isLoading ? (
        <Spinner /> // Use Spinner component when loading
      ) : (
        <>
          <h1>Welcome to IMS-Connect</h1>
          <p>
            At Green Future, we're committed to fostering sustainability through
            innovation and collaboration. IMS-Connect empowers our global
            employees to share and develop ideas in renewable energy,
            eco-friendly urban development, and sustainable environmental
            policies.
          </p>
          <div className="features">
            <h2>Platform Features:</h2>
            <ul>
              <li>Submit your innovative ideas for sustainability.</li>
              <li>Collaborate with colleagues globally.</li>
              <li>Vote for the most impactful ideas.</li>
              <li>Track idea development and earn rewards.</li>
              <li>
                AI-enabled idea evaluation for fairness and innovation ranking.
              </li>
            </ul>
          </div>
          <div className="cta">
            <p>
              Let’s build a greener, more sustainable future together! Start by
              submitting your ideas or exploring ongoing projects.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
