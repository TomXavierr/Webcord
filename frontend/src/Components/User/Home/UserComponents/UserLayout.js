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
import FriendsList from "./UserLayoutComponents/FriendsList";
import AddFriend from "./UserLayoutComponents/AddFriend";

const drawerWidth = 60;

const toolbarStyle = {
    minHeight: "36px",
    display: "flex",
    padding: "0",
};

const UserLayout = () => {
    const [isUserSettingsOpen, setUserSettingsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("all");

    const handleSettingsIconClick = () => {
        setUserSettingsOpen(true);
    };

    const handleCloseUserSettings = () => {
        setUserSettingsOpen(false);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const username = useSelector((state) => state.auth.user?.username);

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
                    <Typography
                        sx={{ px: "10px", fontSize: "14px" }}
                        onClick={() => handleTabChange("all")}
                    >
                        All
                    </Typography>
                    <Button
                        onClick={() => handleTabChange("addFriend")}
                        sx={{
                            backgroundColor: "#32965d",
                            borderRadius: "4px",
                            height: "20px",
                            color: "white",
                            fontSize: "14px",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#1e604e", // Adjust the hover background color
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
                                ></Avatar>
                                <Typography
                                    style={{
                                        fontFamily: "Noto Sans, sans-serif",
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {username}
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
                </Box>
            </Box>
        </Box>
    );
};

export default UserLayout;
