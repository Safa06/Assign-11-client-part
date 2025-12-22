import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/orders/${id}`)
      .then((res) => {
        setOrder(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!order) return <div><LoadingSpinner>
  </LoadingSpinner></div>;

  return (
    <div className="my-10 mx-10 py-12 bg-blue-200 rounded-2xl text-center">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>
      <p className="mb-2">
        <b>Order ID:</b> {order._id}
      </p>
      <p className="mb-2">
        <b>User:</b> {order.email}
      </p>
      <p className="mb-2">
        <b>Product:</b> {order.productTitle}
      </p>
      <p className="mb-2">
        <b>Quantity:</b> {order.quantity}
      </p>
      <p className="mb-2">
        <b>Total Price:</b> ${order.price * order.quantity}
      </p>
      <p className="mb-2">
        <b>Status:</b> {order.status}
      </p>
      <p className="mb-2">
        <b>Address:</b> {order.address}
      </p>

      {/* <div>
        <h3 className="text-xl font-semibold mb-2">Tracking History</h3>
        <ul className="border p-4 rounded">
          {order.tracking?.map((t, i) => (
            <div key={i} className="border-l-4 pl-4 mb-3">
              <p className="font-semibold">{t.status}</p>
              <p>{t.location}</p>
              <p>{t.note}</p>
              <small>{new Date(t.time).toLocaleString()}</small>
            </div>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default OrderDetails;
