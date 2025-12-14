
// import Plants from "../../components/Home/Plants";

// const Home = () => {
//   return (
//     <div>
//       {/* <Plants /> */}
//       {/* More components */}
//     </div>
//   );
// };

// export default Home;


import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router";
import hero from "../../assets/hero-1.png"
import { TypeAnimation } from "react-type-animation";


const Home = () => {
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products/home")
      .then((res) => setProducts(res.data));
  }, []);

  const feedbacks = [
    { name: "Alex Dandelions", text: "Amazing quality and fast delivery!" },
    { name: "Maria Bosciana", text: "Highly recommended apparel brand." },
    { name: "John Alexandar", text: "Smooth ordering experience." },
  ];

  //console.log(feedbacks.name);
  return (
    <div className="">
      {/* HERO Banner */}
      <section className="bg-base-100">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-2 lg:gap-50 gap-18 justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-green-800">
              <span className="text-red-800">Hero </span>
              Apparels
            </h1>
            <h1 className="font-semibold mt-6 text-red-300 italic">
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed once, initially
                  "Crafted ...",
                  1000,
                  "Crafted ... with confidence",
                  1000,
                ]}
                speed={50}
                style={{ fontSize: "1.3em" }}
                repeat={Infinity}
              />
            </h1>

            <p className="mt-6 text-lg ">
              Hero Apparels specializes in premium garment manufacturing and
              bulk apparel production for global brands. We combine skilled
              craftsmanship, modern production techniques, and strict quality
              control to deliver clothing that meets international standards.
            </p>

            <Link
              to="/products"
              className="inline-block mt-8 px-6 py-3 bg-green-800 rounded-xl text-white font-bold border-2 hover:border-red-800 hover:text-red-800
              hover:bg-white"
            >
              View Products
            </Link>
          </motion.div>

          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            src={hero}
            alt="Hero"
            className="w-80 h-80 rounded-full"
          />
        </div>
      </section>

      {/*OUR PRODUCTS*/}
      <section className="max-w-7xl mx-auto px-6 mt-10">
        <h2 className="text-4xl font-bold text-center mb-12 text-green-800">
          Our Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product._id}
              whileHover={{ scale: 1.03 }}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <img src={product.image} className="h-56 w-full object-cover" />

              <div className="p-5 flex flex-col h-full">
                <h3 className="text-xl font-semibold">{product.title}</h3>

                <p className="text-gray-600 mt-2 flex-1 line-clamp-2">
                  {product.description}
                </p>

                <p className="mt-4 font-bold text-indigo-600">
                  ${product.price}
                </p>

                <Link
                  to={`/products/${product._id}`}
                  className="mt-5 block text-center px-4 py-2 bg-indigo-600 text-white rounded
                             border border-transparent hover:border-indigo-600 hover:bg-white hover:text-indigo-600
                             transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/*HOW IT WORKS*/}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center text-green-800">
          <h2 className="text-4xl font-bold mb-12">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "Choose Your Product",
              "Place Order Easily",
              "Fast & Secure Delivery",
            ].map((step, i) => (
              <div key={i} className="bg-white p-8 rounded shadow">
                <div className="text-4xl font-bold text-indigo-600 mb-4">
                  {i + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step}</h3>
                <p className="text-gray-600">
                  Simple, transparent and efficient process.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*CUSTOMER FEEDBACK CAROUSEL*/}
      <div className="carousel w-full h-40 bg-green-200 mb-10">
        {/* Slide 1 */}
        <div
          id="slide1"
          className="carousel-item relative w-full flex flex-col items-center"
        >
          <p className="mt-10 mb-2 text-center text-lg text-green-800 font-semibold">
            {feedbacks?.[0]?.text}
          </p>
          <p className="italic "> - {feedbacks?.[0]?.name}</p>

          <div className="absolute left-5 right-5 top-1/2 flex justify-between">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>

        {/* Slide 2 */}
        <div
          id="slide2"
          className="carousel-item relative w-full flex flex-col items-center"
        >
          <p className="mt-10 mb-2 text-center text-lg text-green-800 font-semibold">
            {feedbacks?.[1]?.text}
          </p>
          <p className="italic "> - {feedbacks?.[1]?.name}</p>

          <div className="absolute left-5 right-5 top-1/2 flex justify-between">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>

        {/* Slide 3 */}
        <div
          id="slide3"
          className="carousel-item relative w-full flex flex-col items-center"
        >
          <p className="mt-10 mb-2 text-center text-lg text-green-800 font-semibold">
            {feedbacks?.[2]?.text}
          </p>
          <p className="italic "> - {feedbacks?.[2]?.name}</p>

          <div className="absolute left-5 right-5 top-1/2 flex justify-between">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>

      {/*EXTRA SECTION 1*/}
      <section className="bg-red-400 text-white py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Trusted by Thousands</h2>
        <p className="text-indigo-100">
          Quality apparel backed by customer satisfaction.
        </p>
      </section>

      {/* EXTRA SECTION 2*/}
      <section className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Upgrade Your Style?
        </h2>
        <Link
          to="/products"
          className="inline-block px-6 py-3 bg-indigo-600 text-white rounded
                     border border-transparent hover:border-indigo-600 hover:bg-white hover:text-indigo-600
                     transition-all duration-300"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default Home;

