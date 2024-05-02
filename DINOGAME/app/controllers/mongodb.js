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

const User = mongoose.model('users', userSchema);

module.exports = {User};