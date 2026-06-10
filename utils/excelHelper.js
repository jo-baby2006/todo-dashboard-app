const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// This is the path to the Excel file that stores all tasks.
const excelPath = path.join(__dirname, '..', 'data', 'tasks.xlsx');

// Helper: make sure the folder exists before we try to read or write the file.
function ensureDataFolder() {
  const dataFolder = path.dirname(excelPath);

  if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder, { recursive: true });
  }
}

// Helper: create a brand-new Excel workbook if the file does not exist yet.
function createBlankWorkbook() {
  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.aoa_to_sheet([
    ['id', 'title', 'completed', 'createdAt']
  ]);

  XLSX.utils.book_append_sheet(workbook, sheet, 'Tasks');
  XLSX.writeFile(workbook, excelPath);
}

// Read all tasks from tasks.xlsx.
// Returns an array of plain JavaScript objects.
function readTasks() {
  ensureDataFolder();

  if (!fs.existsSync(excelPath)) {
    createBlankWorkbook();
  }

  const workbook = XLSX.readFile(excelPath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Convert the Excel sheet into an array of objects.
  const tasks = XLSX.utils.sheet_to_json(worksheet);

  return tasks;
}

// Write all tasks to tasks.xlsx.
// The input should be an array of task objects.
function writeTasks(tasks) {
  ensureDataFolder();

  const workbook = XLSX.utils.book_new();
  const sheetData = [['id', 'title', 'completed', 'createdAt']];

  // Convert each task into a row.
  tasks.forEach((task) => {
    sheetData.push([
      task.id,
      task.title,
      task.completed,
      task.createdAt
    ]);
  });

  const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Tasks');
  XLSX.writeFile(workbook, excelPath);
}

module.exports = {
  readTasks,
  writeTasks,
};