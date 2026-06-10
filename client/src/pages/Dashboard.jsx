import { useEffect, useState } from 'react';
import { fetchTasks } from '../services/api';

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await fetchTasks();
        setTasks(response);
      } catch (error) {
        console.error('Unable to load tasks:', error);
      }
    };

    loadTasks();
  }, []);

  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.length - completedCount;
  const completionRate = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-blue-200">Welcome back</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Dashboard</h1>
        <p className="mt-2 text-slate-300">
          Track your work, review progress, and keep your tasks moving forward.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
          <p className="text-sm text-slate-300">Total tasks</p>
          <p className="mt-3 text-3xl font-semibold text-white">{tasks.length}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
          <p className="text-sm text-slate-300">Completed</p>
          <p className="mt-3 text-3xl font-semibold text-emerald-300">{completedCount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
          <p className="text-sm text-slate-300">Pending</p>
          <p className="mt-3 text-3xl font-semibold text-amber-300">{pendingCount}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-300">Completion rate</p>
            <p className="mt-2 text-3xl font-semibold text-white">{completionRate}%</p>
          </div>
          <div className="w-1/2 rounded-full bg-slate-800">
            <div
              className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 py-2"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
        <h2 className="text-lg font-semibold text-white">Recent tasks</h2>
        <div className="mt-4 space-y-3">
          {tasks.slice(0, 4).map((task) => (
            <div key={task.id} className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
              <div>
                <p className="font-medium text-white">{task.title}</p>
                <p className="text-sm text-slate-400">Created: {new Date(task.createdAt).toLocaleString()}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-sm ${task.completed ? 'bg-emerald-500/20 text-emerald-200' : 'bg-amber-500/20 text-amber-100'}`}>
                {task.completed ? 'Done' : 'In progress'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;