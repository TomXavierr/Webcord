import React, { useState } from "react";

import {
    Button,
    Typography,
    Stack,
    AppBar,
    Toolbar,
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import Banner from "./Banner";
import MenuIcon from "@mui/icons-material/Menu";
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

    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!isDrawerOpen);
    };

    const mobileNav = (
        <Drawer
            anchor="right"
            open={isDrawerOpen}
            onClose={toggleDrawer}
            PaperProps={{
                sx: {
                    width: 200,
                    color: "#EBF2FA",
                    backgroundColor: "#122C34",
                    
                },
            }}
        >
            <List>
                <ListItem button component={Link} to="/" onClick={toggleDrawer}>
                    <ListItemText  primary="Home" />
                </ListItem>
                <ListItem
                    button
                    component={Link}
                    to="/about"
                    onClick={toggleDrawer}
                >
                    <ListItemText primary="About" />
                </ListItem>
                <ListItem
                    button
                    component={Link}
                    to="/blog"
                    onClick={toggleDrawer}
                >
                    <ListItemText primary="Blog" />
                </ListItem>
                <ListItem
                    button
                    component={Link}
                    to="/login"
                    onClick={toggleDrawer}
                >
                    <ListItemText primary="Login" />
                </ListItem>
            </List>
        </Drawer>
    );

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
                    {/* Show the mobile menu icon on small screens */}
                    <IconButton
                        color="inherit"
                        sx={{ display: { sm: "block", md: "none" } }}
                        onClick={toggleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                    {/* Desktop navigation */}
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ display: { xs: "none", md: "block" } }}
                    >
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
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ display: { xs: "none", md: "block" } }}
                    >
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
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                Login
                            </Link>
                        </Button>
                    </Stack>
                </Toolbar>
            </AppBar>
            {mobileNav}
            <Box padding="24px" backgroundColor="#031D25">
                <Banner />
            </Box>
        </div>
    );
};

export default LandingPage;
