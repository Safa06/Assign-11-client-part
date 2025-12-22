import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  const fetchPendingOrders = () => {
    axios
      .get("https://assignment11-eight-swart.vercel.app/pending-orders")
      .then((res) => setOrders(res.data))
      .catch(console.error);
  };

  const handleApprove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to approve this order!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, approve!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(
            `https://assignment11-eight-swart.vercel.app/pending-orders/${id}`,
            {
              status: "Approved",
            }
          )
          .then(() => {
            Swal.fire("Approved!", "Order has been approved.", "success");
            fetchPendingOrders();
          })
          .catch(console.error);
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to reject this order!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(
            `https://assignment11-eight-swart.vercel.app/pending-orders/${id}`,
            {
              status: "Rejected",
            }
          )
          .then(() => {
            Swal.fire("Rejected!", "Order has been rejected.", "success");
            fetchPendingOrders();
          })
          .catch(console.error);
      }
    });
  };

  const handleView = (orderId) => {
    navigate(`/dashboard/orders/details/${orderId}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl text-green-800 font-bold mb-4">Pending Orders</h2>
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
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => handleView(order._id)}
                  >
                    View
                  </button>
                  <button
                    className="bg-green-700 text-white px-2 py-1 rounded"
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingOrders;
