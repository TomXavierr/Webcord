import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../Redux/actions/adminAuthAction";

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const isAdminAuthenticated = useSelector(
        (state) => state.adminAuth.isAuthenticated
    );

    // useEffect(() => {
    //     // Check if authentication information exists in local storage
    //     const adminAccess = localStorage.getItem('admin_access');
    //     const adminRefresh = localStorage.getItem('admin_refresh');

    //     if (adminAccess && adminRefresh) {
    //         // Dispatch an action to set the authentication state
    //         dispatch(adminLogin(adminAccess, adminRefresh));
    //     }
    // }, [dispatch]);

    return (
        <Box>
            <Typography>AdminDashboard</Typography>
        </Box>
    );
};

export default AdminDashboard;
