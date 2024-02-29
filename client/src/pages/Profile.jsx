// src/pages/Profile.jsx
import React from 'react';
import './Profile.css'; // Import the CSS file

const Profile = () => {
  // You can fetch user data or any necessary information here
  // sample user data
  const user = {
    username: 'Sylvester Cat',
    email: 'user@example.com',
    age: 30,
    height: '5\'10"',
    weightGoal: '160 lbs',
    workouts:[
      {
        name: "jogging",
        duration: 60,
        createdAt: "2/27/2024",
        type: 'cardio',

      },
      {
        name: "cycling",
        duration: 30,
        createdAt: "2/28/2024",
        type: 'cardio',

      },
      {
        name: "rowing",
        duration: 45,
        createdAt: "2/27/2024",
        type: 'cardio',

      },
      {
        name: "boxing",
        duration: 20,
        createdAt: "2/28/2024",
        type: 'cardio',

      },
    ]
  };

  return (
    <div className="container">
      <h3>{user.username}'s Profile</h3>
      <div className="title">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Height:</strong> {user.height}</p>
        <p><strong>Weight Goal:</strong> {user.weightGoal}</p>
      </div>
      <div className='row'>
      {user.workouts.map(workout =>(
        <div class="card col-sm-12 col-md-6">
        <div class="card-body">
          <h5 class="card-title">{workout.name}</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">{workout.type}</h6>
          <p class="card-text">Duration: {workout.duration} minutes</p>
          <p class="card-text">{workout.createdAt}</p>
        </div>
      </div>
      ))}
      </div>
      {/* additional info*/}
    </div>
  );
};

export default Profile;
