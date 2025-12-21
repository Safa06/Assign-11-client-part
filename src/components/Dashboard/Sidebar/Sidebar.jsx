import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Sidebar = () => {
  
  const { role } = useAuth();
  console.log(role);
 
  return (
    <aside className="w-64 bg-emerald-900 text-white border-r-4 border-r-red-800 p-4">
      <h2 className="text-2xl my-10  font-semibold mb-6 p-2">Dashboard</h2>

      {/* admin, manaager, user/others */}

      {role === "admin" && (
        <>
          <Link
            to="/dashboard/manage-users"
            className="block mb-2 hover:text-red-800 bg-none hover:bg-gray-100 p-2 hover:rounded-xl rounded-none hover:font-semibold font-semibold"
          >
            Manage Users
          </Link>
          <Link
            to="/dashboard/all-products"
            className="block mb-2 hover:text-red-800 bg-none hover:bg-gray-100 p-2 hover:rounded-xl rounded-none hover:font-semibold font-semibold"
          >
            All Products
          </Link>
          <Link
            to="/dashboard/all-orders"
            className="block mb-2 hover:text-red-800 bg-none hover:bg-gray-100 p-2 hover:rounded-xl rounded-none hover:font-semibold font-semibold"
          >
            All Orders
          </Link>
          <Link
            to="/dashboard/profile"
            className="block mb-2 hover:text-red-800 bg-none hover:bg-gray-100 p-2 hover:rounded-xl rounded-none hover:font-semibold font-semibold"
          >
            My Profile
          </Link>
        </>
      )}

      {/* Manager */}
      {role === "manager" && (
        <>
          <Link
            to="/dashboard/add-product"
            className="block mb-2 hover:text-red-800 bg-none hover:bg-gray-100 p-2 hover:rounded-xl rounded-none hover:font-semibold font-semibold"
          >
            Add Product
          </Link>
          <Link
            to="/dashboard/manage-products"
            className="block mb-2 hover:text-red-800 bg-none hover:bg-gray-100 p-2 hover:rounded-xl rounded-none hover:font-semibold font-semibold"
          >
            Manage Products
          </Link>
          <Link
            to="/dashboard/pending-orders"
            className="block mb-2 hover:text-red-800 bg-none hover:bg-gray-100 p-2 hover:rounded-xl rounded-none hover:font-semibold font-semibold"
          >
            Pending Orders
          </Link>
          <Link
            to="/dashboard/approved-orders"
            className="block mb-2 hover:text-red-800 bg-none hover:bg-gray-100 p-2 hover:rounded-xl rounded-none hover:font-semibold font-semibold"
          >
            Approved Orders
          </Link>
          <Link
            to="/dashboard/profile"
            className="block mb-2 hover:text-red-800 bg-none hover:bg-gray-100 p-2 hover:rounded-xl rounded-none hover:font-semibold font-semibold"
          >
            My Profile
          </Link>
        </>
      )}

      {/* User */}
      {role !== "admin" && role !== "manager" && (
        <>
          <Link
            to="/dashboard/my-orders"
            className="block mb-2 hover:text-red-800 bg-none hover:bg-gray-100 p-2 hover:rounded-xl rounded-none hover:font-semibold font-semibold"
          >
            My Orders
          </Link>
          <Link
            to="/dashboard/profile"
            className="block mb-2 hover:text-red-800 bg-none hover:bg-gray-100 p-2 hover:rounded-xl rounded-none hover:font-semibold font-semibold"
          >
            My Profile
          </Link>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
