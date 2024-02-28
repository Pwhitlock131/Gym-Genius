import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
        name
        age
        height
        weightGoal
        Workouts
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;


export const ADD_WORKOUT = gql`
  mutation addWorkout($name: String!, $duration: Int!, $type: String!) {
    addWorkout(name: $name, duration: $duration, type: $type) {
      _id
      username
      email
      workouts {
        _id
        name
        duration
        createdAt
        type
      }
    }
  }
`;

export const REMOVE_WORKOUT = gql`
  mutation removeWorkout($workoutId: ID!) {
    removeWorkout(workoutId: $workoutId) {
      _id
      username
      email
      workouts {
        _id
        name
        duration
        createdAt
        type
      }
    }
  }
`;
