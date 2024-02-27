import React from 'react';
import './Home.css'; // Import the CSS file
import '../../src/components/Navbar/Navbar'



const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Your Personal Gym Genius</h1>
      <p className="home-description">
        This is the home page of our fitness Gym Genius application.
      </p>
      {/* Add more info if necessary */}
    </div>
  );
};

export default Home;
