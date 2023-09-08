import React from "react";

import { Button, Typography, Stack, AppBar, Toolbar, Box } from "@mui/material";
import Banner from "./Banner";
import { Link } from "react-router-dom";

const LandingPage = () => {
    const AppNameStyle = {
        fontFamily: "Sofia Sans, sans-serif",
        color: "#EBF2FA",
        fontWeight: "bold",
        fontSize: "32px",
    };
    const NavbarStyle = {
        backgroundColor: "#031D25",
    };
    const NavItemStyle = {
        fontFamily: "Sofia Sans,sans-serif ",
        color: "#EBF2FA",
        fontSize: "24px",
    };

    return (
        <div
            style={{
                height: "100vh",
            }}
        >
            <AppBar position="static" sx={NavbarStyle}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Typography
                        sx={AppNameStyle}
                        component="div"
                        marginLeft={4}
                    >
                        WEBCORD
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <Button color="inherit" sx={NavItemStyle}>
                            Home
                        </Button>
                        <Button color="inherit" sx={NavItemStyle}>
                            About
                        </Button>
                        <Button color="inherit" sx={NavItemStyle}>
                            Blog
                        </Button>
                    </Stack>
                    <Button
                        type="submit"
                        variant="contained"
                        style={{
                            backgroundColor: "#44CFCB",
                            borderRadius: "24px",
                            marginRight: "32px",
                        }}
                        sx={{ "&:hover": { backgroundColor: "#a0e3de" } }}
                    >
                        <Link
                            to="/login"
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            Login
                        </Link>
                    </Button>
                </Toolbar>
            </AppBar>
            <Box padding="24px" backgroundColor="#031D25">
                <Banner />
            </Box>
        </div>
    );
};

export default LandingPage;
