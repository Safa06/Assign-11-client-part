// pages/Dashboard/Customer/MyOrders.jsx
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const MyOrders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders for logged-in user
  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/my-orders?email=${user.email}`
      );
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchOrders();
  }, [user]);

  // Delete an order
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/orders/${id}`);
          Swal.fire("Deleted!", "Your order has been deleted.", "success");
          fetchOrders();
        } catch (err) {
          console.error(err);
          Swal.fire("Error!", "Failed to delete order.", "error");
        }
      }
    });
  };

  if (loading) return <div className="text-center mt-20"><LoadingSpinner></LoadingSpinner></div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Product</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Total Price</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="border px-4 py-2">{order.productTitle}</td>
              <td className="border px-4 py-2">{order.quantity}</td>
              <td className="border px-4 py-2">${order.totalPrice}</td>
              <td className="border px-4 py-2">{order.status}</td>
              <td className="border px-4 py-2 flex gap-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => navigate(`orders/details/${order._id}`)}
                >
                  View
                </button>
                {order.status === "Pending" && (
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(order._id)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No orders placed yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
