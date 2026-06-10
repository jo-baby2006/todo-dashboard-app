 To-Do Dashboard App

A modern full-stack task management application that helps users organize daily activities, track progress, and monitor productivity through an intuitive dashboard interface. Built with React, Node.js, Express, and Vite, the application provides a clean and responsive experience for managing tasks efficiently.

Features

 Task Management

* Create, view, and manage tasks
* Track task completion status
* Organize daily activities efficiently

Dashboard Overview

* View total tasks at a glance
* Monitor completed and pending tasks
* Track overall productivity metrics

Progress Tracking

* Real-time completion statistics
* Visual progress indicators
* Recent task activity section

Productivity Tools

* Calendar view for task planning
* Analytics dashboard for performance insights
* Responsive and user-friendly interface

Modern UI

* Clean dashboard layout
* Dark-themed design
* Mobile and desktop friendly

How It Works

User creates a task
↓
Task is stored in the backend
↓
Dashboard updates automatically
↓
Task statistics are calculated
↓
Completion rate is displayed
↓
Recent activity is shown in the dashboard

Project Structure

```text
todo-dashboard-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Tasks.jsx
│   │   │   ├── Calendar.jsx
│   │   │   └── Analytics.jsx
│   │   └── services/
│   │       └── api.js
│   └── vite.config.js
│
├── data/
│   └── tasks.xlsx          # Task storage
│
├── utils/
│   └── excelHelper.js      # Excel utility functions
│
├── server.js               # Express backend server
├── seed.js                 # Sample data generator
├── package.json
└── README.md
```

Getting Started

1. Clone the Repository

```bash
git clone https://github.com/jo-baby2006/todo-dashboard-app.git
cd todo-dashboard-app
```

2. Install Dependencies

```bash
npm install
```

3. Install Frontend Dependencies

```bash
cd client
npm install
```

4. Start the Backend Server

```bash
node server.js
```

5. Start the Frontend

```bash
cd client
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

Tech Stack

| Component               | Technology    |
| ----------------------- | ------------- |
| Frontend                | React.js      |
| Build Tool              | Vite          |
| Backend                 | Node.js       |
| Server Framework        | Express.js    |
| Language                | JavaScript    |
| Data Storage            | Excel (.xlsx) |
| Version Control         | Git & GitHub  |
| Development Environment | VS Code       |

Dashboard Modules

| Module    | Description                          |
| --------- | ------------------------------------ |
| Dashboard | Overview of all tasks and progress   |
| Tasks     | Task creation and management         |
| Calendar  | Schedule and task planning           |
| Analytics | Productivity insights and statistics |

Future Improvements

* User Authentication
* MongoDB Database Integration
* Task Priorities
* Due Date Reminders
* Dark/Light Mode Toggle
* Drag-and-Drop Task Management
* Cloud Deployment (Vercel/Render)
* Email Notifications

Requirements

* Node.js 18+
* npm
* Modern Web Browser

