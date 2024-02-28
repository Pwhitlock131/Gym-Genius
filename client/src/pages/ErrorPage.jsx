import React from 'react';
import './ErrorPage.css'; // Import CSS file for ErrorPage component

export default function ErrorPage() {
  return (
    <div className="error-page-container">
      <div className="error-page-content">
        <h1 className="error-heading">Error 404</h1>
        <p className="error-message">Oops! The page you're looking for could not be found.</p>
        <p className="error-description">The requested URL may have been moved or doesn't exist. Please check the URL or navigate back to the homepage.</p>
        <button className="error-button" onClick={() => window.history.back()}>Go Back</button>
      </div>
    </div>
  );
}
