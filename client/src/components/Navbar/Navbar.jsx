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

export default Navbar