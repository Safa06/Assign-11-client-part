import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import Swal from "sweetalert2";

const AdminAllProducts = () => {
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await axiosSecure.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleToggleHome = async (id, current) => {
    await axiosSecure.patch(`/products/show-home/${id}`, {
      showHome: !current,
    });
    fetchProducts();
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete product?",
      icon: "warning",
      showCancelButton: true,
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/products/${id}`);
      fetchProducts();
    }
  };

  return (
    <div>
      <h2 className=" text-center italic text-green-800 text-2xl font-bold mb-4">
        ~ Admin ~
      </h2>
      <h2 className="text-2xl font-bold mb-4">All Products</h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-400">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-400 px-4 py-2">Image</th>
              <th className="border border-gray-400 px-4 py-2">Name</th>
              <th className="border border-gray-400 px-4 py-2">Price</th>
              <th className="border border-gray-400 px-4 py-2">Category</th>
              <th className="border border-gray-400 px-4 py-2">Created By</th>
              <th className="border border-gray-400 px-4 py-2">Show Home</th>
              <th className="border border-gray-400 px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td className="border border-gray-400 px-4 py-2">
                  <img src={p.image} className="w-12 h-12 rounded" />
                </td>
                <td className="border border-gray-400 px-4 py-2">{p.title}</td>
                <td className="border border-gray-400 px-4 py-2">${p.price}</td>
                <td className="border border-gray-400 px-4 py-2">
                  {p.category}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {p.createdBy}
                </td>

                <td className="border border-gray-400 px-4 py-2">
                  <input
                    type="checkbox"
                    checked={p.showHome}
                    onChange={() => handleToggleHome(p._id, p.showHome)}
                  />
                </td>

                <td className="border border-gray-400 px-4 py-2 flex flex-col ">
                  <Link
                    to={`/dashboard/update-product/${p._id}`}
                    className="bg-indigo-900 text-white text-center px-2 py-1 rounded m-2 font-semibold"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded m-2 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAllProducts;
