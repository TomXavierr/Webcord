import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import SettingsIcon from "@mui/icons-material/Settings";
import axios from "axios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import "./style.css";

import {
    AppBar,
    Avatar,
    Button,
    CircularProgress,
    Divider,
    Fade,
    Grow,
    IconButton,
    Menu,
    MenuItem,
    MenuList,
    Popper,
    Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import UserSettings from "../UserSettings";
import { useNavigate, useParams } from "react-router-dom";
import ServerChannelsDrawer from "./ServerChannelsDrawer";
import MembersList from "./ServerLayoutComponents/MembersList";
import ChatWindow from "./ServerLayoutComponents/ChatWindow";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ServerSettings from "./ServerMenuComponents/ServerSettings";
import InviteModal from "./ServerMenuComponents/InviteModal";
import { load_user } from "../../../../Redux/actions/userauthaction";

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
    const [anchorEl, setAnchorEl] = useState(null);
    const [isInviteModalOpen, setInviteModalOpen] = useState(false);
    const dispatch = useDispatch();
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

    const [isServerSettingsOpen, setServerSettingsOpen] = useState(
        localStorage.getItem("isServerSettingsOpen") === "true" || false
    );

    useEffect(() => {
        const storedValue = localStorage.getItem("isServerSettingsOpen");

        if (storedValue === "true") {
            setServerSettingsOpen(true);
        }
    }, []);

   
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

    const handleInviteModal = () => {
    
        setInviteModalOpen(true);
    };

    const inviteModalClose = () => {
        setInviteModalOpen(false)
    }

    const [activeServerSettingsTab, setActiveServerSettingsTab] = useState(
        localStorage.getItem("activeServerSettingsTab") || "Overview"
    );

    const handleServerSettings = () => {
        setServerSettingsOpen(true);
        localStorage.setItem("isServerSettingsOpen", "true");
    };

    const serverSettingsClose = () => {
        setServerSettingsOpen(false);
        localStorage.removeItem("activeServerSettingsTab");
        localStorage.setItem("isServerSettingsOpen", "false");
    };

    const handleTabChange = (tab) => {
        setActiveServerSettingsTab(tab);
        localStorage.setItem("activeServerSettingsTab", tab);
    };

    const handleLeaveServer = async () => {
        try {
            const token = localStorage.getItem("access");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/server/${serverId}/leave/`,
                {},
                config
            );
            if (response.status === 200) {
                console.log(response.detail);
                dispatch(load_user());
                navigate(`/channels/@me`);
            } else {
                console.error("Failed to fetch friend requests");
            }
        } catch (error) {
            console.error("Error while leaving server", error);
        }
    }


    useEffect(() => {
        getServerDetails();
    }, [serverId]);


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
                                            backgroundColor: "#073B4C",
                                        },
                                    }}
                                    transformOrigin={{
                                        horizontal: "right",
                                        vertical: "top",
                                    }}
                                    anchorOrigin={{
                                        horizontal: "right",
                                        vertical: "bottom",
                                    }}
                                >
                                    <MenuItem
                                        sx={{
                                            color: "#999999",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            paddingInline: "0px",
                                            marginInline: "6px",
                                            borderRadius: "3px",
                                            ":hover": {
                                                color: "white",
                                                backgroundColor: "#44CFCB",
                                            },
                                        }}
                                        onClick={handleServerSettings}
                                    >
                                        <Typography
                                            pl={1}
                                            style={{
                                                fontSize: "12px",
                                                fontWeight: "600",
                                                letterSpacing: "1.5px",
                                                fontFamily:
                                                    "Noto Sans, sans-serif",
                                            }}
                                        >
                                            Server Settings
                                        </Typography>
                                        <SettingsIcon sx={{ height: "16px" }} />
                                    </MenuItem>
                                    <MenuItem
                                        sx={{
                                            color: "#999999",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            paddingInline: "0px",
                                            marginInline: "6px",
                                            borderRadius: "3px",
                                            ":hover": {
                                                color: "white",
                                                backgroundColor: "#44CFCB",
                                            },
                                        }}
                                        onClick={handleInviteModal}
                                    >
                                        <Typography
                                            pl={1}
                                            style={{
                                                fontSize: "12px",
                                                fontWeight: "600",
                                                letterSpacing: "1.5px",
                                                fontFamily:
                                                    "Noto Sans, sans-serif",
                                            }}
                                        >
                                            Invite friends
                                        </Typography>
                                        <PersonAddAlt1Icon
                                            sx={{ height: "16px" }}
                                        />
                                    </MenuItem>

                                    {user.id != serverData.owner && (
                                        <div>
                                            <Divider />
                                            <MenuItem
                                                sx={{
                                                    color: "#C72D2D",
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                    paddingInline: "0px",
                                                    marginInline: "6px",
                                                    borderRadius: "3px",
                                                    ":hover": {
                                                        color: "white",
                                                        backgroundColor:
                                                            "#C72D2D",
                                                    },
                                                }}
                                                onClick={handleLeaveServer}
                                            >
                                                <Typography
                                                    pl={1}
                                                    style={{
                                                        fontSize: "12px",
                                                        fontWeight: "600",
                                                        letterSpacing: "1.5px",
                                                        fontFamily:
                                                            "Noto Sans, sans-serif",
                                                    }}
                                                >
                                                    leave server
                                                </Typography>
                                                <ArrowCircleLeftIcon
                                                    sx={{ height: "16px" }}
                                                />
                                            </MenuItem>
                                        </div>
                                    )}
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
                            <ServerSettings
                                isOpen={isServerSettingsOpen}
                                onClose={serverSettingsClose}
                                activeServerSettingsTab={
                                    activeServerSettingsTab
                                }
                                onTabChange={handleTabChange}
                                data={serverData}

                            />
                            <InviteModal
                                isOpen={isInviteModalOpen}
                                onClose={inviteModalClose}
                            />

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
