// import { useQuery } from '@tanstack/react-query'
// import CustomerOrderDataRow from '../../../components/Dashboard/TableRows/CustomerOrderDataRow'
// import useAuth from '../../../hooks/useAuth'
// import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
// import useAxiosSecure from '../../../hooks/useAxiosSecure'

// const MyOrders = () => {
//   const { user } = useAuth()
//   const axiosSecure = useAxiosSecure()
//   const { data: orders = [], isLoading } = useQuery({
//     queryKey: ['orders', user?.email],
//     queryFn: async () => {
//       const result = await axiosSecure(`/my-orders`)
//       return result.data
//     },
//   })
//   console.log(orders)

//   if (isLoading) return <LoadingSpinner />
//   return (
//     <>
//       <div className='container mx-auto px-4 sm:px-8'>
//         <div className='py-8'>
//           <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
//             <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
//               <table className='min-w-full leading-normal'>
//                 <thead>
//                   <tr>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Image
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Name
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Category
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Price
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Quantity
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Status
//                     </th>

//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Action
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {orders.map(order => (
//                     <CustomerOrderDataRow key={order._id} order={order} />
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default MyOrders


import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const MyOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/orders?email=${user.email}`).then((res) => {
        setOrders(res.data);
        setLoading(false);
      });
    }
  }, [axiosSecure, user]);

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Cancel Order?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/orders/${id}`);
      setOrders(orders.filter((order) => order._id !== id));
      Swal.fire("Cancelled!", "Order has been cancelled", "success");
    }
  };

    if (loading) return <div className="text-center mt-20">
      <LoadingSpinner></LoadingSpinner>
  </div>;

  return (
    <div className="px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.productTitle}</td>
                <td>{order.quantity}</td>
                <td>${order.totalPrice}</td>
                <td>
                  <span
                    className={`badge ${
                      order.status === "Pending"
                        ? "badge-warning"
                        : "badge-success"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="space-x-2">
                  <Link
                    to={`/dashboard/track-order/${order._id}`}
                    className="btn btn-xs btn-outline"
                  >
                    View
                  </Link>

                  {order.status === "Pending" && (
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="btn btn-xs btn-error"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="text-center mt-10">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;

