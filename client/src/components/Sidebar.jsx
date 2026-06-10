import { NavLink } from 'react-router-dom';

const links = [
  { label: 'Dashboard', to: '/' },
  { label: 'Tasks', to: '/tasks' },
  { label: 'Calendar', to: '/calendar' },
  { label: 'Analytics', to: '/analytics' },
];

function Sidebar() {
  return (
    <aside className="w-64 border-r border-white/10 bg-slate-950/90 p-4">
      <div className="rounded-2xl bg-white/5 p-4">
        <p className="text-xs uppercase tracking-[0.25em] text-blue-200">Quick actions</p>
        <p className="mt-3 text-sm text-slate-300">
          Keep your planning simple with a clean view of your tasks, schedule, and progress.
        </p>
      </div>

      <nav className="mt-6 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block rounded-xl px-4 py-3 text-sm transition ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-200 hover:bg-white/5'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;