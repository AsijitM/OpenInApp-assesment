const Task = require('../../models/TaskModel');
const mongoose = require('mongoose');
const { softDeleteTaskAndSubtasks } = require('../../services/task_status');
const getPriority = require('../../services/setPriority');
const { validationResult } = require('express-validator');

function generateRandomTaskId() {
  return Math.floor(Math.random() * 1000) + 1;
}
async function createTask(req, res) {
  const { title, description, due_date } = req.body;
  const user_id = req.user.id;

  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    // Generate a unique random number for task_id
    const task_id = generateRandomTaskId();

    // Create a new task

    const priority = getPriority(new Date(due_date));

    const newTask = new Task({
      user_id,
      task_id,
      title,
      priority: priority,
      description,
      due_date,
    });
    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateTask(req, res) {
  const taskId = req.params.taskId;
  const { due_date, status } = req.body;
  console.log(taskId);
  try {
    // Find the Task by taskId
    const task = await Task.findOne({ task_id: taskId });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Update the task fields
    if (due_date) {
      task.due_date = due_date;
    }

    if (status) {
      // Check if the provided status is valid
      if (!['TODO', 'DONE'].includes(status)) {
        return res
          .status(400)
          .json({ error: 'Invalid status. Must be "TODO" or "DONE"' });
      }
      if (status === 'DONE') softDeleteTaskAndSubtasks(taskId);
      task.status = status;
    }

    // Save the updated task
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getAllTasks(req, res) {
  const { priority, due_date } = req.query;
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  try {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const filter = { is_deleted: false };
    const results = {};

    if (priority) {
      filter.priority = priority;
      results.priority = priority;
    }
    if (due_date) {
      filter.due_date = due_date;
      results.due_date = due_date;
    }

    // Apply pagination
    const skip = (page - 1) * limit;

    if (startIndex > 0)
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    if (endIndex < (await Task.countDocuments().exec()))
      results.next = {
        page: page + 1,
        limit: limit,
      };

    // Find all tasks based on the filter with pagination
    results.tasks = await Task.find(filter).skip(skip).limit(parseInt(limit));
    console.log(results.tasks.length);

    // console.log(results.tasks.length);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deleteTask(req, res) {
  const taskId = req.params.taskId;

  try {
    // Find the task by taskId
    const task = await Task.findOne({ task_id: taskId });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Soft delete the task
    task.is_deleted = true;

    // soft delete the subtasks
    softDeleteTaskAndSubtasks(taskId);

    // Save the updated task
    await task.save();

    res.status(200).json({ message: 'Task soft deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
module.exports = { createTask, updateTask, getAllTasks, deleteTask };
