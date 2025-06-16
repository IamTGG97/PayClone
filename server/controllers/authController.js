const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
    const {name, email, password} = req.body;

    try { 
        const existingUser = await User.findOne({ email });
        if (existingUser){
            return res.status(400).json({ message: 'Email is already in use'})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1d', 
        });

        res.status(201).json({
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                walletBalance: newUser.walletBalance
            }
        });
    } catch (err){ 
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try{
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: 'Invalid credentials'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: 'Invalid credentials'});
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                walletBalance: user.walletBalance,
            },
        });
    }catch(err){ 
        console.error('Login error: ', err);
        res.status(500).json({ message: 'Server error'});
    }
};