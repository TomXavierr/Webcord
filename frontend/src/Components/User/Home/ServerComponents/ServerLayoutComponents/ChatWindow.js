import { Box, Button, Divider, Input, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import axios from "axios";

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
            const data = JSON.parse(msg.data);
            const newMessage = data.new_message;
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        },
    });

    return (
        <Box
            sx={{
                height: "auto",
                width: "auto",
                overflow: "hidden",
                color: "white",
            }}
        >   
            <Divider />
            {messages.map((msg, index) => (
                <div key={index}>
                    <p>{msg.sender.display_name}</p>
                    <p>{msg.content}</p>
                </div>
            ))}
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
    );
};

export default ChatWindow;
