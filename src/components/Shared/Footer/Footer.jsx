import logo from "../../../assets/images/logo-hat.jpg";
import { Link } from "react-router";

const Footer = () => {
  return (
  

    <footer className="bg-green-200 py-8 px-4 mt-20">
      <div className="container mx-auto  grid grid-cols-4 items-center gap-10">
        <div className="grid col-span-3">
          <div className="flex items-center space-x-2 text-white mb-5">
            <img src={logo} className="w-15 h-15 rounded-full" alt="" />
            <span className="text-xl font-bold text-green-800">
              <span className="text-red-800">Hero </span>Apparels
            </span>
            <div></div>
          </div>
          <h1 className="text-black text-md">
            Hero Apparels delivers high-quality clothing designed for comfort,
            durability, and modern style. From everyday essentials to premium
            fashion pieces, we combine fine fabrics with expert craftsmanship to
            bring you apparel you can trust!
          </h1>
        </div>

        <div>
          <h1 className="text-red-800 font-bold text-lg">Connect With us</h1>
          <div className="flex flex-col">
            <Link
              to="/"
              className="text-green-800 font-bold hover:text-red-800 mr-3"
            >
              Home
            </Link>

            <Link
              to="/all-products"
              className="text-green-800 font-bold hover:text-red-800 mr-3"
            >
              All-Product
            </Link>

            <Link
              to="/about"
              className="text-green-800 font-bold hover:text-red-800 mr-3"
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className="text-green-800 font-bold hover:text-red-800 mr-3"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t-2 lg:mb-0 md:mb-0 mb-20 border-red-800 mt-8 pt-4 text-center">
        <p className="text-sm text-green-800 font-bold">
          © 2025 Hero Apparels. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
