import { useEffect, useState } from "react";
import api from "../api/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const loadUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  const createUser = async () => {
    if (!name || !email) return;
    await api.post("/users", { name, email });
    setName("");
    setEmail("");
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Create User</h2>
          <div className="flex gap-4">
            <input className="input" placeholder="Name" value={name}
              onChange={e => setName(e.target.value)} />
            <input className="input" placeholder="Email" value={email}
              onChange={e => setEmail(e.target.value)} />
            <button className="btn" onClick={createUser}>Add</button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          <ul className="space-y-2">
            {users.map(u => (
              <li key={u.id} className="p-3 bg-gray-50 rounded">
                <strong>{u.id}</strong> — {u.name} ({u.email})
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
