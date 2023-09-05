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
      ref: 'User',
    },
  ],
});

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
