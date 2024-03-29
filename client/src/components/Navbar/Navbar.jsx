
import React from 'react';
import { Link } from 'react-router-dom';
import auth from '../../utils/auth';
console.log(auth);

const Navbar = () => {
  return (
    <ul className='navbar'>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li><Link to='/profile'>Workouts</Link></li>

      <div>
        {auth.loggedIn() ? (
          <div>
            {/* <li>Welcome User!</li> */}
            <button onClick={auth.logout}>Logout</button>
          </div>
        ) : (
          <div>
            {/* <li>Welcome Guest!</li> */}
            <Link to='/logIn'>Log In</Link>
          </div>
        )}
      </div>
    </ul>
  )
}

// src/components/Navbar/Navbar.jsx
// import {useState } from 'react';
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Navbar, Nav } from "react-bootstrap";
// import Auth from '../utils/auth';
// console.log(Auth);

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <Link to="/" class="nav-link bg-orange-500 focus:bg-blue-700 text-white">Gym Genius HOME</Link>
//       </div> 
//         <ul className="navbar-menu">
//           <li className="navbar-item">
//             <Link to="/" className="navbar-link">
//               Exercise
//             </Link>
//           </li>
//           <li className="navbar-item">
//             <Link to="/login" className="navbar-link">
//               Login
//             </Link>
//           </li>
//           <li className="navbar-item">
//             <Link to="/logout" className="navbar-link">
//               Logout
//             </Link>
//           </li>
//           <li className="navbar-item">
//             <Link to="/profile" className="navbar-link">
//               Profile
//             </Link>
//           </li>
//           <li className="navbar-item">
//             <Link to="/signup" className="navbar-link">
//               Signup
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
// src/components/Navbar/Navbar.jsx


export default Navbar