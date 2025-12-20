import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateProduct = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});

  useEffect(() => {
    axiosSecure.get(`/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axiosSecure.patch(`/products/${id}`, product);

    Swal.fire("Updated!", "Product updated successfully", "success");
    navigate("/dashboard/all-products");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl">
      <h2 className="text-xl font-bold mb-4">Update Product</h2>

      <input
        className="input input-bordered w-full mb-3"
        value={product.title || ""}
        onChange={(e) => setProduct({ ...product, title: e.target.value })}
      />

      <input
        className="input input-bordered w-full mb-3"
        value={product.price || ""}
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
      />

      <textarea
        className="textarea textarea-bordered w-full mb-3"
        value={product.description || ""}
        onChange={(e) =>
          setProduct({ ...product, description: e.target.value })
        }
      />

      <button className="btn btn-success">Update</button>
    </form>
  );
};

export default UpdateProduct;
