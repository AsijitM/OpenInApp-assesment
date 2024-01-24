const express = require('express');
const {
  createTask,
  updateTask,
  getAllTasks,
  deleteTask,
} = require('./task.controller');

const validationSchemaForTask = require('../../helper/validation');

const TaskRouter = express.Router();

TaskRouter.post('/create-task', validationSchemaForTask, createTask);
TaskRouter.post('/update-task/:taskId', updateTask);
TaskRouter.get('/tasks', getAllTasks);
TaskRouter.delete('/tasks/:taskId', deleteTask);

module.exports = {
  TaskRouter,
};
