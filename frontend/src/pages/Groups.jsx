import api from "../api/api";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { successToast, errorToast } from "../utils/toast";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groupId, setGroupId] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    try {
      const [groupsRes, usersRes] = await Promise.all([
        api.get("/groups"),
        api.get("/auth/users")
      ]);
      setGroups(groupsRes.data);
      setUsers(usersRes.data);
    } catch {
      errorToast("Failed to load groups or users");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const createGroup = async () => {
    if (!groupName) {
      errorToast("Group name is required");
      return;
    }

    try {
      setLoading(true);
      await api.post("/groups", null, { params: { name: groupName } });
      successToast("Group created successfully");
      setGroupName("");
      loadData();
    } catch {
      errorToast("Failed to create group");
    } finally {
      setLoading(false);
    }
  };

  const addUser = async () => {
    if (!groupId || !userId) {
      errorToast("Select both group and user");
      return;
    }

    try {
      setLoading(true);
      await api.post(`/groups/${groupId}/add`, null, {
        params: { userId }
      });
      successToast("User added to group");
      setGroupId("");
      setUserId("");
      loadData();
    } catch {
      errorToast("Failed to add user to group");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* CREATE GROUP */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-xl"
        >
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">
            Create Group
          </h2>

          <div className="flex gap-4">
            <input
              placeholder="Group name"
              value={groupName}
              onChange={e => setGroupName(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />

            <button
              onClick={createGroup}
              disabled={loading}
              className={`px-6 rounded-xl text-white font-semibold transition-all
                ${loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.03]"
                }`}
            >
              Create
            </button>
          </div>
        </motion.div>

        {/* ADD USER TO GROUP */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-xl"
        >
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">
            Add User to Group
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            <select
              value={groupId}
              onChange={e => setGroupId(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Group</option>
              {groups.map(g => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>

            <select
              value={userId}
              onChange={e => setUserId(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select User</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>

            <button
              onClick={addUser}
              disabled={loading}
              className={`rounded-xl text-white font-semibold transition-all
                ${loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.03]"
                }`}
            >
              Add User
            </button>
          </div>
        </motion.div>

        {/* GROUPS LIST */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            My Groups
          </h2>

          {groups.length === 0 ? (
            <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
              No groups created yet
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((g, index) => (
                <motion.div
                  key={g.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-purple-500"
                >
                  <h3 className="text-lg font-bold text-purple-700">
                    {g.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Members: {g.members?.length || "N/A"}
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
