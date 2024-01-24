const express = require('express');
const {
  createSubtask,
  updateSubTask,
  getAllsubTasks,
  deleteSubTasks,
} = require('./subtask.controller');

const subtaskRouter = express.Router();

subtaskRouter.post('/create-sub-task', createSubtask);
subtaskRouter.post('/update-sub-task/:taskId', updateSubTask);
subtaskRouter.get('/subtasks', getAllsubTasks);
subtaskRouter.delete('/subtasks/:subtaskid', deleteSubTasks);

module.exports = {
  subtaskRouter,
};
