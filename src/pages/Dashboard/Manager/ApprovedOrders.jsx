import { useEffect, useState } from "react";
import axios from "axios";

const ApprovedOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/approved-orders")
      .then((res) => setOrders(res.data));
  }, []);

  const addTracking = (id) => {
    const tracking = {
      status: "Packed",
      location: "Factory",
      note: "Order packed",
    };

    axios
      .patch(`http://localhost:5000/orders/${id}/tracking`, tracking)
      .then(() => alert("Tracking added"));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Approved Orders</h2>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Order ID</th>
            <th className="border p-2">User</th>
            <th className="border p-2">Product</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Approved Date</th>
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
                {new Date(order.approvedAt).toLocaleDateString()}
              </td>
              <td className="border p-2">
                <button
                  className="bg-indigo-600 text-white px-3 py-1"
                  onClick={() => addTracking(order._id)}
                >
                  Add Tracking
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovedOrders;
