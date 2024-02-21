// Require necessary modules
const crypto = require('crypto');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Check if the SECRET_KEY environment variable is already set
if (!process.env.SECRET_KEY) {
    // Generate a random secret key if it's not already set
    const secretKey = crypto.randomBytes(32).toString('hex');
    // Store the generated secret key as an environment variable
    process.env.SECRET_KEY = secretKey;
    console.log('Generated Secret Key:', secretKey);
}

