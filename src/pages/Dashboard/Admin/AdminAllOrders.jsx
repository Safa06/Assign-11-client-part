import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../hooks/useAxiosSecure";

const AdminAllOrders = () => {
  const { data: orders = [], refetch } = useQuery({
    queryKey: ["all-orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders");
      return res.data;
    },
  });

  const handleStatus = async (id, status) => {
    await axiosSecure.patch(`/orders/${id}`, { status });
    refetch();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.email}</td>
              <td>{order.productName}</td>
              <td>{order.quantity}</td>
              <td>{order.status || "Pending"}</td>
              <td className="space-x-2">
                <button
                  onClick={() => handleStatus(order._id, "Approved")}
                  className="btn btn-xs btn-success"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatus(order._id, "Rejected")}
                  className="btn btn-xs btn-error"
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

export default AdminAllOrders;
