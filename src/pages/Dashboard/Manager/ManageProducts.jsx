import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";

const ManageProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/manager-products?email=${user.email}`)
        .then((res) => setProducts(res.data));
    }
  }, [user]);

  const handleDelete = (id) => {
    if (!confirm("Delete this product?")) return;

    axios.delete(`http://localhost:5000/products/${id}`).then(() => {
      setProducts(products.filter((p) => p._id !== id));
    });
  };

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 text-green-800">Manage Products</h2>

      <input
        className="border p-2 mb-4 w-full"
        placeholder="Search by name or category"
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Payment</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((p) => (
            <tr key={p._id}>
              <td className="border p-2">
                <img src={p.image} className="w-12 h-12" />
              </td>
              <td className="border p-2">{p.title}</td>
              <td className="border p-2">{p.price}</td>
              <td className="border p-2">{p.paymentMode}</td>
              <td className="border p-2 space-x-2">
                <button
                  className="bg-blue-600 text-white px-2 py-1"
                  onClick={() => navigate(`/dashboard/update-product/${p._id}`)}
                >
                  Update
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1"
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
