import api from "../api/api";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { successToast, errorToast } from "../utils/toast";

export default function Expenses() {
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupId, setGroupId] = useState("");
  const [amount, setAmount] = useState("");
  const [participants, setParticipants] = useState([]);
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

  const toggleParticipant = id => {
    setParticipants(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  const addExpense = async () => {
    if (!groupId || !amount || participants.length === 0) {
      errorToast("Select group, amount, and participants");
      return;
    }

    try {
      setLoading(true);

      await api.post("/expenses", participants, {
        params: { groupId, amount }
      });

      successToast("Expense added successfully");
      setGroupId("");
      setAmount("");
      setParticipants([]);

    } catch {
      errorToast("Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-xl"
        >
          <h2 className="text-2xl font-bold text-indigo-700 mb-6">
            Add Expense
          </h2>

          {/* GROUP & AMOUNT */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
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

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* PARTICIPANTS */}
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Select Participants
          </h3>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
            {users.map(u => (
              <motion.label
                key={u.id}
                whileHover={{ scale: 1.03 }}
                className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer border transition
                  ${participants.includes(u.id)
                    ? "bg-indigo-50 border-indigo-500"
                    : "bg-white border-gray-300"
                  }`}
              >
                <input
                  type="checkbox"
                  checked={participants.includes(u.id)}
                  onChange={() => toggleParticipant(u.id)}
                  className="accent-indigo-600"
                />
                <span className="font-medium text-gray-700">
                  {u.name}
                </span>
              </motion.label>
            ))}
          </div>

          {/* BOTTOM BUTTON */}
          <div className="flex justify-center">
            <button
              onClick={addExpense}
              disabled={loading}
              className={`w-full md:w-1/2 py-4 rounded-2xl text-lg font-bold text-white transition-all
                ${loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.02] shadow-lg"
                }`}
            >
              {loading ? "Adding Expense..." : "Add Expense"}
            </button>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
