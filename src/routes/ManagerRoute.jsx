import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";

const ManagerRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user || user.role !== "Manager") {
    return <Navigate to="/" />;
  }

  return children;
};

export default ManagerRoute;
