const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  phone_number: Number,
  priority: { type: Number, enum: [0, 1, 2] },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
