// app.js
const mongoose = require('mongoose');

// Create SubTask Schema
const subTaskSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  task_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true,
  },
  status: { type: Number, enum: [0, 1], default: 0 }, // 0 - incomplete, 1 - complete
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
  is_deleted: {
    type: Boolean,
    default: false,
  },
});

// Create SubTask Model
const SubTask = mongoose.model('SubTask', subTaskSchema);

// Export SubTask model
module.exports = SubTask;
