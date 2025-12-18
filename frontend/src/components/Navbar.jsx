import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass =
    "px-4 py-2 rounded-md text-sm font-medium transition hover:bg-indigo-600";

  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-wide text-indigo-400">
          Expense Splitter
        </h1>

        <div className="flex gap-3">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/users" className={linkClass}>Users</NavLink>
          <NavLink to="/groups" className={linkClass}>Groups</NavLink>
          <NavLink to="/expenses" className={linkClass}>Expenses</NavLink>
          <NavLink to="/settle" className={linkClass}>Settle</NavLink>
        </div>
      </div>
    </nav>
  );
}
