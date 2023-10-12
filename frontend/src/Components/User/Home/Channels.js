import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { Box, Button } from "@mui/material";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ChatIcon from "@mui/icons-material/Chat";
import Drawer from "@mui/material/Drawer";

import UserLayout from "./UserComponents/UserLayout";
import ServerLayout from "./ServerComponents/ServerLayout";

const drawerWidth = 60;

const Channels = () => {
    const location = useLocation();
    const { serverId } = useParams();
    const [selectedIcon, setSelectedIcon] = useState("chat"); // Set default to "chat"

   

    const handleIconClick = (icon) => {
        setSelectedIcon(icon);
    };

    useEffect(() => {
        // Update the selectedIcon based on the route
        if (location.pathname.includes("@me")) {
          setSelectedIcon("chat");
        } else {
          setSelectedIcon("server");
        }
      }, [location.pathname]);
    
    return (
        <div
            style={{
                display: "flex",
                height: "100vh",
                backgroundColor: "#020F12",
            }}
        >
            <Box sx={{ display: "flex" }}>
                <Drawer
                    variant="permanent"
                    PaperProps={{
                        sx: {
                            width: drawerWidth,
                            color: "#EBF2FA",
                            backgroundColor: "#020F12",
                        },
                    }}
                >
                    {/* <List style={{ alignItems: "center", padding: "10px" }}>
                        <ListItem
                            sx={{
                                backgroundColor: "#073B4C",
                                width: "40px",
                                height: "40px",
                                borderRadius: "10px",
                                display: "flex",
                                justifyContent: "center",
                                padding: 0,
                            }}
                        >
                            <ChatIcon />
                        </ListItem>
                        <Divider
                            style={{
                                backgroundColor: "#EBF2FA",
                                marginBlock: "10px",
                            }}
                        />
                    </List> */}
                    <List style={{ alignItems: "center", padding: "10px" }}>
                        <ListItem
                            button
                            onClick={() => handleIconClick("chat")}
                            sx={{
                                backgroundColor: "#073B4C",
                                width: "40px",
                                height: "40px",
                                borderRadius: "10px",
                                display: "flex",
                                justifyContent: "center",
                                padding: 0,
                            }}
                        >
                            <ChatIcon />
                        </ListItem>
                        <Divider
                            style={{
                                backgroundColor: "#EBF2FA",
                                marginBlock: "10px",
                            }}
                        />
                        <ListItem
                            button
                            onClick={() => handleIconClick("server")}
                            sx={{
                                backgroundColor: "#073B4C",
                                width: "40px",
                                height: "40px",
                                borderRadius: "10px",
                                display: "flex",
                                justifyContent: "center",
                                padding: 0,
                            }}
                        >
                            {/* <ServerIcon /> */}
                        </ListItem>
                    </List>
                </Drawer>
                 {selectedIcon === "chat" ? <UserLayout /> : <ServerLayout serverId={serverId} />}
            </Box>
        </div>
    );
};

export default Channels;
