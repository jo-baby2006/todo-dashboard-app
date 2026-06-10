const express = require('express');
const { readTasks, writeTasks } = require('./utils/excelHelper');

// Create the Express app.
const app = express();

// Tell Express to read JSON bodies from POST and PUT requests.
app.use(express.json());

// Use port 3000 by default, or the value from the environment.
const PORT = process.env.PORT || 3000;

// Helper: make sure the task title is present and not just spaces.
function isValidTaskTitle(title) {
  return typeof title === 'string' && title.trim().length > 0;
}

// Helper: convert a route parameter like ':id' into a number.
function getTaskId(requestedId) {
  const parsedId = Number(requestedId);

  if (Number.isNaN(parsedId)) {
    return null;
  }

  return parsedId;
}

// Helper: get the next available task id.
function getNextTaskId(tasks) {
  if (!tasks.length) {
    return 1;
  }

  const highestId = tasks.reduce((maxId, task) => {
    const currentId = Number(task.id);
    return currentId > maxId ? currentId : maxId;
  }, 0);

  return highestId + 1;
}

// GET /api/tasks
// Read all tasks from the Excel file and send them back as JSON.
app.get('/api/tasks', (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

// POST /api/tasks
// Create a new task, save it to tasks.xlsx, and return the saved task.
app.post('/api/tasks', (req, res) => {
  const incomingTask = req.body || {};

  if (!isValidTaskTitle(incomingTask.title)) {
    return res.status(400).json({ error: 'Task title is required.' });
  }

  const currentTasks = readTasks();

  const newTask = {
    id: incomingTask.id ?? getNextTaskId(currentTasks),
    title: incomingTask.title.trim(),
    completed: Boolean(incomingTask.completed),
    createdAt: incomingTask.createdAt ?? new Date().toISOString(),
  };

  const updatedTasks = [...currentTasks, newTask];

  // Save the updated task list to Excel.
  writeTasks(updatedTasks);

  return res.status(201).json(newTask);
});

// PUT /api/tasks/:id
// Find a task by id, update it, and save the updated list back to Excel.
app.put('/api/tasks/:id', (req, res) => {
  const taskId = getTaskId(req.params.id);

  if (taskId === null) {
    return res.status(400).json({ error: 'Task id must be a number.' });
  }

  const incomingTask = req.body || {};

  if (!isValidTaskTitle(incomingTask.title)) {
    return res.status(400).json({ error: 'Task title is required.' });
  }

  const currentTasks = readTasks();
  const taskIndex = currentTasks.findIndex((task) => Number(task.id) === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found.' });
  }

  const updatedTask = {
    ...currentTasks[taskIndex],
    title: incomingTask.title.trim(),
    completed: Boolean(incomingTask.completed),
  };

  currentTasks[taskIndex] = updatedTask;

  // Save the modified tasks back to Excel.
  writeTasks(currentTasks);

  return res.json(updatedTask);
});

// DELETE /api/tasks/:id
// Remove a task by id, save the new list, and return a success message.
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = getTaskId(req.params.id);

  if (taskId === null) {
    return res.status(400).json({ error: 'Task id must be a number.' });
  }

  const currentTasks = readTasks();
  const filteredTasks = currentTasks.filter((task) => Number(task.id) !== taskId);

  if (filteredTasks.length === currentTasks.length) {
    return res.status(404).json({ error: 'Task not found.' });
  }

  // Save the remaining tasks back to Excel.
  writeTasks(filteredTasks);

  return res.json({ message: `Task ${taskId} deleted.` });
});

// Catch-all for unknown routes.
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// Start the server and print a friendly message.
app.listen(PORT, () => {
  console.log(`Express server is running at http://localhost:${PORT}`);
});
