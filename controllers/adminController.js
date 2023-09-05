const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/userModel');
const Slot = require('../models/slotModel');

// Admin Login
exports.adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
    
        // Find the admin user by username
        const admin = await Admin.findOne({ username });
    
        if (!admin) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
    
        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, admin.password);
    
        if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
    
        // Generate a JWT token for the authenticated admin
        const token = jwt.sign({ userId: admin._id }, 'your-secret-key', { expiresIn: '1h' });
    
        res.status(200).json({ token });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
};

// Get Admin Statistics (Optional)
exports.getTotalUsers = async (req, res) => {
    try {
      // Get filter parameters from the request query (optional)
      const { age, pincode, vaccinationStatus } = req.query;
  
      // Build a filter object based on the provided parameters (optional)
      const filter = {};
      if (age) {
        filter.age = age;
      }
      if (pincode) {
        filter.pincode = pincode;
      }
      if (vaccinationStatus) {
        filter.firstDoseDate = { $exists: vaccinationStatus === 'FirstDoseCompleted' };
        if (vaccinationStatus === 'AllCompleted') {
          filter.secondDoseDate = { $exists: true };
        }
      }
  
      // Query the User model based on the filter (optional)
      const users = await User.find(filter);
  
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Check the registered slots for the vaccine (first dose/second dose/total) on a given day
  exports.getRegisteredSlotsByDay = async (req, res) => {
    try {
      // Get the date for which you want to check registered slots
      const { date } = req.query;
  
      // Find slots registered for the specified date
      const registeredSlots = await Slot.find({ date });
  
      // Calculate counts for first dose, second dose, and total slots
      const firstDoseCount = registeredSlots.filter((slot) => slot.registeredUsers.length > 0).length;
      const secondDoseCount = registeredSlots.filter((slot) => slot.registeredUsers.length === 10).length;
      const totalSlotsCount = registeredSlots.length;
  
      res.status(200).json({
        firstDoseCount,
        secondDoseCount,
        totalSlotsCount,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };