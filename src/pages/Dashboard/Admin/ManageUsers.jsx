import { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  const handleRoleChange = (id, newRole) => {
    axios
      .patch(`http://localhost:5000/users/${id}`, {
        role: newRole,
        status: "active",
      })
      .then(() => {
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, role: newRole } : u))
        );
        alert("Role updated successfully");
      });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl text-green-800 font-bold mb-4">Manage Users</h2>

      <table className="w-full border border-gray-400">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>

              <td className="border p-2">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  className="border px-2 py-1"
                >
                  <option value="customer">User</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </td>

              <td className="border p-2 text-center">
                <span className="text-green-600 font-semibold">Editable</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
