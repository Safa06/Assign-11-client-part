import { motion } from "framer-motion";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  const { _id, title, image, price, category, quantity, payment } = product;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="border-2 border-green-800 rounded-lg shadow-md p-4 gap-2 flex flex-col"
    >
      <img
        src={image}
        alt={title}
        className="h-48 w-full object-cover rounded"
      />

      <h3 className="font-semibold text-lg mt-3">{title}</h3>
      <p className="text-sm text-red-600 italic">Category: {category}</p>

      <p className="mt-1">Price: ${price}</p>
      <p className="text-sm text-green-800 italic">Available: {quantity}</p>
      <p className="text-sm">Payment method: {payment}</p>

      <Link
        to={`/products/${product._id}`}
        className="mt-auto btn btn-outline btn-md bg-green-800 text-white hover:bg-white border-2 hover:border-red-800 hover:text-red-800 hover:font-bold w-full"
      >
        View Details
      </Link>
    </motion.div>
  );
};

export default ProductCard;
