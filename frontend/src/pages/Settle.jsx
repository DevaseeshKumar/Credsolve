import { useEffect, useState } from "react";
import api from "../api/api";

export default function Settle() {
  const [users, setUsers] = useState([]);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState(0);

  const loadUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  const loadBalance = async () => {
    if (from && to) {
      const res = await api.get(`/balances?from=${from}&to=${to}`);
      setAmount(res.data);
    }
  };

  const settle = async () => {
    if (!from || !to || amount <= 0) {
      return alert("No balance to settle");
    }

    try {
      await api.post(`/settle?from=${from}&to=${to}&amount=${amount}`);
      alert("Settlement completed");
      setFrom("");
      setTo("");
      setAmount(0);
    } catch (err) {
      alert(err.response?.data || "Settlement failed");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    loadBalance();
  }, [from, to]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-lg space-y-5">

        <h2 className="text-xl font-semibold">Settle Balance</h2>

        {/* From */}
        <select className="input" value={from} onChange={e => setFrom(e.target.value)}>
          <option value="">From (Debtor)</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>

        {/* To */}
        <select className="input" value={to} onChange={e => setTo(e.target.value)}>
          <option value="">To (Creditor)</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>

        {/* Auto-filled Amount */}
        <input
          className="input bg-gray-100 cursor-not-allowed"
          value={amount}
          disabled
        />

        <button className="btn w-full" onClick={settle} disabled={amount <= 0}>
          Settle ₹{amount}
        </button>

        {amount === 0 && from && to && (
          <p className="text-sm text-gray-500 text-center">
            No outstanding balance between selected users
          </p>
        )}
      </div>
    </div>
  );
}
