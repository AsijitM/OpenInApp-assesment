const Task = require('../models/TaskModel');

async function taskExists(req, res, next) {
  const { task_id } = req.params;
  const user_id = req.user.id;
  try {
    const existingTask = await Task.findOne({ task_id, user_id });

    if (!existingTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Attach the existing task to the request for later use
    req.existingTask = existingTask;

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = taskExists;
