import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const TRACKING_STEPS = [
  "Cutting Completed",
  "Sewing Started",
  "Finishing",
  "Packed",
  "Shipped / Out for Delivery",
];

const TrackOrder = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://assignment11-eight-swart.vercel.app/my-orders/${orderId}`)
      .then((res) => {
        setOrder(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [orderId]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!order) return <p className="text-center mt-10">Order not found</p>;

  const tracking = order.tracking || []; // array of updates [{status, date, location, note}]

  // Map tracking updates to the defined steps
  const getStepStatus = (step) => {
    const found = tracking.find((t) => t.status === step);
    if (found) return { done: true, info: found };
    return { done: false, info: null };
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Track Order: {order._id}</h2>
      <div className="bg-white p-4 rounded shadow mb-6">
        <p>
          <strong>Product:</strong> {order.productTitle}
        </p>
        <p>
          <strong>Quantity:</strong> {order.quantity}
        </p>
        <p>
          <strong>Status:</strong> {order.status}
        </p>
      </div>

      <h3 className="font-semibold mb-4 text-lg">Tracking Timeline</h3>
      <div className="relative border-l-2 border-gray-300 pl-6">
        {TRACKING_STEPS.map((step, index) => {
          const { done, info } = getStepStatus(step);
          return (
            <div key={index} className="mb-8 relative">
             
              <span
                className={`absolute -left-4 w-8 h-8 rounded-full flex items-center justify-center border-2 border-gray-300 ${
                  done
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-white text-gray-400"
                }`}
              >
                {index + 1}
              </span>

              {/* Step details */}
              <div className="ml-4">
                <p
                  className={`font-semibold ${
                    done ? "text-green-700" : "text-gray-400"
                  }`}
                >
                  {step}
                </p>
                {done && info && (
                  <div className="text-sm text-gray-600 mt-1 ml-2">
                    <p>
                      <strong>Date:</strong> {info.date || "-"}
                    </p>
                    <p>
                      <strong>Location:</strong> {info.location || "-"}
                    </p>
                    <p>
                      <strong>Note:</strong> {info.note || "-"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackOrder;
