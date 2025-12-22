import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const AdminAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://assignment11-eight-swart.vercel.app/all-orders")
      .then((res) => {
        setOrders(res.data);
      });
  }, []);

  const handleView = (orderId) => {
    navigate(`/dashboard/orders/details/${orderId}`);
  };

  const handleStatusChange = (orderId, newStatus) => {
    Swal.fire({
      title: `Are you sure?`,
      text: `You want to ${newStatus} this order`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: newStatus === "Approved" ? "#16a34a" : "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, ${newStatus}`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(
            `https://assignment11-eight-swart.vercel.app/all-orders/${orderId}`,
            {
              status: newStatus,
            }
          )
          .then(() => {
            setOrders((prev) =>
              prev.map((o) =>
                o._id === orderId ? { ...o, status: newStatus } : o
              )
            );

            Swal.fire({
              icon: "success",
              title: "Updated!",
              text: `Order has been ${newStatus}`,
              timer: 1500,
              showConfirmButton: false,
            });
          });
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl text-green-800 font-bold mb-4">All Orders</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-400">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-400 px-4 py-2">Order ID</th>
              <th className="border border-gray-400 px-4 py-2">User</th>
              <th className="border border-gray-400 px-4 py-2">Product</th>
              <th className="border border-gray-400 px-4 py-2">Quantity</th>
              <th className="border border-gray-400 px-4 py-2">Status</th>
              <th className="border border-gray-400 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="border border-gray-400 px-4 py-2">
                  {order._id}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {order.email}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {order.productTitle}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {order.quantity}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {order.status}
                </td>
                <td className="border border-gray-400 px-4 py-2 space-x-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded m-2 font-semibold"
                    onClick={() => handleView(order._id)}
                  >
                    View
                  </button>
                  <button
                    className="bg-green-700 text-white px-2 py-1 rounded m-2 font-semibold"
                    onClick={() => handleStatusChange(order._id, "Approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded m-2 font-semibold"
                    onClick={() => handleStatusChange(order._id, "Rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAllOrders;
