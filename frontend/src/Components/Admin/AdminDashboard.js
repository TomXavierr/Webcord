import {
    Box,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    Toolbar,
    Typography,
} from "@mui/material";
import { styled, alpha, useTheme } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../Redux/actions/adminAuthAction";
import { useNavigate } from "react-router-dom";

import MuiAppBar from "@mui/material/AppBar";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";

// import IconButton from '@mui/material/IconButton';
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import UsersTable from "./Users";


import { fetchAdminUserList } from "../../Redux/actions/adminUserListAtion";


const AdminDashboard = () => {
    const NavbarStyle = {
        backgroundColor: "#073B4C",
        height: "64px",
    };

    const Search = styled("div")(({ theme }) => ({
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1),
            width: "auto",
        },
    }));

    const SearchIconWrapper = styled("div")(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: "inherit",
        "& .MuiInputBase-input": {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create("width"),
            width: "100%",
            [theme.breakpoints.up("sm")]: {
                width: "12ch",
                "&:focus": {
                    width: "20ch",
                },
            },
        },
    }));

    const drawerWidth = 240;

    const Main = styled("main", {
        shouldForwardProp: (prop) => prop !== "open",
    })(({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }));

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== "open",
    })(({ theme, open }) => ({
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            //   marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(["margin", "width"], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    const DrawerHeader = styled("div")(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),

        ...theme.mixins.toolbar,
        justifyContent: "space-between",
    }));

    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [activePage, setActivePage] = useState("Users"); // Initialize with "Users"

    // Function to switch the active page
    const handlePageChange = (pageName) => {
        setActivePage(pageName);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(adminLogout());
        navigate("/");
    };


    // Dispatch the action to fetch the user list when the component mounts
    useEffect(() => {
        dispatch(fetchAdminUserList());
    }, [dispatch]);


    return (
        <Box
            sx={{
                height: "100vh",
                backgroundColor: "#073B4C",
                display: "flex",
                // flexDirection: "column",
            }}
        >
            <CssBaseline />
            <AppBar sx={NavbarStyle}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: "none" }) }}
                        >
                            <MenuIcon sx={{ color: "white" }} />
                        </IconButton>
                    </Box>

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                        />
                    </Search>
                </Toolbar>
            </AppBar>

            <Drawer
                PaperProps={{
                    sx: {
                        width: 200,
                        color: "#EBF2FA",
                        backgroundColor: "#031D25",
                    },
                }}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <Typography component="div" marginLeft={4}>
                        AdminDashboard
                    </Typography>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" && (
                            <ChevronLeftIcon sx={{ color: "white" }} />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider sx={{ backgroundColor: "white" }} />
                <List>
                    <ListItem
                        button
                        onClick={() => handlePageChange("Users")}
                        selected={activePage === "Users"}
                    >
                        <ListItemIcon>
                            <PeopleIcon sx={{ color: "white" }} />
                        </ListItemIcon>
                        <ListItemText>Users</ListItemText>
                    </ListItem>

                    {/* {["Inbox", "Starred", "Send email", "Drafts"].map(
                        (text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? (
                                            <InboxIcon />
                                        ) : (
                                            <MailIcon />
                                        )}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        )
                    )} */}
                    <Divider sx={{ backgroundColor: "white" }} />
                    <ListItem>
                        <IconButton
                            onClick={handleLogout}
                            sx={{ padding: "0",display:"flex" , justifyContent:"space-between"}}
                        >
                            <ListItemIcon>
                                <LogoutIcon sx={{ color: "white" }} />
                            </ListItemIcon>
                            <ListItemText sx={{ color: "white" }}>
                                Logout
                            </ListItemText>
                        </IconButton>
                    </ListItem>
                </List>
            </Drawer>

            <Main open={open}>
            <DrawerHeader />
                {activePage === "Users" && <UsersTable />} 
                
            </Main>
          
        </Box>
    );
};

export default AdminDashboard;
