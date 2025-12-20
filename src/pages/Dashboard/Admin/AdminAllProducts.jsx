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
      <h2 className=" text-center italic text-green-800 text-2xl font-bold mb-4">~ Admin ~</h2>
      <h2 className="text-2xl font-bold mb-4">All Products</h2>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Created By</th>
            <th>Show Home</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>
                <img src={p.image} className="w-12 h-12 rounded" />
              </td>
              <td>{p.title}</td>
              <td>${p.price}</td>
              <td>{p.category}</td>
              <td>{p.createdBy}</td>

              <td>
                <input
                  type="checkbox"
                  checked={p.showHome}
                  onChange={() => handleToggleHome(p._id, p.showHome)}
                />
              </td>

              <td className="flex gap-2">
                <Link
                  to={`/dashboard/update-product/${p._id}`}
                  className="btn btn-xs btn-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="btn btn-xs btn-error"
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

export default AdminAllProducts;
