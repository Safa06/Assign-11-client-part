// import { Navigate } from "react-router";
// import LoadingSpinner from "../components/Shared/LoadingSpinner";
// import useRole from "../hooks/useRole";

// const AdminRoute = ({ children }) => {
//   const [role, isRoleLoading] = useRole();

//   if (isRoleLoading) return <LoadingSpinner />;
//   if (role === "admin") return children;
//   return <Navigate to="/" replace="true" />;
// };

// export default AdminRoute;


import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (user?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
