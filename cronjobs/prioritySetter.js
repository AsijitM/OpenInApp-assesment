const cron = require('node-cron');
const Task = require('../models/TaskModel');

// Import your Mongoose model (assuming it's named 'Task')

// Define a cron job to update task priorities based on due_date
function runCron() {
  cron.schedule('0 0 * * *', async () => {
    // Run this cron job every day at midnight

    try {
      const today = new Date();

      // Find tasks with due_date equal to today
      const todayTasks = await Task.find({
        due_date: { $lte: today, $gte: today.setHours(0, 0, 0, 0) },
      });

      // Update priority for today's tasks to 0
      await Task.updateMany(
        { _id: { $in: todayTasks.map((task) => task._id) } },
        { priority: 0 }
      );

      // Find tasks with due_date between tomorrow and the day after tomorrow
      const tomorrowTasks = await Task.find({
        due_date: {
          $gte: today.setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000,
          $lt: today.setHours(0, 0, 0, 0) + 2 * 24 * 60 * 60 * 1000,
        },
      });

      // Update priority for tomorrow's tasks to 1
      await Task.updateMany(
        { _id: { $in: tomorrowTasks.map((task) => task._id) } },
        { priority: 1 }
      );

      // Find tasks with due_date between 3 and 4 days from today
      const threeToFourDaysTasks = await Task.find({
        due_date: {
          $gte: today.setHours(0, 0, 0, 0) + 3 * 24 * 60 * 60 * 1000,
          $lt: today.setHours(0, 0, 0, 0) + 4 * 24 * 60 * 60 * 1000,
        },
      });

      // Update priority for tasks with due_date 3 to 4 days from today to 2
      await Task.updateMany(
        { _id: { $in: threeToFourDaysTasks.map((task) => task._id) } },
        { priority: 2 }
      );

      // Find tasks with due_date 5 days or more from today
      const fivePlusDaysTasks = await Task.find({
        due_date: { $gt: today.setHours(0, 0, 0, 0) + 4 * 24 * 60 * 60 * 1000 },
      });

      // Update priority for tasks with due_date 5 days or more from today to 3
      await Task.updateMany(
        { _id: { $in: fivePlusDaysTasks.map((task) => task._id) } },
        { priority: 3 }
      );

      console.log('Task priorities updated successfully.');
    } catch (error) {
      console.error('Error updating task priorities:', error);
    }
  });
}

module.exports = runCron;
