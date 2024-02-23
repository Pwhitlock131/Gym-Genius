const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const app = express();
app.use(bodyParser.json());

dotenv.config();

const dbURI = 'mongodb://localhost:27017/mydatabase'; 
const secretKey = process.env.SECRET_KEY; // Use the secret key from environment variable

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
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
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }
        req.user = decoded;
        next();
    });
};

// Endpoint to log a workout
app.post('/workout', authenticateUser, async (req, res) => {
    try {
        // Extract the workout dtata from request body and validate the input data
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
            // If user exists, update the users profile
            existingUser.username = username;
            existingUser.password = password;
            existingUser.age = age;
            existingUser.gender = gender;

            await user.save();
            res.status(201).json(user);
        } else {
            // If the user does not exist, create a new user profile
            const newUser = new User({
                username,
                email,
                password,
                age,
                gender
            });
            
            await newUser.save();
            res.status(201).json(newUser);
        }

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
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const token = jwt.sign({ username: user.username, userId: user._id }, secretKey);
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
