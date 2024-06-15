import { useAuth } from "@/Providers/AuthProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/user-login" replace />;
  }

  return children;
};

export default ProtectedRoute;
