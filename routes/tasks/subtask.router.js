const express = require('express');
const {
  createSubtask,
  updateSubTask,
  getAllsubTasks,
  deleteSubTasks,
} = require('./subtask.controller');
const taskExists = require('../../middlewares/taskExists');

const subtaskRouter = express.Router();

subtaskRouter.post('/:task_id/create-sub-task', taskExists,createSubtask);
subtaskRouter.post('/:task_id/update-sub-task/:taskId',taskExists, updateSubTask);
subtaskRouter.get('/subtasks', getAllsubTasks);
subtaskRouter.delete('/subtasks/:subtaskid', deleteSubTasks);

module.exports = {
  subtaskRouter,
};
