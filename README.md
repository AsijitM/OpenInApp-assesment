# Task Management System API Documentation

## Table of Contents

-  Authentication: #authentication

-  Task Operations: #task-operations

-  2.  Create Task: #1-create-task

-  3.  Create Subtask: #2-create-subtask

-  4.  Get User Tasks: #3-get-user-tasks

-  5.  Get User Subtasks: #4-get-user-subtasks

-  6.  Update Task: #5-update-task

-  7.  Update Subtask: #6-update-subtask

-  8.  Delete Task: #7-delete-task

-  9.  Delete Subtask: #8-delete-subtask

-  Cron Jobs: #cron-jobs

-  Cron Logic for Priority: #cron-logic-for-priority

-  Cron Logic for Voice Calling: #cron-logic-for-voice-calling

## Authentication

All API requests require authentication using JWT (JSON Web Token). To generate a JWT token, you can use jwt.io:  [https://jwt.io/](https://jwt.io/) with the user_id payload. Include the generated token in the `Authorization` header of your requests.

Example:

HTTP

```

Authorization: <your_jwt_token>

```

## Task Operations

### 1. Create Task

Create a new task with the specified title, description, and due date.

Endpoint:  `POST /api/tasks`

Request Payload:

JSON

```

{

"title": "Task Title",

"description": "Task Description",

"due_date": "YYYY-MM-DD"

}

```

Response:

-  `201 Created`: Task created successfully.

-  `401 Unauthorized`: Invalid or missing JWT token.

### 2. Create Subtask

Create a subtask for an existing task.

Endpoint:  `POST /api/subtasks`

Request Payload:

JSON

```

{

"task_id": "task_id"

}

```

Response:

-  `201 Created`: Subtask created successfully.

-  `401 Unauthorized`: Invalid or missing JWT token.

-  `404 Not Found`: Task not found.

### 3. Get User Tasks

Retrieve all tasks for the authenticated user with optional filters for priority, due date, and pagination.

Endpoint:  `GET /api/tasks`

Query Parameters:

-  `priority` (optional): Filter by task priority.

-  `due_date` (optional): Filter by due date.

-  `page` (optional): Page number for pagination.

-  `limit` (optional): Number of tasks per page.

Response:

-  `200 OK`: List of tasks.

-  `401 Unauthorized`: Invalid or missing JWT token.

### 4. Get User Subtasks

Retrieve all subtasks for the authenticated user with optional filter by task_id.

Endpoint:  `GET /api/subtasks`

Query Parameters:

-  `task_id` (optional): Filter by task_id.

Response:

-  `200 OK`: List of subtasks.

-  `401 Unauthorized`: Invalid or missing JWT token.

### 5. Update Task

Update an existing task with new due date and status.

Endpoint:  `POST /api/tasks/:task_id`

Request Payload:

JSON

```

{

"due_date": "YYYY-MM-DD",

"status": "TODO/DONE"

}

```

Use code with caution.  [Learn more](https://bard.google.com/faq#coding)

content_copy

Response:

-  `200 OK`: Task updated successfully.

-  `401 Unauthorized`: Invalid or missing JWT token.

-  `404 Not Found`: Task not found.

### 6. Update Subtask

Update the status of an existing subtask.

Endpoint:  `POST /api/subtasks/:subtask_id`

Request Payload:

JSON

```

{

"status": 0/1

}

```

Use code with caution.  [Learn more](https://bard.google.com/faq#coding)

content_copy

Response:

-  `200 OK`: Subtask updated successfully.

-  `401 Unauthorized`: Invalid or missing JWT token.

-  `404 Not Found`: Subtask not found.

### 7. Delete Task

Soft delete an existing task.

Endpoint:  `DELETE /api/tasks/:task_id`

Response:

-  `204 No Content`: Task deleted successfully.

-  `401 Unauthorized`: Invalid or missing JWT token.

-  `404 Not Found`: Task not found.

### 8. Delete Subtask

Soft delete an existing subtask.

Endpoint:  `DELETE /api/subtasks/:subtask_id`

Response:

-  `204 No Content`: Subtask deleted successfully.

-  `401 Unauthorized`: Invalid or missing JWT token.

-  `404 Not Found`: Subtask not found.

## Cron Jobs:

### Cron Logic for Priority

A cron job that changes the priority of a task based on its due date. The specific logic and thresholds can be customized to your needs.

### Cron Logic for Voice Calling

A cron job using Twilio that makes voice calls to users based on the priority and if a task has passed its due date. The call flow and escalation logic can be configured based on your preference.
