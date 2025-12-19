// import { Link } from 'react-router'

// const Card = ({ plant }) => {
//   const { _id, name, image, quantity, price, category } = plant || {}
//   return (
//     <Link
//       to={`/plant/${_id}`}
//       className='col-span-1 cursor-pointer group shadow-xl p-3 rounded-xl'
//     >
//       <div className='flex flex-col gap-2 w-full'>
//         <div
//           className='
//               aspect-square
//               w-full
//               relative
//               overflow-hidden
//               rounded-xl
//             '
//         >
//           <img
//             className='
//                 object-cover
//                 h-full
//                 w-full
//                 group-hover:scale-110
//                 transition
//               '
//             src={image}
//             alt='Plant Image'
//           />
//           <div
//             className='
//               absolute
//               top-3
//               right-3
//             '
//           ></div>
//         </div>
//         <div className='font-semibold text-lg'>{name}</div>
//         <div className='font-semibold text-lg'>Category: {category}</div>
//         <div className='font-semibold text-lg'>Quantity: {quantity}</div>
//         <div className='flex flex-row items-center gap-1'>
//           <div className='font-semibold'> Price: {price}$</div>
//         </div>
//       </div>
//     </Link>
//   )
// }

// export default Card


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
