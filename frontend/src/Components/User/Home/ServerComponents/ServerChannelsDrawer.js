import React from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";


const appBarHeight = 36;

const ServerChannelsDrawer = ({ channels, onChannelSelect }) => {
    return (
        <div
            style={{
                width: "184px",
                height: `calc(100vh - ${appBarHeight}px - 40px)`,
            }}
        >
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
            {channels.map((channel) => (
                <Box key={channel.id} sx={{ height: "36px", padding: "5px" }}>
                    <Button
                        sx={{
                            height: "36px",
                            color: "white",
                            textTransform: "none",
                            justifyContent: "left",
                        }}
                        onClick={() => onChannelSelect(channel.id)}
                    >
                        <Typography component="div">
                            # {channel.name}
                        </Typography>
                    </Button>
                </Box>
            ))}
        </div>
    );
};

export default ServerChannelsDrawer;
