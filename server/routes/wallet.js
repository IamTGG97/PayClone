console.log("wallet.js loaded from:", __filename);


const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

// Test route
router.get('/test', (req, res) => {
  res.send('Wallet route is working');
});
router.get('/ping', (req, res) => {
  res.send('pong');
});

// Get wallet balance (protected)
router.get('/balance', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('walletBalance');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ walletBalance: user.walletBalance });
  } catch (err) {
    console.error('Error getting wallet balance:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fund wallet (protected)
router.post('/fund', authMiddleware, async (req, res) => {
  const { amount, token } = req.body;

  try {
    const amountInCents = Math.round(amount * 100);

    const charge = await stripe.charges.create({
      amount: amountInCents,
      currency: 'usd',
      source: token,
      description: `Wallet funding for user ${req.user.userId}`,
    });

    const user = await User.findById(req.user.userId);
    user.walletBalance = (user.walletBalance || 0) + amount;
    await user.save();

    res.json({
      success: true,
      message: 'Wallet funded successfully',
      newBalance: user.walletBalance,
    });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ message: 'Payment failed' });
  }
});

module.exports = router;
