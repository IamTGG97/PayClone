require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const walletRoutes = require('./routes/wallet');


const app = express()
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes);
console.log("Wallet routes middleware loaded");

console.log("Routes registered");

app.get('/', (req, res) => {
    res.send('API is running');
});

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB is connected');
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    })
    .catch((err) => console.error('MongoDB connection error:', err));