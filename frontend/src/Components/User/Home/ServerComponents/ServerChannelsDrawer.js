import React from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";

const ServerChannelsDrawer = ({ channels, onChannelSelect }) => {
    return (
        <div
            style={{
                paddingTop: "36px",
            }}
        >
            <Box sx={{ height: "36px", width: "180px", padding: "10px" }}>
                <Button
                    sx={{
                        height: "36px",
                        width: "180px",
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
            {channels.map((channel) => (
                <Box sx={{ height: "36px", width: "180px", padding: "5px" }}>
                    <Button
                        sx={{
                            height: "36px",
                            width: "180px",
                            color: "white",
                            textTransform: "none",
                            justifyContent: "left",
                        }}
                        onClick={() => onChannelSelect(channel.id)}
                    >
                        <Typography component="div">
                            # {channel.channel_name}
                        </Typography>
                    </Button>
                </Box>
            ))}
        </div>
    );
};

export default ServerChannelsDrawer;
