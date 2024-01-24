const User = require('../../models/UserModel');
const jwt = require('jsonwebtoken');

require('dotenv').config();

async function createUser(req, res) {
  const { id, phone_number, priority } = req.body;

  try {
    // Check if the user id is unique
    const existingUser = await User.findOne({ id });
    if (existingUser) {
      return res.status(409).json({ error: 'User ID must be unique' });
    }

    const user = {
      id,
      phone_number,
      priority,
    };
    // Create a new user
    const newUser = new User({ id, phone_number, priority });
    await newUser.save();
    console.log(user);
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

    res.status(201).json({
      newUser: newUser,
      accessToken: accessToken,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = createUser;
