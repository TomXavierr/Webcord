import React, { useEffect, useState } from "react";
import { Avatar, Box, Divider, IconButton, List, ListItem, ListItemAvatar, Tooltip, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const MembersList = ({members}) => {

    

    return (
        <Box sx={{
            paddingLeft: "20px",
            paddingTop: "10px",
        }}p
        >
            <Typography
                style={{
                    fontFamily: "Noto Sans, sans-serif",
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "white",
                }}
            >
                All Members
            </Typography>

            <List style={{ alignItems: "center" }}>
                {members.map((member) => (
                    <Box key={member.user.id}>
                        <Divider
                            style={{
                                backgroundColor: "#0A4C5C",
                                marginInline: "10px",
                            }}
                        />
                        <Box
                            sx={{
                                borderRadius: "10px",
                                py: "8px",
                                "&:hover": {
                                    backgroundColor: "#0A4C5C",
                                },
                            }}
                        >
                            <ListItem
                                sx={{
                                    width: "inherit",
                                    height: "40px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Box sx={{ display: "flex" }}>
                                    <ListItemAvatar>
                                        <Avatar> <img
                                        src={`${process.env.REACT_APP_API_URL}/${member.user.avatar}`} 
                                        alt="User Avatar"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: "50%", 
                                        }}
                                    /></Avatar>
                                    </ListItemAvatar>
                                    <Box>
                                        <Typography
                                            style={{
                                                color: "white",
                                                width: "inherit",
                                            }}
                                        >
                                            {member.user.display_name}
                                        </Typography>
                                        <Typography
                                            style={{
                                                color: "#EBF2FA",
                                                fontFamily:
                                                    "Noto Sans, sans-serif",
                                                fontSize: "12px",
                                            }}
                                        >
                                            {/* {friend.username} */}
                                        </Typography>
                                    </Box>
                                </Box>
                                
                            </ListItem>
                        </Box>
                    </Box>
                ))}
            </List>
        </Box>
    );
};

export default MembersList;
