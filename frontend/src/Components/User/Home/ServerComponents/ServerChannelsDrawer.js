import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
    Typography,
} from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import ChannelCreateModal from "./ServerLayoutComponents/ChannelCreateModal";
import { useSelector } from "react-redux";
import EditChannel from "./ServerMenuComponents/EditChannel";

const ServerChannelsDrawer = ({ serverData, onChannelSelect }) => {
    const [isChannelCreateModalOpen, setChannelCreateModalOpen] =
        useState(false);
    const userId = useSelector((state) => state.auth.user.id);

    const [isEditChannelModalOpen, setEditChannelModalOpen] = useState(
        localStorage.getItem("isEditChannelModalOpen") === "true" || false
    );

    const handleOpenEditChannelModal = (channel) => {
        setEditChannelModalOpen(true);
    };

    useEffect(() => {
        localStorage.setItem("isEditChannelModalOpen", isEditChannelModalOpen);
    }, [isEditChannelModalOpen]);

    const onChannelUpdate = () => {
        onChannelSelect("members")
        localStorage.setItem("isEditChannelModalOpen", "false")
        window.location.reload();
    }
    return (
        <>
            <Box sx={{ height: "36px", padding: "10px" }}>
                <Button
                    sx={{
                        height: "36px",
                        width: "100%",
                        color: "white",
                        textTransform: "none",
                        justifyContent: "left",
                    }}
                    onClick={() => onChannelSelect("members")}
                >
                    <PeopleIcon />
                    <Typography component="div" pl={2}>
                        Members
                    </Typography>
                </Button>
            </Box>
            <Divider />
            {/* {[...Array(50)].map((_, i) => (
                <Typography >
                {i+1}
            </Typography>
            ))} */}

            <List sx={{ padding: 0, width: "188px" }}>
                {serverData.channels.map((channel) => (
                    <ListItem
                        key={channel.id}
                        sx={{
                            margin: "6px",
                            padding: 0,
                            borderRadius: "4px",
                            color: "white",
                            opacity: "70%",
                            display: "flex",
                            justifyContent: "flex-start",
                            ":hover": {
                                backgroundColor: "#0A4C5C",
                                opacity: "100%",
                                "& .settings-icon": {
                                    visibility: "visible",
                                    opacity: 1,
                                },
                            },
                        }}
                        onClick={() => onChannelSelect(channel)}
                    >
                        <ListItemIcon
                            sx={{
                                color: "white",
                                minWidth: "24px",
                                paddingLeft: "6px",
                            }}
                        >
                            <TagIcon sx={{ width: "18px" }} />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography
                                sx={{
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    fontSize: "14px",
                                }}
                            >
                                {channel.name}
                            </Typography>
                        </ListItemText>
                        {serverData.owner === userId && (
                            <ListItemIcon
                                className="settings-icon"
                                sx={{
                                    color: "white",
                                    minWidth: "24px",
                                    paddingLeft: "6px",
                                    visibility: "hidden",
                                    opacity: 0,
                                }}
                                onClick={() =>
                                    handleOpenEditChannelModal(channel)
                                }
                            >
                                <Tooltip title="Edit channel">
                                    <SettingsIcon sx={{ width: "14px" }} />
                                </Tooltip>
                            </ListItemIcon>
                        )}
                    </ListItem>
                ))}
            </List>
            {serverData.owner === userId && (
                <>
                    <Divider />
                    <Box sx={{ height: "36px", padding: "10px" }}>
                        <Button
                            sx={{
                                height: "36px",
                                width: "100%",
                                color: "white",
                                textTransform: "none",
                                justifyContent: "left",
                                backgroundColor: "#031D25",
                            }}
                            onClick={() => setChannelCreateModalOpen(true)}
                        >
                            <AddIcon />
                            <Typography component="div" pl={2}>
                                Create channel
                            </Typography>
                        </Button>
                        <ChannelCreateModal
                            isOpen={isChannelCreateModalOpen}
                            onCancel={() => setChannelCreateModalOpen(false)}
                        />
                    </Box>
                </>
            )}
            <EditChannel
                isOpen={isEditChannelModalOpen}
                onClose={() => {
                    setEditChannelModalOpen(false);
                }}
                
                onChannelUpdate ={onChannelUpdate}
            />
        </>
    );
};

export default ServerChannelsDrawer;
