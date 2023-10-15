import {
    Avatar,
    Box,
    Button,
    Divider,
    IconButton,
    Input,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Tooltip,
    Typography,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const inputPropsStyle = {
    color: "white", // Set the text color to white
    backgroundColor: "#000000",
    fontSize: "12px",
    flex: 1,
    marginRight: "8px",
    borderRadius: "4px",
    paddingLeft: "10px",
};

const AddFriend = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const userId = useSelector((state) => state.auth.user?.id);

    const handleSearch = async (query) => {
        if (!query) {
            setSearchResults([]);
            return;
        }

        setLoading(true);
        try {
            const results = await searchUsers(query);
            setSearchResults(results);
            setError(null);
        } catch (error) {
            console.error("Error fetching user data:", error.message);
            setError("An error occurred while fetching user data.");
        } finally {
            setLoading(false);
        }
    };

    const searchUsers = async (query) => {
        const token = localStorage.getItem("access");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/friends/friend-requests/user_search/?query=${query}`,
                config
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching user data:", error.message);
            return [];
        }
    };

    const handleAddFriend = async (user) => {
        const senderId = userId;
        const receiverId = user.id;

        const token = localStorage.getItem("access");
        const url = `${process.env.REACT_APP_API_URL}/friends/friend-requests/`;

        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                sender: senderId,
                receiver: receiverId,
            }),
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Handle success, maybe update UI or show a message
            console.log("Friend request sent successfully");
        } catch (error) {
            // Handle error, maybe show an error message
            console.error("Error sending friend request:", error.message);
        }
    };

    useEffect(() => {
        handleSearch(searchQuery);
    }, [searchQuery]);

    return (
        <Box
            sx={{
                paddingLeft: "20px",
                paddingTop: "10px",
            }}
        >
            <Typography
                style={{
                    fontFamily: "Noto Sans, sans-serif",
                    fontSize: "14px",
                    color: "white",
                }}
            >
                Add Friend
            </Typography>
            <Typography
                style={{
                    fontFamily: "Noto Sans, sans-serif",
                    fontSize: "10px",
                    color: "white",
                    marginBottom: "10px",
                }}
            >
                You can add friends with their Webcord usernames.
            </Typography>
            <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
                <Input
                    placeholder="Search users"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ ...inputPropsStyle }}
                ></Input>
            </Box>
            <List style={{ alignItems: "center" }}>
                {searchResults.map((user) => (
                    <Box key={user.id}>
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
                                        <Avatar>{user.id}</Avatar>
                                    </ListItemAvatar>
                                    <Box>
                                    <Typography
                                            style={{
                                                color: "white",
                                                width: "inherit",
                                            }}
                                        >
                                            {user.username}
                                        </Typography>
                                        <Typography
                                            style={{
                                                color: "#EBF2FA",
                                                fontFamily:
                                                    "Noto Sans, sans-serif",
                                                fontSize: "12px",
                                            }}
                                        >
                                            {user.display_name}
                                        </Typography>
                                    </Box>
                                </Box>
                                {/* Add Friend Button */}
                                <Tooltip title="Add friend"
                                    onClick={() => handleAddFriend(user)}
                                   
                                >
                                    <IconButton edge="end" aria-label="delete">

                                    <PersonAddIcon sx={{color:"white"}}/>
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

export default AddFriend;
