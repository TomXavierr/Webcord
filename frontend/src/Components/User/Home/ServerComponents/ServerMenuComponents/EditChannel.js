import {
    Box,
    Button,
    Divider,
    InputBase,
    List,
    ListItem,
    Modal,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import axios from "axios";
import { useDispatch } from "react-redux";

const ListTextStyle = {
    paddingLeft: "6px",
    fontSize: "14px",
    fontFamily: "Noto Sans, sans-serif",
    color: "#EBF2FA",
};

const EditChannel = ({ isOpen, onClose, onChannelUpdate }) => {
    const selectedChannel = localStorage.getItem("selectedChannel");

    const [channelName, setChannelName] = useState("");
    const [channelTopic, setChannelTopic] = useState("");
    const [channelId, setChannelId] = useState("");

    useEffect(() => {
        const parsedChannel = JSON.parse(selectedChannel);
        if (parsedChannel) {
            setChannelName(parsedChannel.name || "");
            setChannelTopic(parsedChannel.topic || "");
            setChannelId(parsedChannel.id || "");
        }
    }, [selectedChannel]);

    const accessToken = localStorage.getItem("access");
    const updateEndpoint = `${process.env.REACT_APP_API_URL}/server/channels/update/${channelId}/`;

    const handleChannelNameChange = (event) => {
        setChannelName(event.target.value);
    };
    const handleChannelTopicChange = (event) => {
        setChannelTopic(event.target.value);
    };

    const handleDeleteChannel = () => {
        const deleteEndpoint = `${process.env.REACT_APP_API_URL}/server/channels/delete/${channelId}/`;

        axios
            .delete(deleteEndpoint, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                console.log(response.data);
                localStorage.removeItem("selectedChannel");
                onChannelUpdate();
                onClose();
            })
            .catch((error) => {
                console.error("Error deleting channel:", error);
            });
    };

    const handleUpdateChannel = () => {
        const updateChannelName = () => {
            axios
                .patch(
                    updateEndpoint,
                    { name: channelName },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((response) => {
                    console.log(response.data);
                    // window.location.reload();
                })
                .catch((error) => {
                    // Handle errors
                    console.error("Error updating server name:", error);
                });
        };

        const updateChannelTopic = () => {
            axios
                .patch(
                    updateEndpoint,
                    { topic: channelTopic },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error("Error updating server name:", error);
                });
        };
        updateChannelName();
        updateChannelTopic();
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box
                sx={{
                    display: "flex",
                    height: "100vh",
                    backgroundColor: "#073B4C",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "right",
                        width: "25vw",
                        minWidth: "180px",
                        flex: "2",
                        backgroundColor: "#122C34",
                        paddingTop: "36px",
                    }}
                >
                    <Box
                        sx={{
                            justifyContent: "left",
                            flexDirection: "coloumn",
                            paddingRight: "12px",
                            backgroundColor: "#122C34",
                        }}
                    >
                        <List>
                            <ListItem
                            // sx={ListItemStyle}
                            // onClick={() => handleMenuItemClick("Overview")}
                            >
                                <Typography style={ListTextStyle}>
                                    Overview
                                </Typography>
                            </ListItem>
                        </List>

                        <Divider
                            sx={{
                                backgroundColor: "rgba(255, 255, 255, 0.5)",
                                marginInline: "6px",
                                height: ".1px",
                            }}
                        />
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "left",
                        flex: "5",
                        backgroundColor: "transparent",
                        paddingTop: "36px",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "left",
                            paddingLeft: "24px",
                            width: "45vw",
                            minWidth: "450px",
                            backgroundColor: "#transparent",
                        }}
                    >
                        <Typography
                            style={{
                                fontFamily: "Noto Sans,sans-serif",
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "#EBF2FA",
                                letterSpacing: ".5px",
                            }}
                        >
                            Channel settings
                        </Typography>
                        <Box
                            sx={{
                                display: "block",
                                marginTop: "12px",
                                position: "relative",
                            }}
                        >
                            <Typography
                                style={{
                                    fontFamily: "Noto Sans,sans-serif",
                                    fontSize: "12px",
                                    fontWeight: 400,
                                    color: "#EBF2FA",
                                    opacity: "80%",
                                    letterSpacing: ".5px",
                                    marginBottom: "8px",
                                    paddingX: "12px",
                                }}
                            >
                                CHANNEL NAME
                            </Typography>
                            <InputBase
                                type="text"
                                value={channelName}
                                onChange={(e) => setChannelName(e.target.value)}
                                sx={{
                                    color: "white",
                                    backgroundColor: "#000000",
                                    fontSize: "12px",
                                    borderRadius: "3px",
                                    paddingX: "12px",
                                    height: "32px",
                                }}
                            />
                            <Typography
                                style={{
                                    fontFamily: "Noto Sans,sans-serif",
                                    fontSize: "12px",
                                    fontWeight: 400,
                                    color: "#EBF2FA",
                                    opacity: "80%",
                                    letterSpacing: ".5px",
                                    marginBlock: "8px",
                                    paddingX: "12px",
                                }}
                            >
                                TOPIC
                            </Typography>
                            <InputBase
                                type="text"
                                value={channelTopic}
                                onChange={(e) =>
                                    setChannelTopic(e.target.value)
                                }
                                sx={{
                                    color: "white",
                                    backgroundColor: "#000000",
                                    fontSize: "12px",
                                    borderRadius: "3px",
                                    paddingX: "12px",
                                    height: "32px",
                                }}
                            />
                        </Box>
                        <Button
                            onClick={handleUpdateChannel}
                            sx={{
                                backgroundColor: "#44CFCB",
                                borderRadius: "4px",
                                height: "24px",
                                width: "fit-content",
                                color: "#000000",
                                fontSize: "14px",
                                textTransform: "none",
                                marginBlock: "12px",
                                transition: "background-color 0.3s ease",
                                ":hover": {
                                    backgroundColor: "#86ebe9",
                                },
                            }}
                        >
                            Update Channel
                        </Button>
                        <Divider
                            sx={{
                                backgroundColor: "rgba(255, 255, 255, 0.5)",
                                height: ".1px",
                            }}
                        />
                        <Typography
                            style={{
                                fontFamily: "Noto Sans,sans-serif",
                                fontSize: "12px",
                                fontWeight: 600,
                                color: "#EBF2FA",
                                letterSpacing: ".7px",
                                marginBlock: "8px",
                                paddingX: "12px",
                            }}
                        >
                            Remove channel
                        </Typography>
                        <Button
                            onClick={handleDeleteChannel}
                            sx={{
                                backgroundColor: "#C72D2D",
                                borderRadius: "4px",
                                height: "24px",
                                width: "fit-content",
                                color: "white",
                                fontSize: "14px",
                                textTransform: "none",
                                marginBlock: "12px",
                                transition: "background-color 0.3s ease",
                                ":hover": {
                                    backgroundColor: "#C72D2D",
                                },
                            }}
                        >
                            Delete Channel
                        </Button>
                    </Box>
                </Box>
                <Box
                    sx={{
                        alignItems: "center",
                        position: "absolute",
                        top: 36,
                        right: 50,
                        color: "rgba(255, 255, 255, 0.3)",
                        "&:hover": {
                            color: "rgba(255, 255, 255, 0.8)",
                        },
                    }}
                    onClick={onClose}
                >
                    <HighlightOffIcon
                        sx={{
                            borderRadius: "12px",
                        }}
                    />
                    <Typography>ESC</Typography>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditChannel;
