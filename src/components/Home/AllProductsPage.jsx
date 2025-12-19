// import Card from './Card'
// import Container from '../Shared/Container'
// import { useQuery } from '@tanstack/react-query'
// import axios from 'axios'
// import LoadingSpinner from '../Shared/LoadingSpinner'

// const Plants = () => {
//   const { data: plants = [], isLoading } = useQuery({
//     queryKey: ['plants'],
//     queryFn: async () => {
//       const result = await axios(`${import.meta.env.VITE_API_URL}/plants`)
//       return result.data
//     },
//   })

//   if (isLoading) return <LoadingSpinner />

//   return (
//     <Container>
//       {plants && plants.length > 0 ? (
//         <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
//           {plants.map(plant => (
//             <Card key={plant._id} plant={plant} />
//           ))}
//         </div>
//       ) : null}
//     </Container>
//   )
// }

// export default Plants



import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosSecure"
import ProductCard from "../Home/ProductCard" 
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";

const AllProducts = () => {
  const axiosPublic = useAxiosPublic();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic.get("/all-products").then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  }, [axiosPublic]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

    return (
        <div>
            <Navbar></Navbar>
        <div className="max-w-7xl mx-auto px-4 py-10">
          <h2 className="text-3xl font-bold text-center mb-10 text-green-800">All Category Apparels</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
            </div>
            
            <Footer></Footer>
      </div>
    );
};

export default AllProducts;
