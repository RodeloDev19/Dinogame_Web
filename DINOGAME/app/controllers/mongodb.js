const mongoose = require('mongoose');
const mongoUrl = "mongodb+srv://admin:admin@myapp.1xkqgcy.mongodb.net/dinogame";

const mongoConnection = mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    highScore: {
        type: Number,
        default: 0
    }
});

const userPlaythroughs = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    highScore: {
        type: Number,
        default: 0
    },
    scores: [{        
        score: Number,
        date: { type: Date, default: Date.now }
    }]
});

const User = mongoose.model('users', userSchema);
const UserPlays = mongoose.model('userScores', userPlaythroughs);

module.exports = {User, UserPlays};