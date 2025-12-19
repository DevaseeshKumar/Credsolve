import { Link, NavLink } from "react-router-dom";

export default function HomeNavbar() {
  return (
    <nav className="w-full bg-white shadow-md px-8 py-4 flex justify-between items-center">
      
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-indigo-600">
        CRED Split
      </Link>

      {/* Links */}
      <div className="flex gap-6 text-gray-700 font-medium">
        <NavLink to="/" className="hover:text-indigo-600">
          Home
        </NavLink>

        <NavLink to="/login" className="hover:text-indigo-600">
          Login
        </NavLink>

        <NavLink to="/register" className="hover:text-indigo-600">
          Register
        </NavLink>
      </div>
    </nav>
  );
}
