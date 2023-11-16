import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import SettingsIcon from "@mui/icons-material/Settings";
import axios from "axios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import "./style.css";

import {
    AppBar,
    Avatar,
    Button,
    CircularProgress,
    Fade,
    Grow,
    IconButton,
    Menu,
    MenuItem,
    MenuList,
    Popper,
    Stack,
} from "@mui/material";
import { useSelector } from "react-redux";
import UserSettings from "../UserSettings";
import { useNavigate, useParams } from "react-router-dom";
import ServerChannelsDrawer from "./ServerChannelsDrawer";
import MembersList from "./ServerLayoutComponents/MembersList";
import ChatWindow from "./ServerLayoutComponents/ChatWindow";

const drawerWidth = 60;
const appBarHeight = 36;

const toolbarStyle = {
    minHeight: "36px",
    display: "flex",
    padding: "0",
};

const ITEM_HEIGHT = 48;

const ServerLayout = () => {
    const { serverId } = useParams();
    const [serverData, setServerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [showMembers, setShowMembers] = useState(true);
    const user = useSelector((state) => state.auth.user);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const navigate = useNavigate();

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
                `${process.env.REACT_APP_API_URL}/server/server-details/${serverId}`,
                config
            );

            if (response.status === 200) {
                console.log(response.data);
                setServerData(response.data);
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

    useEffect(() => {
        const channelJSON = localStorage.getItem("selectedChannel");

        if (channelJSON && serverData) {
            const channel = JSON.parse(channelJSON);

            const channelServerAsString = String(channel.server);

            if (channelServerAsString === serverId) {
                setSelectedChannel(channel);
                setShowMembers(false);
                navigate(`/channels/${serverId}/${channel.id}`);
            } else {
                setShowMembers(true);
                setSelectedChannel(null);
                navigate(`/channels/${serverId}`);
            }
        }
    }, [serverData]);

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

    const handleChannelSelect = (channel) => {
        if (channel === "members") {
            setSelectedChannel(null);
            setShowMembers(true);
            navigate(`/channels/${serverId}`);
            localStorage.removeItem("selectedChannel");
        } else {
            setSelectedChannel(channel);
            setShowMembers(false);
            navigate(`/channels/${serverId}/${channel.id}`);
            localStorage.setItem("selectedChannel", JSON.stringify(channel));
        }
    };

    const handleToggle = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                <Box>
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
                                    width: "188px",
                                    height: "36px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    paddingRight: "12px",
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
                                    {serverData.name}
                                </Typography>
                                <IconButton
                                    aria-label="more"
                                    id="long-button"
                                    aria-controls={
                                        open ? "long-menu" : undefined
                                    }
                                    aria-expanded={open ? "true" : undefined}
                                    aria-haspopup="true"
                                    onClick={handleToggle}
                                    sx={{
                                        padding: 0,
                                        minWidth: "24px",
                                        color: "white",
                                    }}
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                                <Menu
                                    id="long-menu"
                                    MenuListProps={{
                                        "aria-labelledby": "long-button",
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    PaperProps={{
                                        style: {
                                            maxHeight: ITEM_HEIGHT * 4.5,
                                            width: "20ch",
                                        },
                                    }}
                                >
                                   
                                        <MenuItem
                                            // key={option}
                                            // selected={option === "Pyxis"}
                                            onClick={handleClose}
                                        >
                                            leave server
                                        </MenuItem>
                             
                                </Menu>
                            </Box>
                            {selectedChannel != null && (
                                <Typography
                                    style={{
                                        fontSize: "16px",
                                        fontFamily: "Sofia Sans,sans-serif ",
                                        color: "#EBF2FA",
                                    }}
                                    pl={2}
                                >
                                    {selectedChannel.name}
                                </Typography>
                            )}
                        </Toolbar>
                    </AppBar>

                    <Box
                        sx={{
                            width: `calc(100%)`,
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        <Box
                            sx={{
                                height: "100vh",
                                minWidth: "200px",
                                backgroundColor: "#122C34",
                                borderRadius: "20px 0 0 0",
                            }}
                        >
                            <Drawer
                                variant="permanent"
                                PaperProps={{
                                    sx: {
                                        marginTop: "36px",
                                        marginLeft: `${drawerWidth}px`,
                                        height: `calc(100vh - ${appBarHeight}px - 40px)`,
                                        width: "200px",
                                        color: "#EBF2FA",
                                        backgroundColor: "#122C34",
                                        border: 0,
                                        zIndex: 1,
                                        position: "absolute",
                                    },
                                    className: "custom-scrollbar",
                                }}
                            >
                                <ServerChannelsDrawer
                                    serverData={serverData}
                                    onChannelSelect={handleChannelSelect}
                                />
                            </Drawer>
                            <Box
                                sx={{
                                    marginLeft: `${drawerWidth}px`,
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
                                        sx={{
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
                        </Box>
                        <Box
                            sx={{
                                marginTop: `${36}px`,
                                height: `calc(100vh - ${36}px)`,
                                width: `calc(100vw - ${260}px)`,
                            }}
                        >
                            {showMembers ? (
                                <MembersList members={serverData.members} />
                            ) : (
                                selectedChannel && (
                                    <ChatWindow channel={selectedChannel} />
                                )
                            )}
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default ServerLayout;
