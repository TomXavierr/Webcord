import React from "react";
import { Link, Outlet } from "react-router-dom";

import { Avatar, Box, Tooltip } from "@mui/material";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ChatIcon from "@mui/icons-material/Chat";
import Drawer from "@mui/material/Drawer";
import { useSelector } from "react-redux";

const drawerWidth = 60;

const Channels = () => {
    const servers = useSelector((state) => state.auth.user.servers);
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
                    </List>
                    <Divider
                        style={{
                            backgroundColor: "#EBF2FA",
                            marginInline: "10px",
                        }}
                    />
                    <List style={{ alignItems: "center", padding: "10px" }}>
                        {servers.map((server) => (
                            <ListItem
                                key={server.id}
                                button
                                // onClick={() => handleIconClick("server")}
                                sx={{
                                    backgroundColor: "#073B4C",
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    display: "flex",
                                    justifyContent: "center",
                                    marginBlock: "10px",
                                }}
                            >
                                <Link to={`${server.id}`}>
                                    <Tooltip title={server.server_name}>
                                        <img
                                            src={`${process.env.REACT_APP_API_URL}/${server.server_icon}`}
                                            alt="User Avatar"
                                            style={{
                                                width: "40px",
                                                height: "40px",
                                                borderRadius: "50%",
                                            }}
                                        />
                                    </Tooltip>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <Outlet />
            </Box>
        </div>
    );
};

export default Channels;
