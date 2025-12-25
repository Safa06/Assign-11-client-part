
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/images/logo-hat.jpg";
import { useEffect } from "react";
import { useState } from "react";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="navbar bg-base-100 shadow">
      <div className="navbar-start p-2">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-green-800 text-white z-1 mt-3 w-52 p-1 shadow"
          >
           
            
            <li>
              {/* Links */}
              <Link to="/" className="hover:text-blue-600">
                Home
              </Link>
              <Link to="/all-products" className="hover:text-blue-600">
                All-Product
              </Link>
              <Link to="/about" className="hover:text-blue-600">
                About Us
              </Link>
              <Link to="/contact" className="hover:text-blue-600">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex justify-center items-center gap-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-800">
            <div className="flex gap-3">
              <img
                src={logo}
                alt="logo"
                width="50"
                height="50"
                className="rounded-full hidden lg:block"
              />
              <Link to="/" className="text-md text-green-800 ">
                <span className="text-red-800">Hero</span> Apparels
              </Link>
            </div>
          </Link>
        </div>
      </div>

      <div className="navbar-end">

{/* theme toggling */}
          <input
            onChange={(e) => handleTheme(e.target.checked)}
            type="checkbox"
            defaultChecked={localStorage.getItem("theme") === "dark"}
            className="toggle mr-3"
          />
        

        {/* BEFORE LOGIN */}

        {!user && (
          <div className="flex justify-between items-center mr-3">
            <div className="hidden lg:block">
              <div classname="flex justify-between items-center gap-3">
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

            <div>
              <Link
                to="/login"
                className="px-6 py-3 bg-green-800 rounded-xl text-white font-bold border-2 hover:border-red-800 hover:text-red-800
              hover:bg-white mr-3"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-6 py-3 bg-green-800 rounded-xl text-white font-bold border-2 hover:border-red-800 hover:text-red-800
              hover:bg-white"
              >
                SignUp
              </Link>
            </div>
          </div>
        )}

        {/* AFTER LOGIN */}

        {user && (
          <>
            <div className="flex justify-between items-center gap-3">
              <Link to="/" className="text-black hover:text-blue-600">
                Home
              </Link>

              <Link to="/all-products" className="hover:text-blue-600">
                All-Product
              </Link>
              <Link
                to="/dashboard"
                className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
              >
                Dashboard
              </Link>

              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-9 border-2 border-gray-300 rounded-full">
                  <img
                    src={
                      user.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>
              <div
                onClick={logOut}
                className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
              >
                Logout
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
