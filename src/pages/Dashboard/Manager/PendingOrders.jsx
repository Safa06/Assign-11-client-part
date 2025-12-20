import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/pending-orders")
      .then((res) => setOrders(res.data));
  }, []);

  const updateStatus = (id, status) => {
    axios
      .patch(`http://localhost:5000/pending-orders/${id}`, { status })
      .then(() => {
        setOrders((prev) => prev.filter((o) => o._id !== id));
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Pending Orders</h2>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Order ID</th>
            <th className="border p-2">User</th>
            <th className="border p-2">Product</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="border p-2">{order._id}</td>
              <td className="border p-2">{order.email}</td>
              <td className="border p-2">{order.productTitle}</td>
              <td className="border p-2">{order.quantity}</td>
              <td className="border p-2">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
              <td className="border p-2 space-x-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1"
                  onClick={() =>
                    navigate(`/dashboard/orders/details/${order._id}`)
                  }
                >
                  View
                </button>

                <button
                  className="bg-green-600 text-white px-2 py-1"
                  onClick={() => updateStatus(order._id, "Approved")}
                >
                  Approve
                </button>

                <button
                  className="bg-red-600 text-white px-2 py-1"
                  onClick={() => updateStatus(order._id, "Rejected")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingOrders;
