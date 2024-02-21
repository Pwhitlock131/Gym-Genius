const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const profileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: [0, 'Age must be a positive number'],
    },
    height: {
      type: Number,
      required: true,
      min: [0, 'Height must be a positive number'],
    },
    weightGoal: {
      type: Number,
      required: true,
      min: [0, 'Weight goal must be a positive number'],
    },
    
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
