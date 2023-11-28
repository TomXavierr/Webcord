import React, { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import SettingsIcon from "@mui/icons-material/Settings";

import { AppBar, Avatar, Button, IconButton, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import UserSettings from "../UserSettings";
import ChatListDrawer from "./ChatListDrawer";
import FriendsList from "./UserLayoutNavbar/FriendsList";
import AddFriend from "./UserLayoutNavbar/AddFriend";
import FriendRequests from "./UserLayoutNavbar/FriendRequests";
import Invites from "./UserLayoutNavbar/Invites";

const drawerWidth = 60;

const toolbarStyle = {
    minHeight: "36px",
    display: "flex",
    padding: "0",
};

const tabstyle = {
    borderRadius: "4px",
    color: "white",
    fontSize: "14px",
    marginInline: "10px",
    paddingInline: "10px",
    height: "20px",
    transition: "background-color 0.2s ease-in-out",
    "&:hover": {
        backgroundColor: "#0a424f",
    },
};

const UserLayout = () => {
    const [activeTab, setActiveTab] = useState("all");

    const [isUserSettingsOpen, setUserSettingsOpen] = useState(
        localStorage.getItem("isUserSettingsOpen") === "true" || false
    );

    const [userSettingsActiveTab, setUserSettingsActiveTab] = useState(
        localStorage.getItem("userSettingsActiveTab") || "My Profile"
    );

    const handleUserSettingsTabChange = (tab) => {
        setUserSettingsActiveTab(tab);
        localStorage.setItem("userSettingsActiveTab", tab);
    };

    const handleSettingsIconClick = () => {
        setUserSettingsOpen(true);
        localStorage.setItem("isUserSettingsOpen", "true");
    };

    const handleCloseUserSettings = () => {
        setUserSettingsOpen(false);
        localStorage.setItem("isUserSettingsOpen", "false");
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const user = useSelector((state) => state.auth.user);

    return (
        <Box
            sx={{
                borderRadius: "20px 0 0 0",
                marginLeft: "60px",
                width: `calc(100% - ${drawerWidth}px)`,
                backgroundColor: "#073B4C",
            }}
        >
            <AppBar
                position="fixed"
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`,
                    backgroundColor: "transparent",
                    zIndex: 3,
                }}
            >
                <Toolbar variant="dense" style={toolbarStyle}>
                    <Box
                        sx={{
                            width: "200px",
                            height: "36px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Box
                            sx={{
                                width: "170px",
                                height: "20px",
                                backgroundColor: "#020F12",
                                borderRadius: "4px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                style={{
                                    fontSize: "12px",
                                }}
                                pl={2}
                            >
                                Start a conversation
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        onClick={() => handleTabChange("all")}
                        sx={{
                            ...tabstyle,
                            backgroundColor:
                                activeTab === "all" ? "#0A4C5C" : "transparent",
                        }}
                    >
                        <Typography sx={{ fontSize: "14px" }}>All</Typography>
                    </Box>
                    <Box
                        onClick={() => handleTabChange("requests")}
                        sx={{
                            ...tabstyle,
                            backgroundColor:
                                activeTab === "requests"
                                    ? "#0A4C5C"
                                    : "transparent",
                        }}
                    >
                        <Typography sx={{ fontSize: "14px" }}>
                            Requests
                        </Typography>
                    </Box>
                    <Box
                        onClick={() => handleTabChange("invites")}
                        sx={{
                            ...tabstyle,
                            backgroundColor:
                                activeTab === "invites"
                                    ? "#0A4C5C"
                                    : "transparent",
                        }}
                    >
                        <Typography sx={{ fontSize: "14px" }}>
                            Invites
                        </Typography>
                    </Box>
                    <Button
                        onClick={() => handleTabChange("addFriend")}
                        sx={{
                            ...tabstyle,
                            backgroundColor: "#32965d",

                            height: "20px",
                            borderRadius: "4px",
                            color: "white",
                            fontSize: "14px",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#1e604e",
                            },
                        }}
                    >
                        <Typography
                            style={{
                                fontSize: "12px",
                            }}
                        >
                            Add Friend
                        </Typography>
                    </Button>
                </Toolbar>
            </AppBar>

            <Box
                sx={{
                    marginTop: "36px",
                    width: `calc(100% - ${60}px)`,
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <Drawer
                    variant="permanent"
                    PaperProps={{
                        sx: {
                            borderRadius: "20px 0 0 0",
                            marginLeft: `${drawerWidth}px`,
                            width: "200px",
                            color: "#EBF2FA",
                            backgroundColor: "#122C34",
                            zIndex: 1,
                            position: "absolute",
                            alignItems: "center",
                        },
                    }}
                >
                    <ChatListDrawer />
                    <Box
                        sx={{
                            width: "200px",
                            height: "40px",
                            backgroundColor: "#031D25",
                            color: "#EBF2FA",
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                padding: "8px",
                            }}
                        >
                            <Stack direction="row" spacing={1}>
                                <Avatar
                                    style={{
                                        width: "24px",
                                        height: "24px",
                                    }}
                                >
                                    {user && user.avatar && (
                                        <img
                                            src={`${process.env.REACT_APP_API_URL}${user.avatar}`}
                                            alt="User Avatar"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: "50%",
                                            }}
                                        />
                                    )}
                                </Avatar>
                                <Typography
                                    style={{
                                        fontFamily: "Noto Sans, sans-serif",
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {user && user.display_name}
                                </Typography>
                            </Stack>
                            <IconButton
                                onClick={handleSettingsIconClick}
                                style={{
                                    width: "24px",
                                    height: "24px",
                                    color: "white",
                                }}
                            >
                                <SettingsIcon />
                            </IconButton>
                            <UserSettings
                                isOpen={isUserSettingsOpen}
                                onClose={handleCloseUserSettings}
                                activeTab={userSettingsActiveTab}
                                onTabChange={handleUserSettingsTabChange}
                            />
                        </Box>
                    </Box>
                </Drawer>
                <Box
                    sx={{
                        marginLeft: "200px",
                        height: `calc(100vh - ${36}px)`,
                        width: `calc(100vw - ${260}px)`,
                    }}
                >
                    {activeTab === "all" && <FriendsList />}
                    {activeTab === "addFriend" && <AddFriend />}
                    {activeTab === "requests" && <FriendRequests />}
                    {activeTab === "invites" && <Invites />}
                    
                </Box>
            </Box>
        </Box>
    );
};

export default UserLayout;
