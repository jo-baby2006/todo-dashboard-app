import { useEffect, useState } from 'react';
import { createTask, deleteTask, fetchTasks, updateTask } from '../services/api';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const loadTasks = async () => {
    try {
      const response = await fetchTasks();
      setTasks(response);
    } catch (loadingError) {
      console.error('Unable to fetch tasks:', loadingError);
      setError('Unable to load tasks right now.');
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setError('Please enter a task title.');
      return;
    }

    try {
      setError('');
      const createdTask = await createTask({ title, completed: false });
      setTasks((currentTasks) => [...currentTasks, createdTask]);
      setTitle('');
    } catch (createError) {
      setError('Unable to create the task.');
      console.error(createError);
    }
  };

  const toggleTask = async (task) => {
    try {
      const updatedTask = await updateTask(task.id, {
        title: task.title,
        completed: !task.completed,
      });

      setTasks((currentTasks) =>
        currentTasks.map((currentTask) =>
          currentTask.id === updatedTask.id ? updatedTask : currentTask
        )
      );
    } catch (updateError) {
      console.error('Unable to update task:', updateError);
    }
  };

  const removeTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
    } catch (deleteError) {
      console.error('Unable to delete task:', deleteError);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-blue-200">Task manager</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Tasks</h1>
        <p className="mt-2 text-slate-300">
          Add new tasks and mark them complete as your day progresses.
        </p>
      </div>

      <form onSubmit={handleAddTask} className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
        <div className="flex flex-col gap-3 md:flex-row">
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Add a new task"
            className="flex-1 rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none"
          />
          <button
            type="submit"
            className="rounded-xl bg-blue-500 px-4 py-3 font-medium text-white transition hover:bg-blue-400"
          >
            Add task
          </button>
        </div>
        {error && <p className="mt-3 text-sm text-rose-300">{error}</p>}
      </form>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className={`text-lg font-medium ${task.completed ? 'text-emerald-200 line-through' : 'text-white'}`}>
                  {task.title}
                </p>
                <p className="text-sm text-slate-400">{new Date(task.createdAt).toLocaleString()}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleTask(task)}
                  className={`rounded-xl px-4 py-2 text-sm ${
                    task.completed
                      ? 'bg-slate-700 text-white'
                      : 'bg-emerald-500 text-white'
                  }`}
                >
                  {task.completed ? 'Mark pending' : 'Mark done'}
                </button>
                <button
                  onClick={() => removeTask(task.id)}
                  className="rounded-xl bg-rose-500 px-4 py-2 text-sm text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;