import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

import { Avatar, Box, Tooltip } from "@mui/material";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ChatIcon from "@mui/icons-material/Chat";
import Drawer from "@mui/material/Drawer";
import { useDispatch, useSelector } from "react-redux";
import {
    checkAuthenticated,
    load_user,
} from "../../../Redux/actions/userauthaction";

const drawerWidth = 60;

const Channels = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        dispatch(load_user());
        dispatch(checkAuthenticated());
    }, [dispatch]);

    if (isAuthenticated === null || user === null) {
        return <div>Loading...</div>; // You can display a loading indicator.
    }

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
                        {user.servers.map((server) => (
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
                                    <Tooltip title={server.name}>
                                        <img
                                            src={`${process.env.REACT_APP_API_URL}/${server.icon}`}
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
