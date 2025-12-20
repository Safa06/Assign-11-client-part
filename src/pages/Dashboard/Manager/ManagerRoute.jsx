import useAuth from "../../../hooks/useAuth";

const ManagerRoute = ({ children }) => {
  const { user, role, loading } = useAuth();

  if (loading) return null;
  if (user && role === "manager") return children;

  return <Navigate to="/" />;
};

export default ManagerRoute;
