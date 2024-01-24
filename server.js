const express = require('express');
const { mongoConnect } = require('./services/mongo');
const { UserRouter } = require('./routes/user/user.router');
const { TaskRouter } = require('./routes/tasks/task.router');
const { subtaskRouter } = require('./routes/tasks/subtask.router');

const authenticate = require('./middlewares/authenticate');
const runCron = require('./cronjobs/prioritySetter');
const PORT = 3000;
const app = express();
require('dotenv').config();

app.use(express.json());

// authentication middleware
app.use('/v1', authenticate);

// Routers
app.use('/v1', TaskRouter);
app.use('/v1', subtaskRouter);
app.use('/', UserRouter);

// cron-job
runCron();

async function startServer() {
  await mongoConnect();
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

startServer();
