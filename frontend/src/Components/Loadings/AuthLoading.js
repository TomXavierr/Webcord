import React from "react";
import CircularProgress from '@mui/material/CircularProgress';

const AuthLoading = () => {
    return (
        <div
        style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        }}
        >
            <CircularProgress />
        </div>
    );
};

export default AuthLoading;
