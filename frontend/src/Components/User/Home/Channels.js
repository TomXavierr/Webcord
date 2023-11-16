import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

import {
    Avatar,
    Box,
    IconButton,
    ListItemAvatar,
    ListItemIcon,
    Tooltip,
} from "@mui/material";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ChatIcon from "@mui/icons-material/Chat";
import Drawer from "@mui/material/Drawer";
import AddIcon from "@mui/icons-material/Add";

import { useDispatch, useSelector } from "react-redux";
import {
    checkAuthenticated,
    load_user,
    googleAuthenticate
} from "../../../Redux/actions/userauthaction";
import CreateServerModal from "./CreateServerModal";

const drawerWidth = 60;

const Channels = () => {
    const [isCreateServerModelOpen, setCreateServerModelOpen] = useState(false);

    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        dispatch(load_user());
        dispatch(checkAuthenticated());
    }, [dispatch]);

    if (isAuthenticated === null || user === null) {
        return <div>Loading...</div>;
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
                                sx={{
                                    backgroundColor: "#073B4C",
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "15px",
                                    display: "flex",
                                    justifyContent: "center",
                                    padding: 0,
                                    "&:hover": {
                                        backgroundColor: "#1A5969",
                                        borderRadius: "10px",
                                    },
                                }}
                            >
                                <ChatIcon sx={{ color: "#44CFCB" }} />
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
                                sx={{
                                    display: "flex",
                                    alignContent: "center",
                                }}
                                disableGutters
                            >
                                <Link
                                    to={`${server.id}`}
                                    style={{ color: "white", height: "40px" }}
                                >
                                    <Tooltip title={server.name}>
                                        <ListItemIcon
                                            sx={{
                                                minWidth: "40px",
                                                height: "40px",
                                            }}
                                        >
                                            <ListItemAvatar
                                                sx={{
                                                    minWidth: "40px",
                                                    height: "40px",
                                                }}
                                            >
                                                <Avatar
                                                    alt="server icon"
                                                    src={`${process.env.REACT_APP_API_URL}${server.icon}`}
                                                ></Avatar>
                                            </ListItemAvatar>
                                        </ListItemIcon>
                                    </Tooltip>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                    <Divider
                        style={{
                            backgroundColor: "#EBF2FA",
                            marginInline: "10px",
                        }}
                    />
                    <Box sx={{ alignItems: "center", padding: "10px" }}>
                        <Tooltip title="Create server">
                            <IconButton
                                sx={{
                                    backgroundColor: "#073B4C",
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "15px",
                                    display: "flex",
                                    justifyContent: "center",
                                    padding: 0,
                                    "&:hover": {
                                        backgroundColor: "#1A5969",
                                        borderRadius: "10px",
                                    },
                                }}
                                onClick={() => setCreateServerModelOpen(true)}
                            >
                                <AddIcon sx={{ color: "#44CFCB" }} />
                            </IconButton>

                            </Tooltip>
                            <CreateServerModal
                                isOpen={isCreateServerModelOpen}
                                onCancel={() => setCreateServerModelOpen(false)}
                            />
                    </Box>
                </Drawer>
                <Outlet />
            </Box>
        </div>
    );
};

export default Channels;
