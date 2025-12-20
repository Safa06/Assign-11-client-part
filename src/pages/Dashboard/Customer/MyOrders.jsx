// src/pages/Dashboard/Customer/MyOrders.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const MyOrders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:5000/my-orders?email=${user.email}`)
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user?.email]);

  const handleView = (orderId) => {
    navigate(`/dashboard/track-order/${orderId}`);
  };

  const handleCancel = (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/my-orders/${orderId}`)
          .then(() => {
            setOrders((prev) => prev.filter((o) => o._id !== orderId));
            Swal.fire("Canceled!", "Your order has been canceled.", "success");
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error", "Failed to cancel order.", "error");
          });
      }
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-96">
        <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-blue-500"></div>
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-400">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-400 px-4 py-2">Order ID</th>
              <th className="border border-gray-400 px-4 py-2">Product</th>
              <th className="border border-gray-400 px-4 py-2">Quantity</th>
              <th className="border border-gray-400 px-4 py-2">Status</th>
              <th className="border border-gray-400 px-4 py-2">Payment</th>
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
                  {order.productTitle}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {order.quantity}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {order.status}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {order.paymentMethod || "Cash on Delivery"}
                </td>
                <td className="border border-gray-400 px-4 py-2 space-x-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded font-semibold"
                    onClick={() => handleView(order._id)}
                  >
                    View
                  </button>
                  {order.status === "Pending" && (
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded font-semibold"
                      onClick={() => handleCancel(order._id)}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
