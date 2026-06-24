import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { shopContext } from "../context/ShopContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isAuthLoading } = useContext(shopContext);

  if (isAuthLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


export default ProtectedRoute;