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
      <h2 className="text-green-800 text-2xl font-bold my-8">Update Product</h2>

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

      <button
        className="inline-block px-6 py-3 bg-green-800 text-white rounded-xl font-bold
                     border-2 border-transparent hover:border-red-800 hover:bg-white hover:text-red-800"
      >
        Update
      </button>
    </form>
  );
};

export default UpdateProduct;
