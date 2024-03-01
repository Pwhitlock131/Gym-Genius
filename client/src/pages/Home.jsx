// import React from 'react';
// import './Home.css'; // Import the CSS file
// const Home = () => {
//   return (
//     <div className="home-container">
//       <h1 className="home-title">Welcome to Your Personal Gym Genius</h1>
//       <p className="home-description">
//         This is the home page of our fitness Gym Genius application.
//       </p>
//       {/* Add more info if necessary */}
//     </div>
//   );
// };
// export default Home;
import React from "react";
// import { Navbar, Nav } from "react-bootstrap";
// import { Link, useLocation } from "react-router-dom";
// import Auth from "../utils/auth"
import heart from "/images/circle.png"
// import Header from "./Header.jsx"
import '../../src/components/Navbar/Navbar.jsx'
import '../../src/components/Posts/Calender.jsx';

  // const loggedIn = Auth.loggedIn();
  // const location = useLocation();
  // const isHomePage = location.pathname === '/';
  // const isLoginPage = location.pathname === '/login';
  // const isSignupPage = location.pathname === '/signup';

  const Home = ( ) => {
    return (
      <div>
      <h1> Welcome to Gym Genius! This is a website that allows the fitness buff to track their daily workouts, meet goals, and stay healthy. Users can store all of their workouts and attach them to their personal accounts.  </h1>
      </div>
    );
  }
  
export default Home 