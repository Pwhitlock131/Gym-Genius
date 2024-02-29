import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { gql } from '@apollo/client';

const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      age
      height
      weightGoal
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

const UPDATE_PROFILE = gql`
  mutation updateProfile($age: Int, $height: String, $weightGoal: String, $workout: WorkoutInput) {
    updateProfile(age: $age, height: $height, weightGoal: $weightGoal, workout: $workout) {
      _id
      username
      email
      age
      height
      weightGoal
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

const Profile = () => {
  const { loading, data, refetch } = useQuery(QUERY_ME);
  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    weightGoal: '',
    workoutName: '',
    workoutDuration: '',
    workoutType: ''
  });
  const [showAddWorkoutForm, setShowAddWorkoutForm] = useState(false);

  if (loading) return <p>Loading...</p>;

  const user = data?.me || {};
  const workouts = user.workouts || [];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({
        variables: {
          ...formData,
          age: parseInt(formData.age), // Convert age to integer
        },
      });
      // After updating the profile, refetch the profile data to update the UI
      refetch();
      // Show the Add Workout form after submitting the profile
      setShowAddWorkoutForm(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitWorkout = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({
        variables: {
          workout: {
            name: formData.workoutName,
            duration: parseInt(formData.workoutDuration), // Convert duration to integer
            type: formData.workoutType
          }
        },
      });
      // After adding the workout, refetch the profile data to update the UI
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h1>{user.username}'s Profile</h1>
      <Row>
        <Col>
          {!showAddWorkoutForm ? (
            <Form onSubmit={handleSubmitProfile}>
              <Form.Group controlId="formAge">
                <Form.Label>Age</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter your age" 
                  name="age" 
                  value={formData.age}
                  onChange={handleChange} 
                />
              </Form.Group>
              <Form.Group controlId="formHeight">
                <Form.Label>Height</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter your height" 
                  name="height" 
                  value={formData.height}
                  onChange={handleChange} 
                />
              </Form.Group>
              <Form.Group controlId="formWeightGoal">
                <Form.Label>Weight Goal</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter your weight goal" 
                  name="weightGoal" 
                  value={formData.weightGoal}
                  onChange={handleChange} 
                />
              </Form.Group>
              <Button variant="primary" type="submit">Submit</Button>
            </Form>
          ) : (
            <Form onSubmit={handleSubmitWorkout}>
              <Form.Group controlId="formWorkoutName">
                <Form.Label>Workout Name</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter workout name" 
                  name="workoutName" 
                  value={formData.workoutName}
                  onChange={handleChange} 
                />
              </Form.Group>
              <Form.Group controlId="formWorkoutDuration">
                <Form.Label>Workout Duration (minutes)</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter workout duration" 
                  name="workoutDuration" 
                  value={formData.workoutDuration}
                  onChange={handleChange} 
                />
              </Form.Group>
              <Form.Group controlId="formWorkoutType">
                <Form.Label>Workout Type</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter workout type" 
                  name="workoutType" 
                  value={formData.workoutType}
                  onChange={handleChange} 
                />
              </Form.Group>
              <Button variant="primary" type="submit">Submit</Button>
            </Form>
          )}
        </Col>
      </Row>
      <Row>
        {workouts.map(workout => (
          <Col key={workout._id} md={6}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{workout.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{workout.type}</Card.Subtitle>
                <Card.Text>
                  Duration: {workout.duration} minutes
                </Card.Text>
                <Card.Text>
                  Created At: {workout.createdAt}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Profile;
