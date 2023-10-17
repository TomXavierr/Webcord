import React, { useEffect, useState } from "react";
import { Avatar, Box, Divider, IconButton, List, ListItem, ListItemAvatar, Tooltip, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const FriendsList = () => {

    const [friendsList, setFriendsList] = useState([]);

    
    const fetchFriends = async () => {
        try {
            const token = localStorage.getItem("access");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/friends/friend-requests/friends_list/`,
                config
            );

            if (response.status === 200) {
                setFriendsList(response.data);
            } else {
                console.error("Failed to fetch friends");
            }
        } catch (error) {
            console.error("Error while fetching friends", error);
        }
    };

    useEffect(() => {
        fetchFriends();
    }, []); 

    const removeFriend = async (friendId) => {
        try {
            const token = localStorage.getItem("access");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            await axios.post(
                `${process.env.REACT_APP_API_URL}/friends/friend-requests/remove_friend/`,
                {
                    "friend_user_id": friendId
                },
                config
            );

            // Fetch friends again to update the data
            fetchFriends();

        } catch (error) {
            console.error("Error while removing friend", error);
        }
    };

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
                                        src={`${process.env.REACT_APP_API_URL}/${friend.avatar}`} 
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
                                <Tooltip title="Remove friend">
                                <IconButton edge="end" aria-label="Remove friend"
                                onClick={() => removeFriend(friend.id)}>
                                    <DeleteIcon sx={{ color:"white"}} />
                                </IconButton>
                                </Tooltip>
                            </ListItem>
                        </Box>
                    </Box>
                ))}
            </List>
        </Box>
    );
};

export default FriendsList;
