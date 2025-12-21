import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";

const ManagerRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ManagerRoute;
