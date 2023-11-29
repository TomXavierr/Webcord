import {
    Box,
    Button,
    DialogActions,
    FormControl,
    FormLabel,
    Input,
    Modal,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const inputPropsStyle = {
    color: "white",
    backgroundColor: "#000000",
    fontSize: "12px",
    borderRadius: "3px",
    paddingLeft: "5px",
    height: "32px",
};

const LabelStyle = {
    fontFamily: "Sofia Sans, sans-serif ",
    fontWeight: 600,
    letterSpacing: "1.5px",
    fontSize: "12px",
    color: "#020F12",
    "&.Mui-focused": {
        color: "#020F12",
    },
};

const ChannelCreateModal = ({ isOpen, onCancel, onChannelCreate }) => {
    const [channelName, setChannelName] = useState("");
    const [topic, setTopic] = useState("");
    const { serverId } = useParams();
    

    const handleCreateChannel = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/server/channels/create/`,
                {
                    name: channelName,
                    topic: topic,
                    server: serverId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access"
                        )}`,
                    },
                }
            );
            
            window.location.reload();
            onCancel();
        } catch (error) {
            console.error("Error creating channel:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
            } else if (error.request) {
                console.error("No response received:", error.request);
            } else {
                console.error("Error setting up the request:", error.message);
            }

            alert("Error creating channel. Please try again.");
        }
    };

    return (
        <Modal open={isOpen} onClose={onCancel}>
            <Box
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Box width="400px" p={4} bgcolor="white" borderRadius={2}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mb={2}
                    >
                        <Typography
                            sx={{
                                fontFamily: "Sofia Sans, sans-serif ",
                                fontWeight: 600,
                                letterSpacing: "1.5px",
                                fontSize: "16px",
                                color: "#020F12",
                            }}
                            mb={2}
                        >
                            Create a New channel
                        </Typography>
                        {/* <Typography
                            sx={{
                                // fontFamily: "Sofia Sans, sans-serif ",
                                fontWeight: 400,
                                letterSpacing: "1.5px",
                                fontSize: "10px",
                                color: "#020F12",
                            }}
                            mb={2}
                        >
                            Give your new server a personality with a name and
                            an icon. You can alway change it later.
                        </Typography> */}

                        <FormControl fullWidth margin="normal">
                            <FormLabel sx={LabelStyle}>Channel Name</FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter new channel name"
                                value={channelName}
                                onChange={(e) => setChannelName(e.target.value)}
                                sx={inputPropsStyle}
                            />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <FormLabel sx={LabelStyle}>Topic</FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter channel topic"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                sx={inputPropsStyle}
                            />
                        </FormControl>
                    </Box>
                    <DialogActions
                        display="flex"
                        justifyContent="space-between"
                        width="100%"
                        marginTop="12px"
                    >
                        <Button onClick={onCancel} color="primary">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleCreateChannel}
                            sx={{
                                color: "white",
                                backgroundColor: "#44CFCB",
                                "&:hover": {
                                    backgroundColor: "#44CFCB",
                                },
                            }}
                        >
                            Create
                        </Button>
                    </DialogActions>
                </Box>
            </Box>
        </Modal>
    );
};

export default ChannelCreateModal;
