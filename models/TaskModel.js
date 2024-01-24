// app.js
const mongoose = require('mongoose');

// Create Task Schema
const taskSchema = new mongoose.Schema({
  user_id: Number,
  task_id: { type: Number, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  due_date: { type: Date, required: true },
  priority: {
    type: Number,
    validate: {
      validator: function (value) {
        return [0, 1, 2, 3].includes(value);
      },
      message: 'Priority must be 0, 1, 2, or 3',
    },
    default: 0,
  },
  status: {
    type: String,
    enum: ['TODO', 'IN_PROGRESS', 'DONE'],
    default: 'TODO',
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
});

// Create Task Model
const Task = mongoose.model('Task', taskSchema);

// Export Task model
module.exports = Task;
