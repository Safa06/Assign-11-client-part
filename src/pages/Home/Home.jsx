
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
import shirt1 from "../../assets/shirt-1.jpg"
import shirt2 from "../../assets/shirt-2.jpg"
import shirt3 from "../../assets/shirt-3.jpg"
import { TypeAnimation } from "react-type-animation";


const Home = () => {
  const [products, setProducts] = useState([]);
  //const [active, setActive] = useState(0);


  
  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
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
      <section className="px-4 py-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
          Our Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="card bg-base-100 shadow-md hover:shadow-xl transition"
            >
              <img
                src={product.image}
                className="h-48 w-full object-cover"
                alt={product.title}
              />

              <div className="card-body p-4">
                <h3 className="font-semibold text-lg">{product.category}</h3>
                <p className="text-sm opacity-80">{product.description}</p>
                <p className="font-bold mt-2">Tk {product.price}</p>

                <Link
                  to={`/products/${product._id}`}
                  className="btn btn-outline btn-sm mt-2 w-full"
                >
                  View Details
                </Link>
              </div>
            </div>
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
              <div key={i} className="bg-green-100 p-8 rounded shadow">
                <div className="text-4xl font-bold text-red-800 mb-4">
                  {i + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2 text">{step}</h3>
                <p className="text-black">
                  Simple, transparent and efficient process.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*CUSTOMER FEEDBACK CAROUSEL*/}
      <p className="font-bold text-4xl text-green-800 text-center mb-6">
        Happy Customers !
      </p>
      <div className="carousel w-full h-40 text-center bg-red-100 mb-10">
        {/* Slide 1 */}
        <div
          id="slide1"
          className="carousel-item relative w-full flex flex-col items-center"
        >
          <p className="mt-10 mb-2 text-center text-lg text-red-800 font-semibold">
            " {feedbacks?.[0]?.text} "
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
          <p className="mt-10 mb-2 text-center text-lg text-red-800 font-semibold">
            " {feedbacks?.[1]?.text} "
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
          <p className="mt-10 mb-2 text-center text-lg text-red-800 font-semibold">
            " {feedbacks?.[2]?.text} "
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
      <section className="text-green-800 py-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Trusted by Thousands</h2>
        <h1 className="font-semibold mt-6 text-red-300 italic">
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed once, initially
              "Quality apparel backed ...",
              1000,
              "Quality apparel backed ... with customer satisfaction",
              1000,
            ]}
            speed={50}
            style={{ fontSize: "1.3em" }}
            repeat={Infinity}
          />
        </h1>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 md:grid-cols-2 gap-6 mt-10">
          <div className="bg-green-100 py-8 px-8 rounded-xl ">
            <img
              src={shirt1}
              className=" w-30 h-30 rounded-4xl mx-auto"
              alt=""
            />
            <h1 className="text-red-800 font-bold text-xl mt-3">T-Shirt</h1>
            <p className="text-black mt-3">
              Comfortable cotton wear for everyday use. Easy to style with jeans
              or shorts. Button-up top suitable for formal and casual occasions.
              Offers a clean and polished look.
            </p>
          </div>
          <div className="bg-green-100 py-8 px-8 rounded-xl ">
            <img
              src={shirt2}
              className=" w-30 h-30 rounded-4xl mx-auto"
              alt=""
            />
            <h1 className="text-red-800 font-bold text-xl mt-3">Jacket</h1>
            <p className="text-black mt-3">
              Stylish outerwear that adds warmth and protection. Suitable for
              casual or semi-formal wear. Warm and cozy sweatshirt with a hood.
              Perfect for casual outings and cold weather.
            </p>
          </div>
          <div className="bg-green-100 py-8 px-8 rounded-xl ">
            <img
              src={shirt3}
              className="mx-auto w-30 h-30 rounded-4xl"
              alt=""
            />
            <h1 className="text-red-800 font-bold text-xl mt-3">Dress</h1>
            <p className="text-black mt-3">
              One-piece outfit offering comfort and style. Available in casual
              and formal designs. Structured jacket for a professional look.
              Ideal for office and formal events.
            </p>
          </div>
        </div>
      </section>

      {/* EXTRA SECTION 2*/}
      <section className="max-w-7xl mx-auto px-6 mt-10 text-center">
        <h2 className="text-3xl font-bold mb-6 text-green-800">
          Ready to Upgrade Your Style?
        </h2>
        <Link
          to="/products"
          className="inline-block px-6 py-3 bg-green-800 text-white rounded-xl font-bold
                     border-2 border-transparent hover:border-red-800 hover:bg-white hover:text-red-800
                     transition-all duration-300"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default Home;

