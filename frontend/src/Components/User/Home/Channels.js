import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";

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
                    <List style={{ alignItems: "center", padding: "10px" }}>
                        <Link to="@me" style={{ color: "white" }}>
                            <ListItem
                                button
                                // onClick={() => handleIconClick("chat")}
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
                        </Link>
                        <Divider
                            style={{
                                backgroundColor: "#EBF2FA",
                                marginBlock: "10px",
                            }}
                        />
                        <Link to="server" style={{ color: "white" }}>
                            <ListItem
                                button
                                // onClick={() => handleIconClick("server")}
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
                        </Link>
                    </List>
                </Drawer>
                <Outlet />
            </Box>
        </div>
    );
};

export default Channels;
