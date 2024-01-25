const express = require('express');
require('dotenv').config();

const { mongoConnect } = require('./services/mongo');
const { UserRouter } = require('./routes/user/user.router');
const { TaskRouter } = require('./routes/tasks/task.router');
const { subtaskRouter } = require('./routes/tasks/subtask.router');
const authenticate = require('./middlewares/authenticate');
const runCron = require('./cronjobs/prioritySetter');
const { scheduleVoiceCalls } = require('./cronjobs/voiceCall');

const PORT = 3000;
const app = express();

app.use(express.json());

// authentication middleware
app.use('/v1', authenticate);

// Routers
app.use('/v1', TaskRouter);
app.use('/v1', subtaskRouter);
app.use('/', UserRouter);

// cron-job
runCron();
scheduleVoiceCalls();

// server Start
async function startServer() {
  await mongoConnect();
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

startServer();
