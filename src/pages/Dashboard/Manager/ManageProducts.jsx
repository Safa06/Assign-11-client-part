// import SellerOrderDataRow from '../../../components/Dashboard/TableRows/SellerOrderDataRow'
// import useAuth from '../../../hooks/useAuth'
// import { useQuery } from '@tanstack/react-query'
// import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
// import useAxiosSecure from '../../../hooks/useAxiosSecure'

// const ManageOrders = () => {
//   const { user } = useAuth()
//   const axiosSecure = useAxiosSecure()
//   const { data: orders = [], isLoading } = useQuery({
//     queryKey: ['orders', user?.email],
//     queryFn: async () => {
//       const result = await axiosSecure(`/manage-orders/${user?.email}`)
//       return result.data
//     },
//   })

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
//                       Name
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Customer
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
//                     <SellerOrderDataRow key={order._id} order={order} />
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

// export default ManageOrders


import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";

const ManageProducts = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/manager-products?email=${user.email}`)
      .then((res) => setProducts(res.data));
  }, [user.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/products/${id}`).then(() => {
          setProducts(products.filter((p) => p._id !== id));
        });
      }
    });
  };

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>

      <input
        className="border p-2 mb-4 w-full"
        placeholder="Search by name or category"
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table-auto w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((p) => (
            <tr key={p._id}>
              <td>
                <img src={p.images[0]} className="w-16 h-16" />
              </td>
              <td>{p.title}</td>
              <td>{p.price}</td>
              <td>{p.paymentMode}</td>
              <td className="space-x-2">
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => navigate(`/dashboard/update-product/${p._id}`)}
                >
                  Update
                </button>

                <button
                  className="btn btn-sm btn-error"
                  onClick={() => handleDelete(p._id)}
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

export default ManageProducts;
