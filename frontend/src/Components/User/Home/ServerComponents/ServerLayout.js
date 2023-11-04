import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import SettingsIcon from "@mui/icons-material/Settings";
import axios from "axios";

import {
    AppBar,
    Avatar,
    Button,
    CircularProgress,
    IconButton,
    Stack,
} from "@mui/material";
import { useSelector } from "react-redux";
import UserSettings from "../UserSettings";
import { useParams } from "react-router-dom";
import ServerChannelsDrawer from "./ServerChannelsDrawer";
import MembersList from "./ServerLayoutComponents/MembersList";
// import ChatListDrawer from "./ChatListDrawer";
// import FriendsList from "./UserLayoutComponents/FriendsList";
// import AddFriend from "./UserLayoutComponents/AddFriend";
// import FriendRequests from "./UserLayoutComponents/FriendRequests";

const drawerWidth = 60;
const appBarHeight = 36;

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

const ServerLayout = () => {
    const { serverId } = useParams();
    const [serverData, setServerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [showMembers, setShowMembers] = useState(false);

    const getServerDetails = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("access");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/server-api/server_details/${serverId}`,
                config
            );

            if (response.status === 200) {
                setServerData(response.data);
                console.log(response.data);
            } else {
                console.error("Failed to fetch server details");
            }
        } catch (error) {
            console.error("Error fetching server details:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getServerDetails();
    }, [serverId]);

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

    const handleChannelSelect = (channelId) => {
        if (channelId === "members") {
            setSelectedChannel(null); // Clear the selected channel
            setShowMembers(true); 
        } else {
            setSelectedChannel(channelId);
            setShowMembers(false); // Hide the MembersList
        }
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
            {loading ? (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                <>
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
                                }}
                            >
                                <Typography
                                    style={{
                                        fontSize: "16px",
                                        fontFamily: "Sofia Sans,sans-serif ",
                                        color: "#EBF2FA",
                                    }}
                                    pl={2}
                                >
                                    {serverData.server.server_name}
                                </Typography>
                            </Box>
                        </Toolbar>
                    </AppBar>

                    <Box
                        sx={{
                            marginTop: "36px",
                            width: `calc(100% - ${60}px)`,
                            height:  `calc(100vh - ${appBarHeight}px)`,
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
                                    height:  `calc(100vh - ${appBarHeight}px)`,
                                    width: "200px",
                                    color: "#EBF2FA",
                                    backgroundColor: "#122C34",
                                    zIndex: 1,
                                    position: "absolute",
                                    alignItems: "center",
                                },
                            }}
                        >
                            <ServerChannelsDrawer
                                channels={serverData.channels}
                                onChannelSelect={handleChannelSelect}
                            />
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
                                                    src={`${process.env.REACT_APP_API_URL}/${user.avatar}`}
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
                                                fontFamily:
                                                    "Noto Sans, sans-serif",
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
                                        onTabChange={
                                            handleUserSettingsTabChange
                                        }
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
                            {showMembers ? (
                                <MembersList
                                    members={serverData.server_members}
                                />
                            ) : selectedChannel ? (
                                `#${selectedChannel}`
                            ) : (
                                "#ContentBox"
                            )}
                        </Box>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default ServerLayout;
