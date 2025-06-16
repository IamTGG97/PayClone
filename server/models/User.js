const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,        
    },
    password: {
        required: true,
        type: String, 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    walletBalance: {
        type: Number,
        default: 0.00,
    },
});
module.exports = mongoose.model('User', userSchema);