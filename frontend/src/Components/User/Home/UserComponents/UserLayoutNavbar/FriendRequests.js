import {
    Avatar,
    Box,
    Button,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { load_user } from "../../../../../Redux/actions/userauthaction";

const FriendRequests = () => {
    const [friendRequests, setFriendRequests] = useState([]);
    const receiverId = useSelector((state) => state.auth.user.id);
    const dispatch = useDispatch();

    const acceptFriendRequest = async (friendRequestId) => {
        try {
            const token = localStorage.getItem("access");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.post(
                `${process.env.REACT_APP_API_URL}/friends/friend-requests/${friendRequestId}/accept/`,
                {},
                config
            );

            toast("Friend Request Accepted", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });

            dispatch(load_user());
            fetchFriendRequests();
        } catch (error) {
            console.error("Error while accepting friend request", error);
        }
    };

    const declineFriendRequest = async (friendRequestId) => {
        try {
            const token = localStorage.getItem("access");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.post(
                `${process.env.REACT_APP_API_URL}/friends/friend-requests/${friendRequestId}/decline/`,
                {},
                config
            );
            
            toast("Friend Request Rejected", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            fetchFriendRequests();
        } catch (error) {
            console.error("Error while declining friend request", error);
        }
    };

    const fetchFriendRequests = async () => {
        try {
            const token = localStorage.getItem("access");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/friends/friend-requests/friend_requests_list/`,
                config
            );
            if (response.status === 200) {
                setFriendRequests(response.data);
            } else {
                console.log("Failed to fetch friend requests");
            }
        } catch (error) {
            console.error("Error while fetching friend requests", error);
        }
    };

    useEffect(() => {
        fetchFriendRequests();
    }, [receiverId]);

    return (
        <Box
            sx={{
                paddingLeft: "20px",
                paddingTop: "10px",
            }}
            p
        >
            <Typography
                style={{
                    fontFamily: "Noto Sans, sans-serif",
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "white",
                }}
            >
                All Requests
            </Typography>

            <List style={{ alignItems: "center" }}>
                {friendRequests.map((request) => (
                    <Box key={request.id}>
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
                                        <Avatar src={`${process.env.REACT_APP_API_URL}${request.sender_details.avatar}`} />
                                            
                                        
                                    </ListItemAvatar>
                                    <Box>
                                        <Typography
                                            style={{
                                                color: "white",
                                                width: "inherit",
                                            }}
                                        >
                                            {request.sender_details.display_name}
                                        </Typography>
                                        <Typography
                                            style={{
                                                color: "#EBF2FA",
                                                fontFamily:
                                                    "Noto Sans, sans-serif",
                                                fontSize: "12px",
                                            }}
                                        >
                                            {
                                                request.sender_details
                                                    .username
                                            }
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box>
                                    <Button
                                        onClick={() =>
                                            acceptFriendRequest(request.id)
                                        }
                                        sx={{
                                            backgroundColor: "#32965d",
                                            borderRadius: "4px",
                                            height: "20px",
                                            color: "white",
                                            fontSize: "14px",
                                            textTransform: "none",
                                            marginRight: "10px",
                                            "&:hover": {
                                                backgroundColor: "#1e604e",
                                            },
                                        }}
                                    >
                                        <Typography
                                            style={{
                                                fontSize: "12px",
                                            }}
                                        >
                                            Accept
                                        </Typography>
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            declineFriendRequest(request.id)
                                        }
                                        sx={{
                                            backgroundColor: "#bf1e15",
                                            borderRadius: "4px",
                                            height: "20px",
                                            color: "white",
                                            fontSize: "14px",
                                            textTransform: "none",
                                            "&:hover": {
                                                backgroundColor: "#751510",
                                            },
                                        }}
                                    >
                                        <Typography
                                            style={{
                                                fontSize: "12px",
                                            }}
                                        >
                                            Decline
                                        </Typography>
                                    </Button>
                                </Box>
                            </ListItem>
                        </Box>
                    </Box>
                ))}
            </List>
        </Box>
    );
};

export default FriendRequests;
