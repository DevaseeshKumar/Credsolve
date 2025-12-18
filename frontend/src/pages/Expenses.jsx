import { useEffect, useState } from "react";
import api from "../api/api";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);

  const [groupId, setGroupId] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [splitType, setSplitType] = useState("EQUAL");

  const [splits, setSplits] = useState({});

  /* Load data */
  const loadExpenses = async () => {
    const res = await api.get("/expenses/viewexpenses");
    setExpenses(res.data);
  };

  const loadGroups = async () => {
    const res = await api.get("/groups/viewgroups");
    setGroups(res.data);
  };

  const loadUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    loadExpenses();
    loadGroups();
    loadUsers();
  }, []);

  /* Handle split input */
  const updateSplit = (userId, value) => {
    setSplits({ ...splits, [userId]: Number(value) });
  };

  /* Submit expense */
  const submitExpense = async () => {
    if (!groupId || !paidBy || !totalAmount) {
      return alert("Fill all required fields");
    }

    await api.post("/expenses", {
      groupId: Number(groupId),
      paidBy: Number(paidBy),
      totalAmount: Number(totalAmount),
      splitType,
      splits
    });

    setTotalAmount("");
    setSplits({});
    loadExpenses();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Add Expense */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-6">Add Expense</h2>

          <div className="grid grid-cols-2 gap-4">

            {/* Group */}
            <select className="input" value={groupId}
              onChange={e => setGroupId(e.target.value)}>
              <option value="">Select Group</option>
              {groups.map(g => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>

            {/* Paid By */}
            <select className="input" value={paidBy}
              onChange={e => setPaidBy(e.target.value)}>
              <option value="">Paid By</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>

            {/* Amount */}
            <input className="input col-span-2"
              placeholder="Total Amount"
              value={totalAmount}
              onChange={e => setTotalAmount(e.target.value)}
            />

            {/* Split Type */}
            <select className="input col-span-2"
              value={splitType}
              onChange={e => setSplitType(e.target.value)}>
              <option value="EQUAL">EQUAL</option>
              <option value="EXACT">EXACT</option>
              <option value="PERCENTAGE">PERCENTAGE</option>
            </select>
          </div>

          {/* Split Inputs */}
          {splitType !== "EQUAL" && (
            <div className="mt-6">
              <h3 className="font-semibold mb-3">Split Details</h3>

              {users.map(u => (
                <div key={u.id} className="flex gap-4 mb-2">
                  <span className="w-40">{u.name}</span>
                  <input
                    className="input"
                    type="number"
                    placeholder={splitType === "EXACT" ? "Amount" : "Percentage"}
                    onChange={e => updateSplit(u.id, e.target.value)}
                  />
                </div>
              ))}
            </div>
          )}

          <button className="btn mt-6" onClick={submitExpense}>
            Submit Expense
          </button>
        </div>

        {/* View Expenses */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Expenses</h2>
          <ul className="space-y-2">
            {expenses.map(e => (
              <li key={e.id} className="p-3 bg-gray-50 rounded">
                #{e.id} | ₹{e.totalAmount} | Paid by {e.paidBy.name} | {e.splitType}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
