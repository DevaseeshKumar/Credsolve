import { useEffect, useState } from "react";
import api from "../api/api";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupName, setGroupName] = useState("");

  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const loadGroups = async () => {
    const res = await api.get("/groups/viewgroups");
    setGroups(res.data);
  };

  const loadUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  const createGroup = async () => {
    if (!groupName) return alert("Enter group name");
    await api.post("/groups", { name: groupName });
    setGroupName("");
    loadGroups();
  };

  const addUserToGroup = async () => {
    if (!selectedGroup || !selectedUser) {
      return alert("Select both group and user");
    }

    await api.post(`/groups/${selectedGroup}/add/${selectedUser}`);
    setSelectedGroup("");
    setSelectedUser("");
    loadGroups();
  };

  useEffect(() => {
    loadGroups();
    loadUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Create Group */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Create Group</h2>
          <div className="flex gap-4">
            <input
              className="input"
              placeholder="Group Name"
              value={groupName}
              onChange={e => setGroupName(e.target.value)}
            />
            <button className="btn" onClick={createGroup}>
              Create
            </button>
          </div>
        </div>

        {/* Add Member Using Dropdowns */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Add Member to Group</h2>

          <div className="grid grid-cols-2 gap-4">
            <select
              className="input"
              value={selectedGroup}
              onChange={e => setSelectedGroup(e.target.value)}
            >
              <option value="">Select Group</option>
              {groups.map(g => (
                <option key={g.id} value={g.id}>
                  {g.name} (ID: {g.id})
                </option>
              ))}
            </select>

            <select
              className="input"
              value={selectedUser}
              onChange={e => setSelectedUser(e.target.value)}
            >
              <option value="">Select User</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name} (ID: {u.id})
                </option>
              ))}
            </select>
          </div>

          <button className="btn mt-4" onClick={addUserToGroup}>
            Add User
          </button>
        </div>

        {/* View Groups */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Groups</h2>

          {groups.map(g => (
            <div key={g.id} className="border rounded p-4 mb-4">
              <strong className="text-indigo-600">
                {g.name} (ID: {g.id})
              </strong>

              {g.members.length === 0 ? (
                <p className="text-gray-500 mt-2">No members yet</p>
              ) : (
                <ul className="ml-4 mt-2 list-disc">
                  {g.members.map(m => (
                    <li key={m.id}>
                      {m.name} (ID: {m.id})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
