import {
    Avatar,
    Box,
    Button,
    Divider,
    FormControl,
    Input,
    InputBase,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import axios from "axios";

const inputPropsStyle = {
    color: "white",
    backgroundColor: "#0A4C5C",
    fontSize: "12px",
    minWidth: `calc(100% - ${20}px)`
};

const ChatWindow = (channel) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]); // Define 'messages' state
    const { serverId, channelId } = useParams();

    const socketUrl = channelId
        ? `ws://127.0.0.1:8000/${serverId}/${channelId}`
        : null;

    const fetchMessages = async (channelId) => {
        const token = localStorage.getItem("access");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/chats/${channelId}/`,
                config
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching messages:", error);
            return [];
        }
    };

    useEffect(() => {
        const loadMessages = async () => {
            if (channelId) {
                const messages = await fetchMessages(channelId);
                setMessages(messages); // Set 'messages' state
            }
        };

        loadMessages();
    }, [channelId]);

    const { sendJsonMessage } = useWebSocket(socketUrl, {
        onOpen: () => {
            console.log("Connected!");
        },
        onClose: () => {
            console.log("Closed!");
        },
        onError: () => {
            console.log("Error!");
        },
        onMessage: (msg) => {
            console.log(msg);
            const data = JSON.parse(msg.data);
            const newMessage = data.new_message;
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        },
    });

    return (
        <>
            <Box
                sx={{
                    height: `calc(100vh - ${92}px )`,
                    // width: "auto",
                    overflow: "hidden",
                    color: "white",
                }}
            >
                <List sx={{ width: "100%" }}>
                    {messages.map((msg, index) => {
                        return (
                            <ListItem key={index} alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar
                                        alt="user image"
                                        src={`${process.env.REACT_APP_API_URL}${msg.sender.avatar}`}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primaryTypographyProps={{
                                        fontSize: "12px",
                                        variant: "body2",
                                    }}
                                    primary={
                                        <Typography
                                            component={"span"}
                                            variant="body1"
                                        >
                                            {msg.sender.display_name}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography
                                            // component={"span"}
                                            variant="body1"
                                            style={{
                                                overflow: "visible",
                                                whiteSpace: "normal",
                                                textOverflow: "clip",
                                            }}
                                            sx={{
                                                // display: "inline",
                                                lineHeight: 1.2,
                                                fontWeight: 400,
                                                fontSize: "10px",
                                                letterSpacing: "-0.2px",
                                                color: "white",
                                            }}
                                        >
                                            {msg.content}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        );
                    })}
                </List>
                {/* <Divider /> */}

                <form>
                    <label>
                        Enter message:
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </label>
                </form>
                <Button
                    onClick={() => {
                        sendJsonMessage({ type: "message", message });
                    }}
                >
                    Send
                </Button>
            </Box>
            <Box sx={{ position: "sticky", bottom: 0,minWidth: `calc(100% - ${20}px)` , paddingX:"10px"}}>
                <form
                    style={{
                        bottom: 0,
                        right: 0,

                        zIndex: 1,
                    }}
                >
                   
                        <FormControl fullWidth  margin="normal">
                            
                            <InputBase
                                type="text"
                                // onChange={(e) => onChange(e)}
                                sx={inputPropsStyle}
                            />
                        </FormControl>
                   
                </form>
            </Box>
        </>
    );
};

export default ChatWindow;
