const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  pincode: { type: String, required: true },
  aadharNo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstDoseDate: { type: Date }, // Add this field for tracking vaccination
  secondDoseDate: { type: Date }, // Add this field for tracking vaccination
});

const User = mongoose.model('User', userSchema);

module.exports = User;
