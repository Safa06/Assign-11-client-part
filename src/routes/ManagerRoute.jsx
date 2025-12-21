import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";

const ManagerRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (user && user.role === "manager") {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default ManagerRoute;
