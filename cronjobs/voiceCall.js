const cron = require('node-cron');
const twilio = require('twilio');

const mongoose = require('mongoose');
const User = require('../models/UserModel');
const Task = require('../models/TaskModel');
require('dotenv').config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.ACCOUNT_AUTH_TOKEN;

const twilioClient = twilio(accountSid, authToken);
const makeVoiceCall = async (user, task) => {
  try {

    await twilioClient.calls.create({
      twiml:
        '<Response><Say>Unfortunately, the deadline for the project has not been achieved as initially planned.</Say></Response>',
      to: user.phone_number,
      from: '+19854668758',
    });

    console.log(`Voice call made to user ${user.name} for task ${task.title}`);
  } catch (error) {
    console.error('Error making voice call:', error);
  }
};


const fetchUsersAndMakeVoiceCalls = async (currentIndex = 0) => {
  try {
    // Fetch all users and sort them by priority
    const users = await User.find().sort({ priority: 'asc' });

    if (currentIndex < users.length) {
      const user = users[currentIndex];


      const tasks = await Task.find({
        user_id: user.id,
        status: 'TODO',
        is_deleted: false,
      });

      // Check if any task's due_date has passed
      const hasOverdueTask = tasks.some((task) => task.due_date <= new Date());

      if (hasOverdueTask) {
        // Make a voice call to the user
        await makeVoiceCall(user, tasks[0]); // Assuming you want to call for the first task
        console.log(
          `Voice call made to user with priority ${user.priority}: ${user.name}`
        );
      }

      // Continue to the next user if the current one did not attend the call
      if (currentIndex < users.length - 1) {
        await fetchUsersAndMakeVoiceCalls(currentIndex + 1);
      } else {
        console.log('Voice calls completed.');
      }
    }
  } catch (error) {
    console.error('Error fetching users and making voice calls:', error);
  }
};

// Schedule calls
const scheduleVoiceCalls = () => {
  // Schedule the cron job to run every day at 9 am
  cron.schedule('0 9 * * *', async () => {
    try {
      console.log('Scheduled voice calls initiated.');
      await fetchUsersAndMakeVoiceCalls();
    } catch (error) {
      console.error('Error initiating scheduled voice calls:', error);
    }
  });
};


module.exports = {
  scheduleVoiceCalls,
};
