import {
    Avatar,
    Box,
    IconButton,
    InputBase,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { useSelector } from "react-redux";

const inputPropsStyle = {
    color: "white",
    backgroundColor: "#0A4C5C",
    fontSize: "12px",
    maxHeight: "72px",
    minHeight: "16px",
};

const ChatWindow = (channel) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const { serverId, channelId } = useParams();
    const [inputHeight, setInputHeight] = useState("24px");
    const userId = useSelector((state) => state.auth.user.id);


    const inputRef = useRef(null);
    const scrollRef = useRef(null);

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

    const updateListHeight = useCallback(() => {
        if (scrollRef.current && inputRef.current) {
            const newInputHeight = `${inputRef?.current?.clientHeight}px`;
            setInputHeight(newInputHeight);
            scrollRef.current.style.height = `calc(100vh - 52px - ${newInputHeight})`;
        }
    }, [inputRef?.current?.clientHeight]);

    const scrollToBottom = useCallback(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, []);

    useEffect(() => {
        const loadMessages = async () => {
            if (channelId) {
                const messages = await fetchMessages(channelId);
                setMessages(messages);
            }
        };
        loadMessages();
    }, [channelId]);

    useEffect(() => {
        updateListHeight();
        scrollToBottom();
    }, [messages, updateListHeight, scrollToBottom]);

    function formatTimeStamp(timestamp) {
        const date = new Date(Date.parse(timestamp));
        const formatedDate = `${date.getDate()}/${
            date.getMonth() + 1
        }/${date.getFullYear()}`;
        const formatedTime = date.toLocaleDateString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
        return ` ${formatedTime}`;
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (message.trim() !== "") {

                sendJsonMessage({ type: "message", message, userId });
                setMessage("");
                updateListHeight();
            }
        }
    };

    const handleSendClick = () => {
        if (message.trim() !== "") {
            console.log({ type: "message", message, userId });
            sendJsonMessage({ type: "message", message, userId });
            setMessage("");
            updateListHeight();
        }
    };

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

    function formatDate(timestamp) {
        const date = new Date(Date.parse(timestamp));
        const options = { day: "numeric", month: "long", year: "numeric" };
        return date.toLocaleDateString("en-GB", options);
    }

    const isDifferentDate = (prevMessage, currentMessage) => {
        if (!prevMessage || !currentMessage) {
            return true;
        }
        const prevDate = formatDate(prevMessage.timestamp);
        const currentDate = formatDate(currentMessage.timestamp);
        return prevDate !== currentDate;
    };

    return (
        <>
            <Box
                ref={scrollRef}
                sx={{
                    height: `calc(100vh - ${50}px - ${inputHeight} )`,
                    overflowY: "auto",
                    color: "white",

                    "&::-webkit-scrollbar": {
                        width: "6px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#020F12",
                        borderRadius: "3px",
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "#122C34",
                    },
                }}
            >
        
                <List sx={{ width: "100%" }}>
                    {messages.map((msg, index) => {
                        const prevMessage = messages[index - 1];
                        const showDateSeparator = isDifferentDate(
                            prevMessage,
                            msg
                        );

                        return (
                            <React.Fragment key={index}>
                                {showDateSeparator && (
                                    <ListItem alignItems="center">
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: "#B4E7F8",
                                                textAlign: "center",
                                                width: "100%",
                                            }}
                                        >
                                            {formatDate(msg.timestamp)}
                                        </Typography>
                                    </ListItem>
                                )}
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={msg.sender.display_name}
                                            src={`${msg.sender.avatar}`}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primaryTypographyProps={{
                                            fontSize: "12px",
                                            variant: "body2",
                                        }}
                                        primary={
                                            <>
                                                <Typography
                                                    component={"span"}
                                                    variant="body1"
                                                >
                                                    {msg.sender.display_name}
                                                </Typography>
                                                <Typography
                                                    component="span"
                                                    variant="caption"
                                                    sx={{ color: "#B4E7F8" }}
                                                >
                                                    {" "}
                                                    {formatTimeStamp(
                                                        msg.timestamp
                                                    )}
                                                </Typography>
                                            </>
                                        }
                                        secondary={
                                            <Typography
                                                variant="body1"
                                                style={{
                                                    overflow: "visible",
                                                    whiteSpace: "normal",
                                                    textOverflow: "clip",
                                                    wordWrap: "break-word",
                                                }}
                                                sx={{
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
                            </React.Fragment>
                        );
                    })}
                </List>
            </Box>
            <Box
                sx={{
                    position: "fixed",
                    bottom: 0,
                    // width: "100%",
                    display: "flex",
                    alignItems: "center",
                    width: `calc(100vw - ${260}px)`,
                    paddingBottom: "7px",
                }}
            >
                <Box
                    sx={{
                        width: `calc(100% - ${50}px)`,
                        paddingLeft: "10px",
                        position: "relative",
                        bottom: 0,
                    }}
                    ref={inputRef}
                >
                    <InputBase
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        sx={{
                            ...inputPropsStyle,
                            flexGrow: 1,
                            minHeight: inputHeight,
                        }}
                        multiline
                        minRows={1}
                        maxRows={4}
                        placeholder=" Type your message..."
                        fullWidth
                    />
                </Box>
                <IconButton
                    onClick={handleSendClick}
                    sx={{ color: "white", padding: 0, paddingLeft: "10px" }}
                >
                    <SendIcon />
                </IconButton>
            </Box>
        </>
    );
};

export default ChatWindow;
