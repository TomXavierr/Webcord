import { Box, Typography } from "@mui/material";
import React from "react";

const ChatWindow = (channel) => {
    return (
        <Box
            sx={{
              height: "auto",
              width: "auto",
              overflow: "hidden"
            
            }}
            class
        >
            <Typography>ChatWindow</Typography>
            {[...Array(50)].map((_, i) => (
                <Typography >
                {i+1}
            </Typography>
            ))}
        </Box>
    );
};

export default ChatWindow;
