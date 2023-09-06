const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  availableDoses: {
    type: Number,
    required: true,
  },
  registeredUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // References the User model for registered users
    },
  ],
});

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
