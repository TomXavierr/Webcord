import React from "react";
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

const appBarHeight = 36;

const ServerChannelsDrawer = ({ channels, onChannelSelect }) => {
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

            <List sx={{ padding: 0}}>
                {channels.map((channel) => (
                    <ListItem
                        key={channel.id}
                        sx={{
                            color: "white",
                            display: "flex",
                            justifyContent: "flex-start"
                        }}
                        onClick={() => onChannelSelect(channel.id)}
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
                                    paddingLeft: "10px"
                                }}
                            >
                               {channel.name} 
                            </Typography>
                        </ListItemText>
                    </ListItem>
                ))}
            </List>

    
        </>
    );
};

export default ServerChannelsDrawer;
