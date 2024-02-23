const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { ApolloServer, gql } = require('apollo-server-express');
const path = require('path');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const { authMiddleware } = require('./utils/auth');

// Define your GraphQL schema
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Define resolvers for your schema
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

// Create an instance of ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create an Express app
const app = express();

// Apply middleware to parse request bodies as JSON
app.use(bodyParser.json());

const startServer = async () => {
    await server.start();

// Apply Apollo Server middleware to the '/graphql' endpoint
server.applyMiddleware({ app, path: '/graphql' });

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Middleware to authenticate user
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Token missing' });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

// Define Workout Schema
const workoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  exercises: [{ type: String, required: true }],
  duration: { type: Number, required: true },
});
const Workout = mongoose.model('Workout', workoutSchema);

// Define User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add other fields we might need, such as age, gender, etc.
});
const User = mongoose.model('User', userSchema);

// Endpoint to log a workout
app.post('/workout', authenticateUser, async (req, res) => {
  try {
    // Extract the workout data from request body and validate the input data
    const { exerciseType, duration, date } = req.body;
    if (!exerciseType || !duration || !date) {
      return res.status(400).json({ error: 'Exercise type, duration, and date are required' });
    }
    // Ensure the workout duration is a positive number and date is a valid string
    if (typeof duration !== 'number' || duration <= 0) {
      return res.status(400).json({ error: 'Duration must be a positive number' });
    }
    if (!Date.parse(date)) {
      return res.status(400).json({ error: 'Invalid date format. Please provide a valid date string' });
    }
    // Construct the workout object
    const workoutData = {
      userId: req.user.userId,
      exerciseType,
      duration,
      date: new Date(date), // Converting the date string to Date object
    };
    // Save workout data to database
    const workout = new Workout(workoutData);
    await workout.save();
    res.status(201).json(workout); // Respond with the saved workout
  } catch (error) {
    console.error('Error logging workout:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to create a new user profile
app.post('/user', async (req, res) => {
  try {
    const { username, email, password, age, gender } = req.body;

    // Validate input data
    if (!username || !email || !password || !age || !gender) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the user already exists by email
    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user profile
    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Save the hashed password
      age,
      gender
    });

    await newUser.save(); // Save the new user profile
    res.status(201).json(newUser); // Respond with the newly created user profile

  } catch (error) {
    console.error('Error creating user profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint for user login (authentication)
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const token = jwt.sign({ username: user.username, userId: user._id }, process.env.SECRET_KEY);
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
  
    // Handle other HTTP methods appropriately (e.g., GET requests for static files)
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }
  

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
};
