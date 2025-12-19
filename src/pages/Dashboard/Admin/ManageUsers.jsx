import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  // Update user role (admin / suspend)
  const handleRoleChange = (userId, newRole) => {
    Swal.fire({
      title: `Are you sure to set role as ${newRole}?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${userId}`, { role: newRole }).then(() => {
          Swal.fire("Updated!", "", "success");
          // refresh users
          axiosSecure.get("/users").then((res) => setUsers(res.data));
        });
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <table className="table-auto border w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">
                <button
                  className="btn btn-sm btn-green mr-2"
                  onClick={() => handleRoleChange(user._id, "admin")}
                >
                  Make Admin
                </button>
                <button
                  className="btn btn-sm btn-red"
                  onClick={() => handleRoleChange(user._id, "suspended")}
                >
                  Suspend
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
