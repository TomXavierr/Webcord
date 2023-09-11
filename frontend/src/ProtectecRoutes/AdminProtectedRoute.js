import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProtectedRoute = ({path, element}) => {
    const isAdmin = useSelector((state) => state.adminAuth.isAdmin);

    if (isAdmin) {
        return <Outlet path={path} element={element} />;
    } else {
        return <Navigate to="/admin" />;
    }
};

export default AdminProtectedRoute;