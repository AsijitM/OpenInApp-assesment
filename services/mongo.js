const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

async function mongoConnect() {
  try {
    await mongoose.connect(MONGO_URL).then(() => {
      console.log('MongoDB connection ready!');
    });
  } catch (error) {
    console.log(error);
  }
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
