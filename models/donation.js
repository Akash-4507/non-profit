const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donor: { type: String,required: true }, // Optional for logged-in users
  name: { type: String, required: true }, // For guest donors
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  message: { type: String }, // Optional donor message
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Donation', donationSchema);
