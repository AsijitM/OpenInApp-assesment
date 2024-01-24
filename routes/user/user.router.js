const express = require('express');
const createUser = require('./user.controller');

const UserRouter = express.Router();

UserRouter.post('/create-user', createUser);

module.exports = {
  UserRouter,
};
