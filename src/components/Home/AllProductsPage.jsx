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
