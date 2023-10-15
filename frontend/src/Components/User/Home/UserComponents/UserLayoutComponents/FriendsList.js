import React from "react";
import { Avatar, Box, Divider, IconButton, List, ListItem, ListItemAvatar, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";

const FriendsList = () => {

    const friendsList = useSelector((state) => state.auth.friendsList);

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
                All Friends
            </Typography>

            <List style={{ alignItems: "center" }}>
                {friendsList.map((friend) => (
                    <Box key={friend.id}>
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
                                // button
                                sx={{
                                    width: "inherit",
                                    height: "40px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Box sx={{ display: "flex" }}>
                                    <ListItemAvatar>
                                        <Avatar>{friend.id}</Avatar>
                                    </ListItemAvatar>
                                    <Box>
                                        <Typography
                                            style={{
                                                color: "white",
                                                width: "inherit",
                                            }}
                                        >
                                            {friend.username}
                                        </Typography>
                                        <Typography
                                            style={{
                                                color: "#EBF2FA",
                                                fontFamily:
                                                    "Noto Sans, sans-serif",
                                                fontSize: "12px",
                                            }}
                                        >
                                            {friend.display_name}
                                        </Typography>
                                    </Box>
                                </Box>
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        </Box>
                    </Box>
                ))}
            </List>
        </Box>
    );
};

export default FriendsList;
