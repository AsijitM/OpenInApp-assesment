const { check } = require('express-validator');

const validationSchemaForTask = [
  check('title').notEmpty().withMessage('Title is required'),
  check('description').notEmpty().withMessage('Description is required'),
  check('due_date').isISO8601().toDate().withMessage('Invalid due date format'),
];

module.exports = validationSchemaForTask;