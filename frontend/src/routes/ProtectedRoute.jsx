/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, role, loading } = useContext(authContext);

  // If loading, return a loading indicator or null to show loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  const isAllowed = allowedRoles.includes(role);

  const accessibleRoute =
    token && isAllowed ? (
      children
    ) : (
      <Navigate
        to="/login"
        replace={true}
      />
    );

  return accessibleRoute;
};

export default ProtectedRoute;
