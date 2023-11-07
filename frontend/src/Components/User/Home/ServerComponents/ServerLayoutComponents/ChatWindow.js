import { Box, Button, Divider, Input, Typography } from "@mui/material";
import React, { useState } from "react";
import useWebSocket from "react-use-websocket";

const socketUrl = "ws://127.0.0.1:8000/ws/test";

const ChatWindow = (channel) => {
    const [message, setMessage] = useState("");
    // const [inputValue, setInputValue] = useState("")
    const [newMessage, setNewMessage] = useState([]);

    const { sendJsonMessage } = useWebSocket(socketUrl, {
        onOpen: () => {
            console.log("Connencted!");
        },
        onClose: () => {
            console.log("Closed!");
        },
        onError: () => {
            console.log("Error!");
        },
        onMessage: (msg) => {
            const data = JSON.parse(msg.data);
            setNewMessage((prev_msg) => [...prev_msg, data.new_message]);
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
            // class
        >
            <Typography>ChatWindow</Typography>
            <Divider />
            {newMessage.map((msg, index) => {
                return (
                    <div key={index}>
                        <p>{msg}</p>
                    </div>
                );
            })}
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
            <Typography></Typography>
            {/* {[...Array(50)].map((_, i) => (
                <Typography >
                {i+1}
            </Typography>
            ))} */}
        </Box>
    );
};

export default ChatWindow;
