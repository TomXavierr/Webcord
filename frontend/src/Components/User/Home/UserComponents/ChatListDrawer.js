import React from "react";
import {
    Box,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    Toolbar,
    Typography,
} from "@mui/material";

const ChatListDrawer = () => {
    return (
        <div style={{
            paddingTop: "36px",
        }}>
            <Typography component="div" marginLeft={4}>
                Friends
            </Typography>
        </div>
    );
};

export default ChatListDrawer;
