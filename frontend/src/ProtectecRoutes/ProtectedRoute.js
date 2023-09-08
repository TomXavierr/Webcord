import React from 'react';
import {  Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ path, element }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  // const isAdmin = useSelector(state => state.auth.isAdmin); // Assuming you have isAdmin in your Redux state

  if (isAuthenticated) {
    // if (isAdmin) {
    //   // Redirect to unauthorized page if user is not an admin
    //   return <Navigate to="/unauthorized" />;
    // } else {
      // Render the requested route
      return <Outlet path={path} element={element} />;
    // }
  } else {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;