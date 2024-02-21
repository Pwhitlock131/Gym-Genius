import React from 'react';

const Logout = ({ history }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/');
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
