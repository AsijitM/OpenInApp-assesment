const express = require('express');
const { createTask, updateTask, getAllTasks,deleteTask } = require('./task.controller');

const TaskRouter = express.Router();

TaskRouter.post('/create-task', createTask);
TaskRouter.post('/update-task/:taskId', updateTask);
TaskRouter.get('/tasks', getAllTasks);
TaskRouter.delete('/tasks/:taskId', deleteTask);
module.exports = {
  TaskRouter,
};
