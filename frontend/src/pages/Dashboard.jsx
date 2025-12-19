import api from "../api/api";
import { useEffect, useState } from "react";
import { infoToast, errorToast } from "../utils/toast";

export default function Dashboard() {
  const [groups, setGroups] = useState([]);
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [groupsRes, balancesRes] = await Promise.all([
          api.get("/groups"),
          api.get("/balances")
        ]);

        setGroups(groupsRes.data);
        setBalances(balancesRes.data);
        

      } catch (err) {
        errorToast("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const totalYouOwe = balances
    .filter(b => b.fromUser.isCurrentUser)
    .reduce((sum, b) => sum + b.amount, 0);

  const totalYouGet = balances
    .filter(b => b.toUser.isCurrentUser)
    .reduce((sum, b) => sum + b.amount, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-indigo-600 font-semibold">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-8 space-y-10 bg-gray-50 min-h-screen">

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard title="Groups" value={groups.length} />
        <SummaryCard title="You Owe" value={`₹${totalYouOwe}`} negative />
        <SummaryCard title="You Get" value={`₹${totalYouGet}`} positive />
      </div>

      {/* GROUPS */}
      <Section title="My Groups">
        {groups.length === 0 ? (
          <EmptyState message="You are not part of any group yet." />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups.map(group => (
              <div
                key={group.id}
                className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-indigo-700 text-lg">
                  {group.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Members: {group.members?.length || "N/A"}
                </p>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* BALANCES */}
      <Section title="Outstanding Balances">
        {balances.length === 0 ? (
          <EmptyState message="No pending balances. All settled." />
        ) : (
          <div className="space-y-3">
            {balances.map(b => (
              <div
                key={b.id}
                className="flex justify-between items-center bg-white rounded-xl shadow p-4"
              >
                <div>
                  <p className="font-medium">
                    {b.fromUser.name} owes {b.toUser.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Group: {b.group.name}
                  </p>
                </div>

                <span className="text-lg font-bold text-red-600">
                  ₹{b.amount}
                </span>
              </div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}

/* ---------- Helper Components ---------- */

function SummaryCard({ title, value, positive, negative }) {
  return (
    <div
      className={`rounded-2xl p-6 shadow-lg text-white
        ${positive ? "bg-green-500" : ""}
        ${negative ? "bg-red-500" : ""}
        ${!positive && !negative ? "bg-indigo-600" : ""}
      `}
    >
      <p className="text-sm uppercase tracking-wide">{title}</p>
      <h3 className="text-3xl font-extrabold mt-2">{value}</h3>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      {children}
    </div>
  );
}

function EmptyState({ message }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-gray-500 text-center">
      {message}
    </div>
  );
}
