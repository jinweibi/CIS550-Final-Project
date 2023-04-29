import React, { useState, useEffect } from "react";
import logo from "../images/logo2.png";
import "../styles/HomePage.css";

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data from API
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="loading">
          <img src={logo} alt="loading" className="rotate" />
        </div>
      ) : (
        <div>
          <h1>Welcome to the Homepage!</h1>
          <p>Your data has been loaded.</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;
