import { NavLink, useNavigate } from "react-router-dom";
import { successToast } from "../utils/toast";
export default function Navbar({ type }) {
  const navigate = useNavigate();

   const logout = () => {
    localStorage.removeItem("user");
    successToast("Logged out successfully");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `relative px-3 py-2 font-medium transition-all duration-300
     ${isActive ? "text-white" : "text-indigo-100 hover:text-white"}
     after:absolute after:left-0 after:-bottom-1 after:h-[2px]
     after:w-full after:scale-x-0 after:bg-white
     after:transition-transform after:duration-300
     hover:after:scale-x-100`;

  if (type === "public") {
    return (
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 shadow-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <NavLink to="/home" className="text-2xl font-bold text-white">
          Credsolve
        </NavLink>

        <div className="flex items-center gap-8">
          <NavLink to="/login" className={linkClass}>Login</NavLink>
          <NavLink to="/register" className={linkClass}>Register</NavLink>
          <NavLink to="/about" className={linkClass}>About Us</NavLink>
          
        </div>
      </div>
    </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 shadow-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <NavLink to="/dashboard" className="text-2xl font-bold text-white">
          Dashboard
        </NavLink>

        <div className="flex items-center gap-8">
          <NavLink to="/users" className={linkClass}>Users</NavLink>
          <NavLink to="/groups" className={linkClass}>Groups</NavLink>
          <NavLink to="/expenses" className={linkClass}>Expenses</NavLink>
          <NavLink to="/settle" className={linkClass}>Settle</NavLink>
          <NavLink to="/history" className={linkClass}>History</NavLink>

          <button
            onClick={logout}
            className="ml-4 bg-white/90 text-indigo-700 px-4 py-2 rounded-full font-semibold
                       hover:bg-white transition-all duration-300 shadow-md"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
