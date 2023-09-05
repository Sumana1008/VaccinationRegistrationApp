const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/userModel');
const Slot = require('../models/slotModel');

// Admin Login
exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check admin credentials (You can store these manually in the database)
    if (username === 'admin' && password === 'admin_password') {
      // Generate an admin JWT token
      const token = jwt.sign({ username }, config.secretKey, { expiresIn: '1h' });
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get Admin Statistics (Optional)
exports.getAdminStatistics = async (req, res) => {
  try {
    // You can implement logic to retrieve admin statistics here
    // For example, total users registered, slots statistics, etc.
    const totalUsers = await User.countDocuments();
    const totalSlots = await Slot.countDocuments();
    const firstDoseSlots = await Slot.countDocuments({ firstDoseRegisteredUsers: { $exists: true, $not: { $size: 0 } } });
    const secondDoseSlots = await Slot.countDocuments({ secondDoseRegisteredUsers: { $exists: true, $not: { $size: 0 } } });

    res.status(200).json({
      totalUsers,
      totalSlots,
      firstDoseSlots,
      secondDoseSlots,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
