import api from "../api/api";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { errorToast, infoToast } from "../utils/toast";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await api.get("/settlements/history");
      setHistory(res.data);
      
    } catch {
      errorToast("Failed to load settlement history");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-indigo-600 font-semibold">
        Loading settlement history...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto">

        <h2 className="text-3xl font-extrabold text-indigo-700 mb-8">
          Settlement History
        </h2>

        {history.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-8 text-center"
          >
            <p className="text-xl font-semibold text-gray-600">
              No settlements yet
            </p>
            <p className="text-gray-400 mt-2">
              Your settlement activity will appear here.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {history.map((h, index) => (
              <motion.div
                key={h.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-medium text-gray-800">
                    <span className="font-bold text-indigo-700">
                      {h.fromUser.name}
                    </span>{" "}
                    paid{" "}
                    <span className="font-bold text-indigo-700">
                      {h.toUser.name}
                    </span>
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Group: {h.group.name}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xl font-extrabold text-green-600">
                    ₹{h.amount}
                  </p>
                  {h.createdAt && (
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(h.createdAt).toLocaleString()}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
