import {
    Avatar,
    Box,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Modal,
    Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const InviteModal = ({ isOpen, onClose }) => {
    const friends = useSelector((state) => state.auth.user.friends);
    const { serverId } = useParams();
    const userId = useSelector((state) => state.auth.user?.id);

    const sendInvite = async (friendId) => {
        try {
            const token = localStorage.getItem("access");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/server/send-invitation/`,
                {
                    "sender": userId,
                    "receiver": friendId,
                    "server": serverId,
                },
                config
            );

            console.log(response)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Box width="400px" height="auto" p={4} bgcolor="#122C34">
                    <Typography
                        sx={{
                            fontFamily: "Sofia Sans, sans-serif ",
                            fontWeight: 400,
                            letterSpacing: "1.5px",
                            fontSize: "16px",
                            color: "#EBF2FA",
                        }}
                    >
                        Invite your friends to server
                    </Typography>
                    <List>
                        {friends.map((friend) => (
                            <ListItem
                                key={friend.id}
                                sx={{
                                    display: "flex",
                                    borderRadius: "4px",
                                    padding: "4px",
                                    "&:hover": {
                                        backgroundColor: "#0A4C5C",
                                    },
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        src={
                                            friend.avatar &&
                                            `${process.env.REACT_APP_API_URL}${friend.avatar}`
                                        }
                                    />
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography
                                        sx={{
                                            color: "#EBF2FA",
                                        }}
                                    >
                                        {friend.display_name}
                                    </Typography>
                                </ListItemText>
                                <Button
                                    onClick={() => sendInvite(friend.id)}
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
                                        Invite
                                    </Typography>
                                </Button>
                            </ListItem>
                        ))}
                    </List>

                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default InviteModal;
