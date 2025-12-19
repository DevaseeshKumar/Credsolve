import { NavLink, useNavigate } from "react-router-dom";

export default function DashboardNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear session / localStorage
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="w-full bg-indigo-600 text-white px-8 py-4 flex justify-between items-center">
      
      {/* Logo */}
      <NavLink to="/dashboard" className="text-2xl font-bold">
        Dashboard
      </NavLink>

      {/* Links */}
      <div className="flex gap-6 font-medium">
        <NavLink to="/dashboard/groups" className="hover:text-indigo-200">
          Groups
        </NavLink>

        <NavLink to="/dashboard/expenses" className="hover:text-indigo-200">
          Expenses
        </NavLink>

        <NavLink to="/dashboard/settlements" className="hover:text-indigo-200">
          Settlements
        </NavLink>

        <button
          onClick={handleLogout}
          className="bg-white text-indigo-600 px-4 py-1 rounded hover:bg-indigo-100"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
