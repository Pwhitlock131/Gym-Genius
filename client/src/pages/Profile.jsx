// src/pages/Profile.jsx

import React from 'react';

const Profile = () => {
  // You can fetch user data or any necessary information here
  // sample user data
  const user = {
    username: 'exampleUser',
    email: 'user@example.com',
    age: 30,
    height: '5\'10"',
    weight: '160 lbs',
  };

  return (
    <div>
      <h1>User Profile</h1>
      <div>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Height:</strong> {user.height}</p>
        <p><strong>Weight:</strong> {user.weight}</p>
      </div>
      {/* additional info*/}
    </div>
  );
};

export default Profile;
