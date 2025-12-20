import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const AdminAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p><LoadingSpinner></LoadingSpinner></p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Products (Admin)</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th>#</th>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Seller</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
              <tr key={p._id}>
                <td>{index + 1}</td>
                <td>{p.title}</td>
                <td>${p.price}</td>
                <td>{p.quantity}</td>
                <td>{p.sellerEmail || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
   
  );
};

export default AdminAllProducts;
