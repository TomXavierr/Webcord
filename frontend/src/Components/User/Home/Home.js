import { Box, Button,  Typography } from "@mui/material";
import React from "react";
import { logout } from "../../../Redux/actions/userauthaction";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleLogout = () => {
      dispatch(logout()); // Dispatch the logout action
      navigate('/'); // Redirect to the landing page
    };



    return (
        <div style={{
            display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            height: "100vh",
            backgroundColor: "#122C34",
        }}>
            <Box>
                <Typography variant="h4" color="#EBF2FA">Home</Typography>
                <Button
                    type="submit"
                    variant="contained"
                    onClick = {handleLogout}
                    style={{
                        backgroundColor: "#44CFCB",
                        borderRadius: "24px",
                        marginRight: "32px",
                    }}
                    sx={{ "&:hover": { backgroundColor: "#a0e3de" } }}
                >
                    Logout
                </Button>
            </Box>
        </div>
    );
};

export default Home;
