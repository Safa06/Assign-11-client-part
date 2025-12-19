import Container from "../../components/Shared/Container";
// import Heading from "../../components/Shared/Heading";
// import Button from "../../components/Shared/Button/Button";
// import PurchaseModal from "../../components/Modal/PurchaseModal";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
// import { useQuery } from "@tanstack/react-query";
//import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAxiosPublic from "../../hooks/useAxiosSecure";

// const PlantDetails = () => {
//   let [isOpen, setIsOpen] = useState(false);
//   const { id } = useParams();

//   const { data: plant = {}, isLoading } = useQuery({
//     queryKey: ["plant", id],
//     queryFn: async () => {
//       const result = await axios(
//         `${import.meta.env.VITE_API_URL}/plants/${id}`
//       );
//       return result.data;
//     },
//   });

//   const closeModal = () => {
//     setIsOpen(false);
//   };
//   if (isLoading) return <LoadingSpinner />;
//   const { image, name, description, category, quantity, price, seller } = plant;
//   return (
//     <Container>
//       <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-12">
//         {/* Header */}
//         <div className="flex flex-col gap-6 flex-1">
//           <div>
//             <div className="w-full overflow-hidden rounded-xl">
//               <img
//                 className="object-cover w-full"
//                 src={image}
//                 alt="header image"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="md:gap-10 flex-1">
//           {/* Plant Info */}
//           <Heading title={name} subtitle={`Category: ${category}`} />
//           <hr className="my-6" />
//           <div
//             className="
//           text-lg font-light text-neutral-500"
//           >
//             {description}
//           </div>
//           <hr className="my-6" />

//           <div
//             className="
//                 text-xl
//                 font-semibold
//                 flex
//                 flex-row
//                 items-center
//                 gap-2
//               "
//           >
//             <div>Seller: {seller?.name}</div>

//             <img
//               className="rounded-full"
//               height="30"
//               width="30"
//               alt="Avatar"
//               referrerPolicy="no-referrer"
//               src={seller?.image}
//             />
//           </div>
//           <hr className="my-6" />
//           <div>
//             <p
//               className="
//                 gap-4
//                 font-light
//                 text-neutral-500
//               "
//             >
//               Quantity: {quantity} Units Left Only!
//             </p>
//           </div>
//           <hr className="my-6" />
//           <div className="flex justify-between">
//             <p className="font-bold text-3xl text-gray-500">Price: {price}$</p>
//             <div>
//               <Button onClick={() => setIsOpen(true)} label="Purchase" />
//             </div>
//           </div>
//           <hr className="my-6" />
//           <PurchaseModal
//             plant={plant}
//             closeModal={closeModal}
//             isOpen={isOpen}
//           />
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default PlantDetails;


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

    if (loading)
        return <div className="text-center mt-20">
      <LoadingSpinner></LoadingSpinner>
  </div>;

  return (
    <div className="max-w-6xl mx-auto px-8 py-10 bg-green-100 rounded">
      <div className="grid md:grid-cols-2 gap-8 px-4">
     
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-96 object-cover rounded-lg"
        />

      
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          <p className="mb-1">
            <b>Category:</b> {product.category}
          </p>
          <p className="mb-1">
            <b>Price:</b> ${product.price}
          </p>
          <p className="mb-1">
            <b>Available:</b> {product.quantity}
          </p>
          <p className="mb-1">
            <b>Minimum Order:</b> {product.minOrder}
          </p>
          <p className="mb-4">
            <b>Payment:</b> {product.payment}
          </p>

          <button
            className="mt-auto btn btn-outline btn-md bg-green-800 text-white hover:bg-white border-2 hover:border-red-800 hover:text-red-800 hover:font-bold w-1/2"
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
