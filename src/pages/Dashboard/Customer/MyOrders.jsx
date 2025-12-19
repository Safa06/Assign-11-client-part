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
 import useAuth from "../../../hooks/useAuth";
 import useAxiosSecure from "../../../hooks/useAxiosSecure";
 import { useNavigate } from "react-router";
 import Swal from "sweetalert2";

 const MyOrders = () => {
   const { user } = useAuth();
   const axiosSecure = useAxiosSecure();
   const navigate = useNavigate();

   const [orders, setOrders] = useState([]);

   const fetchOrders = async () => {
     const res = await axiosSecure.get(`/orders?email=${user.email}`);
     setOrders(res.data);
   };

   useEffect(() => {
     fetchOrders();
   }, []);

   const handleDelete = async (id) => {
     const confirm = await Swal.fire({
       title: "Are you sure?",
       text: "You won't be able to revert this!",
       icon: "warning",
       showCancelButton: true,
       confirmButtonText: "Yes, delete it!",
     });
     if (confirm.isConfirmed) {
       await axiosSecure.delete(`/orders/${id}`);
       Swal.fire("Deleted!", "Order has been deleted.", "success");
       fetchOrders();
     }
   };

   return (
     <div className="max-w-6xl mx-auto px-4 py-6">
       <h2 className="text-2xl font-bold mb-4">My Orders</h2>
       <table className="table-auto w-full border-collapse border border-gray-300">
         <thead>
           <tr>
             <th className="border px-2 py-1">Product</th>
             <th className="border px-2 py-1">Quantity</th>
             <th className="border px-2 py-1">Total Price</th>
             <th className="border px-2 py-1">Status</th>
             <th className="border px-2 py-1">Actions</th>
           </tr>
         </thead>
         <tbody>
           {orders.map((o) => (
             <tr key={o._id}>
               <td className="border px-2 py-1">{o.productTitle}</td>
               <td className="border px-2 py-1">{o.quantity}</td>
               <td className="border px-2 py-1">${o.totalPrice}</td>
               <td className="border px-2 py-1">{o.status}</td>
               <td className="border px-2 py-1 space-x-2">
                 <button
                   className="btn btn-sm btn-info"
                   onClick={() => navigate(`/products/${o.productId}`)}
                 >
                   View
                 </button>
                 <button
                   className="btn btn-sm btn-error"
                   onClick={() => handleDelete(o._id)}
                 >
                   Delete
                 </button>
               </td>
             </tr>
           ))}
         </tbody>
       </table>
     </div>
   );
 };

 export default MyOrders;
