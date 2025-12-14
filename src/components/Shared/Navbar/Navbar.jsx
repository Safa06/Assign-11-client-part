import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
//import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
//import avatarImg from "../../../assets/images/placeholder.jpg";
import logo from "../../../assets/images/logo-hat.jpg";

const Navbar = () => {
  const { user, logOut } = useAuth();
  //const [isOpen, setIsOpen] = useState(false);

  return (
    // <div className="fixed w-full bg-white z-10 shadow-sm">
    //   <div className="py-4 ">
    //     <Container>
    //       <div className="flex flex-row  items-center justify-between gap-3 md:gap-0">
    //         {/* Logo */}
    //         <Link to="/">
    //           <img src={logo} alt="logo" width="100" height="100" />
    //         </Link>
    //         {/* Dropdown Menu */}
    //         <div className="relative">
    //           <div className="flex flex-row items-center gap-3">
    //             {/* Dropdown btn */}
    //             <div
    //               onClick={() => setIsOpen(!isOpen)}
    //               className="p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
    //             >
    //               <AiOutlineMenu />
    //               <div className="hidden md:block">
    //                 {/* Avatar */}
    //                 <img
    //                   className="rounded-full"
    //                   referrerPolicy="no-referrer"
    //                   src={user && user.photoURL ? user.photoURL : avatarImg}
    //                   alt="profile"
    //                   height="30"
    //                   width="30"
    //                 />
    //               </div>
    //             </div>
    //           </div>
    //           {isOpen && (
    //             <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
    //               <div className="flex flex-col cursor-pointer">
    //                 <Link
    //                   to="/"
    //                   className="block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    //                 >
    //                   Home
    //                 </Link>

    //                 {user ? (
    //                   <>
    //                     <Link
    //                       to="/dashboard"
    //                       className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    //                     >
    //                       Dashboard
    //                     </Link>
    //                     <div
    //                       onClick={logOut}
    //                       className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
    //                     >
    //                       Logout
    //                     </div>
    //                   </>
    //                 ) : (
    //                   <>
    //                     <Link
    //                       to="/login"
    //                       className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    //                     >
    //                       Login
    //                     </Link>
    //                     <Link
    //                       to="/signup"
    //                       className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    //                     >
    //                       Sign Up
    //                     </Link>
    //                   </>
    //                 )}
    //               </div>
    //             </div>
    //           )}
    //         </div>
    //       </div>
    //     </Container>
    //   </div>
    // </div>

    // <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center text-green-800 font-bold">
    //   {/* Logo */}
    //   <Link to="/" className="text-2xl font-bold text-gray-800">
    //     <div className="flex gap-3">
    //       <img
    //         src={logo}
    //         alt="logo"
    //         width="50"
    //         height="50"
    //         className="rounded-full"
    //       />
    //       <h1 className="text-sm">Hero Garments</h1>
    //     </div>
    //   </Link>

    //   {/* Links */}
    //   <div className="flex items-center gap-6">
    //     <Link to="/" className="hover:text-blue-600">
    //       Home
    //     </Link>
    //     <Link to="/all-products" className="hover:text-blue-600">
    //       All-Product
    //     </Link>

    //     {/* BEFORE LOGIN */}
    //     {!user && (
    //       <>
    //         <Link to="/about" className="hover:text-blue-600">
    //           About Us
    //         </Link>
    //         <Link to="/contact" className="hover:text-blue-600">
    //           Contact
    //         </Link>
    //         <Link to="/login" className="hover:text-blue-600">
    //           Login
    //         </Link>
    //         <Link to="/register" className="hover:text-blue-600">
    //           Register
    //         </Link>
    //       </>
    //     )}

    //     {/* AFTER LOGIN */}

    //     {user ? (
    //       <>
    //         <Link
    //           to="/dashboard"
    //           className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    //         >
    //           Dashboard
    //         </Link>
    //         <div
    //           onClick={logOut}
    //           className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
    //         >
    //           Logout
    //         </div>
    //       </>
    //     ) : (
    //       <>
    //         <Link
    //           to="/login"
    //           className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    //         >
    //           Login
    //         </Link>
    //         <Link
    //           to="/signup"
    //           className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    //         >
    //           Sign Up
    //         </Link>
    //       </>
    //     )}
    //   </div>
    // </nav>

    <div className="navbar bg-base-100 border-b-2 border-green-800 shadow-sm">
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
              <Link to="/" className="text-md text-green-800 "><span className="text-red-800">Hero</span> Apparels
              </Link>
            </div>
          </Link>
        </div>
      </div>

      <div className="navbar-end">
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
                className="text-green-800 font-bold hover:text-red-800 mr-3"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-green-800 font-bold hover:text-red-800"
              >
                Register
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
