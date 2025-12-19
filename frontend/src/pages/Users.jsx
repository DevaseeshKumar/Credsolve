import { useEffect, useState } from "react";
import api from "../api/api";
import { motion } from "framer-motion";
import { successToast, errorToast } from "../utils/toast";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    try {
      const res = await api.get("/auth/users");
      setUsers(res.data);
    } catch {
      errorToast("Failed to load users");
    }
  };

  const createUser = async () => {
    if (!name || !email) {
      errorToast("Name and email are required");
      return;
    }

    try {
      setLoading(true);
      await api.post("/users", { name, email });
      successToast("User created successfully");
      setName("");
      setEmail("");
      loadUsers();
    } catch {
      errorToast("Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* CREATE USER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-xl"
        >
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">
            Create User
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />

            <input
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <button
              onClick={createUser}
              disabled={loading}
              className={`rounded-xl text-white font-semibold transition-all
                ${loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.03]"
                }`}
            >
              {loading ? "Adding..." : "Add User"}
            </button>
          </div>
        </motion.div>

        {/* USERS GRID */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Registered Users
          </h2>

          {users.length === 0 ? (
            <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
              No users found
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((u, index) => (
                <motion.div
                  key={u.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-indigo-500"
                >
                  <h3 className="text-lg font-bold text-indigo-700">
                    {u.name}
                  </h3>

                  <p className="text-gray-600 mt-1">{u.email}</p>

                  <p className="text-sm text-gray-400 mt-2">
                    User ID: {u.id}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
