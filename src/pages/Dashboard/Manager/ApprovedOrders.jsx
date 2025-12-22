import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ApprovedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [trackingData, setTrackingData] = useState({
    location: "",
    note: "",
    status: "",
    orderId: "",
  });

  useEffect(() => {
    fetchApprovedOrders();
  }, []);

  const fetchApprovedOrders = () => {
    axios
      .get("https://assignment11-eight-swart.vercel.app/approved-orders")
      .then((res) => setOrders(res.data))
      .catch(console.error);
  };

  // const handleTrackingChange = (e) => {
  //   setTrackingData({ ...trackingData, [e.target.name]: e.target.value });
  // };

  const addTracking = (orderId) => {
    const { location, note, status } = trackingData;
    if (!location || !note || !status) {
      Swal.fire("Error", "Please fill all tracking fields", "error");
      return;
    }

    axios
      .patch(
        `https://assignment11-eight-swart.vercel.app/approved-orders/${orderId}/tracking`,
        {
          location,
          note,
          status,
        }
      )
      .then(() => {
        Swal.fire("Success", "Tracking info added", "success");
        setTrackingData({ location: "", note: "", status: "", orderId: "" });
        fetchApprovedOrders();
      })
      .catch(console.error);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Approved Orders</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-400">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">Order ID</th>
              <th className="border px-4 py-2">User</th>
              <th className="border px-4 py-2">Product</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Add Tracking</th>
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
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={
                      trackingData.orderId === order._id
                        ? trackingData.location
                        : ""
                    }
                    onChange={(e) =>
                      setTrackingData({
                        ...trackingData,
                        location: e.target.value,
                        orderId: order._id,
                      })
                    }
                    className="border px-2 py-1 m-1"
                  />
                  <input
                    type="text"
                    name="note"
                    placeholder="Note"
                    value={
                      trackingData.orderId === order._id
                        ? trackingData.note
                        : ""
                    }
                    onChange={(e) =>
                      setTrackingData({
                        ...trackingData,
                        note: e.target.value,
                        orderId: order._id,
                      })
                    }
                    className="border px-2 py-1 m-1"
                  />
                  <input
                    type="text"
                    name="status"
                    placeholder="Status"
                    value={
                      trackingData.orderId === order._id
                        ? trackingData.status
                        : ""
                    }
                    onChange={(e) =>
                      setTrackingData({
                        ...trackingData,
                        status: e.target.value,
                        orderId: order._id,
                      })
                    }
                    className="border px-2 py-1 m-1"
                  />
                  <button
                    onClick={() => addTracking(order._id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded m-1"
                  >
                    Add
                  </button>
                  {order.tracking && order.tracking.length > 0 && (
                    <button
                      className="bg-gray-700 text-white px-2 py-1 rounded m-1"
                      onClick={() =>
                        Swal.fire({
                          title: "Tracking History",
                          html: order.tracking
                            .map(
                              (t) =>
                                `<b>${t.status}</b> - ${t.note} - ${
                                  t.location
                                } - ${new Date(t.date).toLocaleString()}`
                            )
                            .join("<br/>"),
                        })
                      }
                    >
                      View Tracking
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedOrders;
