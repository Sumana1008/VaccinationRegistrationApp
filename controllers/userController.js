const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// User Registration
exports.register = async (req, res) => {
  try {
    const { name, phoneNumber, age, pincode, aadharNo, password } = req.body;

    // Check if a user with the same phoneNumber or Aadhar No already exists
    const existingUser = await User.findOne({
      $or: [{ phoneNumber }, { aadharNo }],
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this PhoneNumber or Aadhar No already exists' });
    }

    // Hash the password before saving it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = new User({
      name,
      phoneNumber,
      age,
      pincode,
      aadharNo,
      password: hashedPassword,
    });

    await newUser.save();

    // Create a JWT token for user authentication
    const token = jwt.sign({ userId: newUser._id }, config.secretKey, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    // Find the user by phoneNumber
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create a JWT token for user authentication
    const token = jwt.sign({ userId: user._id }, config.secretKey, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
