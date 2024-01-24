const cron = require('node-cron');
const Task = require('../models/TaskModel');


function runCron() {
  cron.schedule('0 0 * * *', async () => {
    // Run this cron job every day at midnight

    try {
      const today = new Date();


      const todayTasks = await Task.find({
        due_date: { $lte: today, $gte: today.setHours(0, 0, 0, 0) },
      });


      await Task.updateMany(
        { _id: { $in: todayTasks.map((task) => task._id) } },
        { priority: 0 }
      );


      const tomorrowTasks = await Task.find({
        due_date: {
          $gte: today.setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000,
          $lt: today.setHours(0, 0, 0, 0) + 2 * 24 * 60 * 60 * 1000,
        },
      });

      await Task.updateMany(
        { _id: { $in: tomorrowTasks.map((task) => task._id) } },
        { priority: 1 }
      );


      const threeToFourDaysTasks = await Task.find({
        due_date: {
          $gte: today.setHours(0, 0, 0, 0) + 3 * 24 * 60 * 60 * 1000,
          $lt: today.setHours(0, 0, 0, 0) + 4 * 24 * 60 * 60 * 1000,
        },
      });


      await Task.updateMany(
        { _id: { $in: threeToFourDaysTasks.map((task) => task._id) } },
        { priority: 2 }
      );


      const fivePlusDaysTasks = await Task.find({
        due_date: { $gt: today.setHours(0, 0, 0, 0) + 4 * 24 * 60 * 60 * 1000 },
      });

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
