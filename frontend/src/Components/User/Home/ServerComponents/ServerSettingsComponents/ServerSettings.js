import { Box, Divider, List, ListItem, Modal, Typography } from "@mui/material";
import React from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Roles from "./Roles";
import Overview from "./Overview";
import Invites from "./Invites";
import Members from "./Members";

const ListItemStyle = {
    ":hover": {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
    },
};

const ListTextStyle = {
    paddingLeft: "6px",
    fontSize: "14px",
    fontFamily: "Noto Sans, sans-serif",
    color: "#EBF2FA",
};

const ServerSettings = ({
    isOpen,
    onClose,
    activeServerSettingsTab,
    onTabChange,
    data
}) => {
    const handleMenuItemClick = (menuItem) => {
        onTabChange(menuItem);
    };


    const dispatch = useDispatch();
    const navigate = useNavigate();

    let selectedComponent;

    switch (activeServerSettingsTab) {
        case "Overview":
            selectedComponent = <Overview data={data}/>;
            break;
        case "Roles":
            selectedComponent = <Roles data={data}/>;
            break;
        case "Members":
            selectedComponent = <Members data={data}/>;
            break;
        case "Invites":
            selectedComponent = <Invites data={data} />;
            break;
        default:
            selectedComponent = <Overview data={data}/>;
            break;
    }

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box
                sx={{
                    display: "flex",
                    height: "100vh",
                    backgroundColor: "#073B4C",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "right",
                        width: "25vw",
                        minWidth: "180px",
                        flex: "2",
                        backgroundColor: "#122C34",
                        paddingTop: "36px",
                    }}
                >
                    <Box
                        sx={{
                            justifyContent: "left",
                            flexDirection: "coloumn",
                            paddingRight: "12px",
                            backgroundColor: "#122C34",
                        }}
                    >
                        <Typography
                            style={{
                                paddingLeft: "6px",
                                fontFamily: "Sofia Sans,sans-serif",
                                fontSize: "14px",
                                fontWeight: 600,
                                color: "#EBF2FA",
                                letterSpacing: ".5px",
                            }}
                        >
                            SERVER SETTINGS
                        </Typography>
                        <List>
                            <ListItem
                                sx={ListItemStyle}
                                onClick={() => handleMenuItemClick("Overview")}
                            >
                                <Typography style={ListTextStyle}>
                                    Overview
                                </Typography>
                            </ListItem>
                            <ListItem
                                sx={ListItemStyle}
                                onClick={() => handleMenuItemClick("Roles")}
                            >
                                <Typography style={ListTextStyle}>
                                    Roles
                                </Typography>
                            </ListItem>
                            <ListItem
                                sx={ListItemStyle}
                                onClick={() => handleMenuItemClick("Members")}
                            >
                                <Typography style={ListTextStyle}>
                                    Members
                                </Typography>
                            </ListItem>
                            <ListItem
                                sx={ListItemStyle}
                                onClick={() => handleMenuItemClick("Invites")}
                            >
                                <Typography style={ListTextStyle}>
                                    Invites
                                </Typography>
                            </ListItem>
                        </List>

                        <Divider
                            sx={{
                                backgroundColor: "rgba(255, 255, 255, 0.5)",
                                marginInline: "6px",
                                height: ".1px",
                            }}
                        />
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "left",
                        flex: "5",
                        backgroundColor: "transparent",
                        paddingTop: "36px",
                    }}
                >
                    {selectedComponent}
                </Box>
                <Box
                    sx={{
                        alignItems: "center",
                        position: "absolute",
                        top: 36,
                        right: 50,
                        color: "rgba(255, 255, 255, 0.3)",
                        "&:hover": {
                            color: "rgba(255, 255, 255, 0.8)",
                        },
                    }}
                    onClick={onClose}
                >
                    <HighlightOffIcon
                        sx={{
                            borderRadius: "12px",
                        }}
                    />
                    <Typography>ESC</Typography>
                </Box>
            </Box>
        </Modal>
    );
};

export default ServerSettings;
