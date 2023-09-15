import React, { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
// import CssBaseline from "@mui/material/CssBaseline";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItemButton from "@mui/material/ListItemButton";
// import MailIcon from "@mui/icons-material/Mail";
import ListItem from "@mui/material/ListItem";
import ChatIcon from "@mui/icons-material/Chat";
import Drawer from "@mui/material/Drawer";
import SettingsIcon from "@mui/icons-material/Settings";
import { AppBar, Avatar, Button, IconButton, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../Redux/actions/userauthaction";
import UserSettings from "./UserSettings";

const drawerWidth = 60;

const toolbarStyle = {
    minHeight: "36px",
    display: "flex",
    justifyContent: "space-between",
};

const Layout = () => {
    const [isUserSettingsOpen, setUserSettingsOpen] = useState(false);

    const handleSettingsIconClick = () => {
        setUserSettingsOpen(true);
    };

    const handleCloseUserSettings = () => {
        setUserSettingsOpen(false);
    };

    const username = useSelector((state) => state.auth.user?.username);

    return (
        <div>
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
                    </List>
                </Drawer>
                <Box
                    sx={{
                        borderRadius: "20px 0 0 0",
                        marginLeft: "60px",
                        width: `calc(100% - ${drawerWidth}px)`,
                        backgroundColor: "#073B4C",
                    }}
                >
                    <AppBar
                        position="fixed"
                        sx={{
                            width: `calc(100% - ${drawerWidth}px)`,
                            backgroundColor: "transparent",
                            zIndex: 3,
                        }}
                    >
                        <Toolbar variant="dense" style={toolbarStyle}>
                            <Typography variant="h6" noWrap component="div">
                                Home
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <Box
                        sx={{
                            marginTop: "36px",
                            width: `calc(100% - ${drawerWidth}px)`,
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        <Drawer
                            variant="permanent"
                            PaperProps={{
                                sx: {
                                    borderRadius: "20px 0 0 0",
                                    marginLeft: `${drawerWidth}px`,
                                    width: "200px",
                                    color: "#EBF2FA",
                                    backgroundColor: "#122C34",
                                    zIndex: 1,
                                    position: "absolute",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    width: "200px",
                                    height: "40px",
                                    backgroundColor: "#031D25",
                                    color: "#EBF2FA",
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        padding: "8px",
                                    }}
                                >
                                    <Stack direction="row" spacing={1}>
                                        <Avatar
                                            style={{
                                                width: "24px",
                                                height: "24px",
                                            }}
                                        ></Avatar>
                                        <Typography
                                            style={{
                                                fontFamily:
                                                    "Noto Sans, sans-serif",
                                                fontSize: "14px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {username}
                                        </Typography>
                                    </Stack>
                                    <IconButton
                                        onClick={handleSettingsIconClick}
                                        style={{
                                            width: "24px",
                                            height: "24px",
                                            color: "white",
                                        }}
                                    >
                                        <SettingsIcon />
                                    </IconButton>
                                    <UserSettings isOpen={isUserSettingsOpen} onClose={handleCloseUserSettings} />
                                </Box>
                            </Box>
                        </Drawer>
                        <Box
                            sx={{
                                marginLeft: "200px",
                                height: `calc(100vh - ${36}px)`,
                            }}
                        >
                            <Typography paragraph sx={{ padding: "12px" }}>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                                Rhoncus dolor purus non enim praesent elementum
                                facilisis leo vel. Risus at ultrices mi tempus
                                imperdiet. Semper risus in hendrerit gravida
                                rutrum quisque non tellus. Convallis convallis
                                tellus id interdum velit laoreet id donec
                                ultrices. Odio morbi quis commodo odio aenean
                                sed adipiscing. Amet nisl suscipit adipiscing
                                bibendum est ultricies integer quis. Cursus
                                euismod quis viverra nibh cras. Metus vulputate
                                eu scelerisque felis imperdiet proin fermentum
                                leo. Mauris commodo quis imperdiet massa
                                tincidunt. Cras tincidunt lobortis feugiat
                                vivamus at augue. At augue eget arcu dictum
                                varius duis at consectetur lorem. Velit sed
                                ullamcorper morbi tincidunt. Lorem donec massa
                                sapien faucibus et molestie ac.
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default Layout;
