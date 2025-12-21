import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosPublic from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const ProductDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic.get(`/products/${id}`).then((res) => {
      setProduct(res.data);
      setLoading(false);
    });
  }, [id, axiosPublic]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto px-8 py-10 bg-green-100 rounded">
      <title>Product Details</title>
      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-96 object-cover rounded-lg"
        />
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p>
            <b>Category:</b> {product.category}
          </p>
          <p>
            <b>Price:</b> ${product.price}
          </p>
          <p>
            <b>Available:</b> {product.quantity}
          </p>
          <p>
            <b>Minimum Order:</b> {product.minOrder}
          </p>
          <p>
            <b>Payment:</b> {product.payment}
          </p>

          <button
            className="mt-6 btn btn-outline w-1/2 bg-green-800 text-white hover:bg-white hover:text-red-800 border-2 hover:border-red-800"
            onClick={() => navigate(`/booking/${product._id}`)}
          >
            Order / Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

