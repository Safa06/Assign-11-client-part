// ManagerPendingOrders.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManagerPendingOrders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch pending orders created by this manager
  useEffect(() => {
    axios
      .get("http://localhost:5000/pending-orders") // backend returns pending orders for manager
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleApprove = (orderId) => {
    Swal.fire({
      title: "Approve this order?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(`http://localhost:5000/pending-orders/${orderId}`, {
            status: "Approved",
          })
          .then(() => {
            setOrders((prev) => prev.filter((order) => order._id !== orderId));
            Swal.fire("Approved!", "Order has been approved.", "success");
          });
      }
    });
  };

  const handleReject = (orderId) => {
    Swal.fire({
      title: "Reject this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(`http://localhost:5000/pending-orders/${orderId}`, {
            status: "Rejected",
          })
          .then(() => {
            setOrders((prev) => prev.filter((order) => order._id !== orderId));
            Swal.fire("Rejected!", "Order has been rejected.", "success");
          });
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pending Orders</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-400">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">Order ID</th>
              <th className="border px-4 py-2">User</th>
              <th className="border px-4 py-2">Product</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Order Date</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="border px-4 py-2">{order._id}</td>
                <td className="border px-4 py-2">{order.email}</td>
                <td className="border px-4 py-2">{order.productTitle}</td>
                <td className="border px-4 py-2">{order.quantity}</td>
                <td className="border px-4 py-2">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    className="bg-green-600 text-white px-2 py-1 rounded"
                    onClick={() => handleApprove(order._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleReject(order._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="border px-4 py-2 text-center text-gray-500"
                >
                  No pending orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerPendingOrders;
