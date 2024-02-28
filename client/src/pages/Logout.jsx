import React from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory hook for navigation
import './Logout.css'; // Import CSS file for Logout component

const Logout = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    // Redirect to the homepage
    history.push('/');
  };

  return (
    <div className="logout-container">
      <div className="logout-content">
        <h1 className="logout-heading">Logout</h1>
        <p className="logout-message">Are you sure you want to logout?</p>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Logout;
