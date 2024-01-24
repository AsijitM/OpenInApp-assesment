const Task = require('../models/TaskModel');

// Function to update main task status to "IN_PROGRESS" if any subtask has status 1
const updateMainTaskStatus = async (taskId) => {
  try {
    const task = await Task.findOne({ _id: taskId });
    if (task) {
      // If at least one subtask has status 1, update main task status to "IN_PROGRESS"
      task.status = 'IN_PROGRESS';
      await task.save();
    }

    console.log('Task Status Updated');
  } catch (error) {
    console.error('Error updating main task status:', error);
  }
};
module.exports = updateMainTaskStatus;
