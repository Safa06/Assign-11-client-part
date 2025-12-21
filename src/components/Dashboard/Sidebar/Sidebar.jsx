import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Sidebar = () => {
  const { users } = useAuth();

  return (
    <aside className="w-64 bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>

      {/* Admin */}
      {users?.role === "admin" && (
        <>
          <Link to="/dashboard/manage-users" className="block mb-2">
            Manage Users
          </Link>
          <Link to="/dashboard/all-products" className="block mb-2">
            All Products
          </Link>
          <Link to="/dashboard/all-orders" className="block mb-2">
            All Orders
          </Link>
        </>
      )}

      {/* Manager */}
      {users?.role === "manager" && (
        <>
          <Link to="/dashboard/add-product" className="block mb-2">
            Add Product
          </Link>
          <Link to="/dashboard/manage-products" className="block mb-2">
            Manage Products
          </Link>
          <Link to="/dashboard/pending-orders" className="block mb-2">
            Pending Orders
          </Link>
          <Link to="/dashboard/approved-orders" className="block mb-2">
            Approved Orders
          </Link>
        </>
      )}

      {/* User */}
      {users?.role === "user" && (
        <>
          <Link to="/dashboard/my-orders" className="block mb-2">
            My Orders
          </Link>
          <Link to="/dashboard/profile" className="block mb-2">
            My Profile
          </Link>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
