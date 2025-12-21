// src/components/Sidebar.jsx
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside className="w-64 bg-gray-900 text-white p-4 min-h-screen">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>

      {user?.role === "admin" && (
        <>
          <Link
            className="block py-2 px-3 mt-6 bg-gray-800 rounded hover:bg-gray-700"
            to="/dashboard/manage-users"
          >
            Manage Users
          </Link>
          <Link
            className="block py-2 px-3 mt-6 bg-gray-800 rounded hover:bg-gray-700"
            to="/dashboard/all-products"
          >
            All Products
          </Link>
          <Link
            className="block py-2 px-3 mt-6 bg-gray-800 rounded hover:bg-gray-700"
            to="/dashboard/all-orders"
          >
            All Orders
          </Link>
          <Link
            className="block py-2 px-3 mt-6 bg-gray-800 rounded hover:bg-gray-700"
            to="/dashboard/profile"
          >
            My Profile
          </Link>
        </>
      )}

      {user?.role === "manager" && (
        <>
          <Link
            className="block py-2 px-3 mt-6 bg-gray-800 rounded hover:bg-gray-700"
            to="/dashboard/add-product"
          >
            Add Product
          </Link>
          <Link
            className="block py-2 px-3 mt-6 bg-gray-800 rounded hover:bg-gray-700"
            to="/dashboard/manage-products"
          >
            Manage Products
          </Link>
          <Link
            className="block py-2 px-3 mt-6 bg-gray-800 rounded hover:bg-gray-700"
            to="/dashboard/pending-orders"
          >
            Pending Orders
          </Link>
          <Link
            className="block py-2 px-3 mt-6 bg-gray-800 rounded hover:bg-gray-700"
            to="/dashboard/approved-orders"
          >
            Approved Orders
          </Link>
          <Link
            className="block py-2 px-3 mt-6 bg-gray-800 rounded hover:bg-gray-700"
            to="/dashboard/profile"
          >
            My Profile
          </Link>
        </>
      )}

      {user?.role === "user" && (
        <>
          <Link
            to="/dashboard/my-orders"
            className="block py-2 px-3 mt-6 bg-gray-800 rounded hover:bg-gray-700"
          >
            My Orders
          </Link>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
