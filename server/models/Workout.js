const { Schema, model } = require('mongoose');

const workoutSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
          },      
        type: {
            type: String,
            required: true,
            enum: ['cardio', 'strength', 'flexibility'],
            
        },
    }
);

const Workout = model('Workout', workoutSchema);

module.exports = Workout;
