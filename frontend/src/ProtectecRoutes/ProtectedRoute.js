import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ path, element }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    if (isAuthenticated) {
        return <Outlet path={path} element={element} />;
    } else {
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
