import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, isAuthenticated, allowedRoles, userRole }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;
