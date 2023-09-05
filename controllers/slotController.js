const Slot = require('../models/slotModel');
const User = require('../models/userModel');

// List available vaccine slots for a given day
exports.listAvailableSlots = async (req, res) => {
    try {
      // Get the date for which you want to list available slots from the request query
      const { date } = req.query;
  
      // Find slots for the specified date with available doses
      const availableSlots = await Slot.find({
        date,
        availableDoses: { $gt: 0 }, // Filter slots with more than 0 available doses
      });
  
      res.status(200).json(availableSlots);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// Register a user for a vaccine slot
exports.registerSlot = async (req, res) => {
  try {
    const { userId } = req.user; // Extract user ID from the authenticated user
    const { slotId } = req.body;

    // Check if the user has already registered for a slot
    const user = await User.findById(userId);
    if (user && user.firstDoseDate) {
      return res.status(400).json({ error: 'User has already registered for a slot' });
    }

    // Find the selected slot
    const slot = await Slot.findById(slotId);

    if (!slot) {
      return res.status(404).json({ error: 'Slot not found' });
    }

    // Check if there are available doses in the slot
    if (slot.availableDoses === 0) {
      return res.status(400).json({ error: 'No available doses in the selected slot' });
    }

    // Register the user for the slot
    slot.registeredUsers.push(userId);
    slot.availableDoses--;

    // Set the first dose date for the user
    user.firstDoseDate = slot.date;

    // Save the changes to the database
    await slot.save();
    await user.save();

    res.status(200).json({ message: 'Slot registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a registered vaccine slot
exports.updateSlot = async (req, res) => {
  try {
    const { userId } = req.user; // Extract user ID from the authenticated user
    const { slotId, newSlotId } = req.body;

    // Find the selected slot and the new slot
    const oldSlot = await Slot.findById(slotId);
    const newSlot = await Slot.findById(newSlotId);

    if (!oldSlot || !newSlot) {
      return res.status(404).json({ error: 'Slot not found' });
    }

    // Check if the user is registered for the old slot
    if (!oldSlot.registeredUsers.includes(userId)) {
      return res.status(400).json({ error: 'User is not registered for the old slot' });
    }

    // Check if the new slot has available doses
    if (newSlot.availableDoses === 0) {
      return res.status(400).json({ error: 'No available doses in the new slot' });
    }

    // Remove the user from the old slot and update available doses
    oldSlot.registeredUsers.pull(userId);
    oldSlot.availableDoses++;

    // Register the user for the new slot
    newSlot.registeredUsers.push(userId);
    newSlot.availableDoses--;

    // Update the user's first dose date
    const user = await User.findById(userId);
    user.firstDoseDate = newSlot.date;

    // Save changes to the database
    await oldSlot.save();
    await newSlot.save();
    await user.save();

    res.status(200).json({ message: 'Slot update successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
