const User = require('../models/users'); // Ensure path and file name are correct
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Ensure this is set in your .env file

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Registration endpoint
exports.register = async (req, res) => {
  const { username, password, emailId, phoneNumber } = req.body;

  // Validate required fields
  if (!username || !password || !emailId || !phoneNumber) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Create a new user
    const user = new User({ username, password, emailId, phoneNumber });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Log error for debugging
    console.error(error);
    // Send response with error details
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login endpoint
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Respond with token
    res.status(200).json({ token });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.requestMagicLink = async (req, res) => {
  const { emailId } = req.body;

  try {
    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate magic token
    const token = user.setMagicToken();
    await user.save();

    // Send magic link via email
    const magicLink = `http://localhost:3000/api/verify-token?token=${token}`;
    await transporter.sendMail({
      to: user.emailId,
      subject: 'Your Magic Login Link',
      text: `Click on the following link to log in: ${magicLink}. It is valid for 15 minutes.`
    });

    res.status(200).json({ message: 'Magic link sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.verifyToken = async (req, res) => {
  const { token } = req.query;
console.log(token,"token")
  try {
    const user = await User.findOne({ magicToken: token, tokenExpires: { $gt: Date.now() } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Clear token fields
    user.magicToken = null;
    user.tokenExpires = null;
    await user.save();

    // Generate and return a JWT token
    const jwtToken = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token: jwtToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

