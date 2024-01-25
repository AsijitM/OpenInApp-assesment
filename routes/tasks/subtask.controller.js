const SubTask = require('../../models/SubtaskModel');
const Task = require('../../models/TaskModel');
const mongoose = require('mongoose');
<<<<<<< HEAD
const { updateMainTaskStatus } = require('../../helper/task_status');
=======
const { updateMainTaskStatus } = require('../../services/task_status');
>>>>>>> 3422c09a56471a8c25d10f6ed3b284296e70397e

function generateRandomTaskId() {
  return Math.floor(Math.random() * 100) + 1;
}

async function createSubtask(req, res) {
  const { task_id } = req.body;
  try {
    const task = await Task.findOne({ task_id });
    if (!task) return res.status(404).json({ error: 'Task not Found' });

    const id = generateRandomTaskId();
    const newSubTask = new SubTask({ id, task_id: task._id });

    await newSubTask.save();

    res.status(201).json(newSubTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateSubTask(req, res) {
  const taskId = req.params.taskId;
  const { status } = req.body;

  console.log(taskId);
  try {
    const subtask = await SubTask.findOne({ id: taskId });
    if (!subtask) return res.status(404).json({ error: 'SubTask not Found' });

    if (status) {
      // Check if the provided status is valid
      if (![0, 1].includes(status)) {
        return res
          .status(400)
          .json({ error: 'Invalid status. Must be 1 or 0' });
      }
      if (status === 1) {
        updateMainTaskStatus(subtask.task_id);
        subtask.deleted_at = new Date();
      }
      subtask.status = status;
    }

    const allSubtasksComplete =
      (await SubTask.find({ id: taskId, status: 0 }).countDocuments()) === 0;

    if (allSubtasksComplete) {
      await Task.updateOne({ _id: subtask.task_id }, { status: 'DONE' });
    }

    // Save the updated task
    await subtask.save();

    res.status(200).json(subtask);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getAllsubTasks(req, res) {
  const { task_id } = req.query;

  try {
    // Check if the provided taskId is a valid ObjectId
    if (task_id && !mongoose.Types.ObjectId.isValid(task_id)) {
      return res.status(400).json({ error: 'Invalid taskId' });
    }
    // Find all subtasks for the given taskId
    const filter = { is_deleted: false };
    if (task_id) filter.task_id = task_id;

    // Find all subtasks based on the filter
    const subtasks = await SubTask.find(filter);

    res.status(200).json(subtasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deleteSubTasks(req, res) {
  const id = req.params.subtaskid;

  try {
    // Find the task by taskId
    const subtask = await SubTask.findOne({ id });
    if (!subtask) {
      return res.status(404).json({ error: 'subTask not found' });
    }

    // Soft delete the subtask
    subtask.is_deleted = true;
    subtask.deleted_at = new Date();

    // Save the updated task
    await subtask.save();

    res.status(200).json({ message: 'subTask soft deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports = {
  createSubtask,
  updateSubTask,
  getAllsubTasks,
  deleteSubTasks,
};
