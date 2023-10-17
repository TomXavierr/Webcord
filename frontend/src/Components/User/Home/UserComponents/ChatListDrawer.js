import React from "react";
import {
    Box,
    Button,
    Typography,
} from "@mui/material";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const ChatListDrawer = () => {
    return (
        <div
            style={{
                paddingTop: "36px",
            }}
        >
            <Box sx={{height:"36px", width:"180px", padding:"10px" }}>
                <Button sx={{height:"36px", width:"180px",  color: "white", textTransform: "none", justifyContent: "left"  }} >

                <PeopleAltIcon/>
                <Typography component="div" pl={2}>
                    Friends
                </Typography>
                </Button>
            </Box>
        </div>
    );
};

export default ChatListDrawer;
