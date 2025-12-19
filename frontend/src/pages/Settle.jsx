import api from "../api/api";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { successToast, errorToast, infoToast } from "../utils/toast";

export default function Settle() {
  const [balances, setBalances] = useState([]);
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [settlingId, setSettlingId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [meRes, balRes] = await Promise.all([
        api.get("/auth/me"),
        api.get("/balances")
      ]);

      setMe(meRes.data);
      setBalances(balRes.data);
    } catch (err) {
      errorToast("Session expired. Please login again.");
    } finally {
      setLoading(false);
    }
  };

  const settle = async (b) => {
    try {
      setSettlingId(b.id);

      await api.post("/settlements", null, {
        params: {
          groupId: b.group.id,
          toUserId: b.toUser.id
        }
      });

      setBalances(prev => prev.filter(x => x.id !== b.id));
      successToast(`Settled ₹${b.amount} with ${b.toUser.name}`);
    } catch {
      errorToast("Failed to settle balance");
    } finally {
      setSettlingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-indigo-600 font-semibold">
        Loading settlements...
      </div>
    );
  }

  if (!me) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-semibold">
        Not logged in
      </div>
    );
  }

  const myBalances = balances.filter(b => b.fromUser.id === me.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto">

        <h2 className="text-3xl font-extrabold text-indigo-700 mb-8">
          Settle Balances
        </h2>

        {myBalances.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-8 text-center"
          >
            <p className="text-xl font-semibold text-green-600">
              No pending balances
            </p>
            <p className="text-gray-500 mt-2">
              You are all settled up.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {myBalances.map((b, index) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-medium text-gray-800">
                    You owe{" "}
                    <span className="font-bold text-indigo-700">
                      {b.toUser.name}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Group: {b.group.name}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <span className="text-xl font-extrabold text-red-600">
                    ₹{b.amount}
                  </span>

                  <button
                    onClick={() => settle(b)}
                    disabled={settlingId === b.id}
                    className={`px-6 py-2 rounded-full font-semibold text-white transition-all
                      ${settlingId === b.id
                        ? "bg-indigo-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.05]"
                      }`}
                  >
                    {settlingId === b.id ? "Settling..." : "Settle"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
