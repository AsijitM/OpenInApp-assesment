const SubTask = require('../models/SubtaskModel');
const Task = require('../models/TaskModel');

// Function to update main task status to "IN_PROGRESS" if any subtask has status 1
const updateMainTaskStatus = async (taskId) => {
  try {
    const task = await Task.findOne({ _id: taskId });
    if (task) {
      task.status = 'IN_PROGRESS';
      await task.save();
    }

    console.log('Task Status Updated');
  } catch (error) {
    console.error('Error updating main task status:', error);
  }
};

const softDeleteTaskAndSubtasks = async (taskId) => {
  try {

    const task = await Task.findOne({ task_id: taskId });

    if (task) {

      await SubTask.updateMany({ task_id: task._id }, { is_deleted: true });


      task.status = 'DONE'; // or task.is_deleted = true;

      // Save changes to the main task
      await task.save();
      console.log('Deletion Success');
    }
  } catch (error) {
    console.error('Error soft deleting task and subtasks:', error);
  }
};

module.exports = { updateMainTaskStatus, softDeleteTaskAndSubtasks };
