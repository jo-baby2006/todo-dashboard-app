const { writeTasks } = require('./utils/excelHelper');

const tasks = [
  { id: 1, title: 'Learn Node.js', completed: false, createdAt: new Date().toISOString() },
  { id: 2, title: 'Build a todo API', completed: false, createdAt: new Date().toISOString() },
];

writeTasks(tasks);
console.log('Seeded tasks.xlsx');
