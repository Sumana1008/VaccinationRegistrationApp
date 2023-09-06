const mongoose = require('mongoose');
//Define the schema for user model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  aadharNo: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstDoseDate: {
    type: Date,
  },
  secondDoseDate: {
    type: Date,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User; //create and export the user model
