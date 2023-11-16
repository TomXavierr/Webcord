import React, { useState } from "react";
import {
    Box,
    Button,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";
import ChannelCreateModal from "./ServerLayoutComponents/ChannelCreateModal";
import { useSelector } from "react-redux";

const ServerChannelsDrawer = ({ serverData, onChannelSelect }) => {
    const [isChannelCreateModalOpen, setChannelCreateModalOpen] = useState(false);
    const userId = useSelector((state) => state.auth.user.id);

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

            <List sx={{ padding: 0 }}>
                {serverData.channels.map((channel) => (
                    <ListItem
                        key={channel.id}
                        sx={{
                            color: "white",
                            display: "flex",
                            justifyContent: "flex-start",
                        }}
                        onClick={() => onChannelSelect(channel)}
                    >
                        <ListItemIcon sx={{ color: "white", minWidth: "24px" }}>
                            <TagIcon />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography
                                sx={{
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    paddingLeft: "10px",
                                }}
                            >
                                {channel.name}
                            </Typography>
                        </ListItemText>
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
        </>
    );
};

export default ServerChannelsDrawer;
