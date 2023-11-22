import {
    Avatar,
    Badge,
    Box,
    Button,
    IconButton,
    Input,
    InputBase,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import React, { useState } from "react";
import axios from "axios";

const Overview = ({ data }) => {
    const [serverName, setServerName] = useState(data.name || "");
    const [newIcon, setNewIcon] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(data.icon || null);

    const updateEndpoint = `${process.env.REACT_APP_API_URL}/server/servers/update/${data.id}/`;
    const accessToken = localStorage.getItem("access");

    const handleServerNameChange = (event) => {
        setServerName(event.target.value);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setNewIcon(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setPreviewUrl(null);
        }
    };

    const handleUpdateServer = () => {
        const updateServerName = () => {
            axios
                .patch(
                    updateEndpoint,
                    { name: serverName },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            "Content-Type": "application/json", // Set the appropriate content type
                        },
                    }
                )
                .then((response) => {
                    // Handle the response as needed
                    console.log(response.data); // Log the response data
                })
                .catch((error) => {
                    // Handle errors
                    console.error("Error updating server name:", error);
                });
        };

        // If you are updating the server icon
        const updateServerIcon = (file) => {
            const formData = new FormData();
            if (newIcon) {
                formData.append("icon", newIcon);
            }

            axios
                .patch(updateEndpoint, formData, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error("Error updating server icon:", error);
                });
        };

        updateServerName();
        updateServerIcon();
    };

    const handleIconClick = () => {
        document.getElementById("avatar-input").click();
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "left",
                paddingLeft: "24px",
                width: "45vw",
                minWidth: "450px",
                backgroundColor: "#transparent",
            }}
        >
            <Typography
                style={{
                    fontFamily: "Noto Sans,sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#EBF2FA",
                    letterSpacing: ".5px",
                }}
            >
                Server Overview
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    marginTop: "12px",
                    position: "relative",
                }}
            >
                <Box
                    sx={{
                        width: "50%",
                        height: "100px",
                        display: "flex",
                        paddingX: "10px",
                        // alignItems: "center",
                    }}
                >
                    <Tooltip title="Update icon" followCursor>
                    <IconButton onClick={handleIconClick}>
                        <Badge
                            sx={{
                                "& .MuiBadge-badge": {
                                    color: "#44CFCB",
                                    backgroundColor: "white",
                                    width: 24,
                                    height: 24,
                                    borderRadius: 12,
                                },
                            }}
                            overlap="circular"
                            badgeContent={
                                <AddPhotoAlternateIcon
                                    sx={{
                                        width: 16,
                                        height: 16,
                                    }}
                                />
                            }
                        >
                            <Avatar
                                src={previewUrl}
                                sx={{
                                    width: 84,
                                    height: 84,
                                }}
                            />

                            <Input
                                type="file"
                                id="avatar-input"
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                            />
                        </Badge>
                    </IconButton>
                    </Tooltip>
                    <Typography
                        sx={{
                            // fontFamily: "Sofia Sans, sans-serif ",
                            fontWeight: 400,
                            letterSpacing: "1.5px",
                            fontSize: "10px",
                            color: "white",
                            paddingInline: "1px"
                        }}
                        mb={2}
                    >
                        We recommend to always set an icon so that users can
                        identify your server easily.
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: "50%",
                        paddingX: "10px",
                    }}
                >
                    <Typography
                        style={{
                            fontFamily: "Noto Sans,sans-serif",
                            fontSize: "12px",
                            fontWeight: 400,
                            color: "#EBF2FA",
                            opacity: "80%",
                            letterSpacing: ".5px",
                            marginBottom: "8px",
                            paddingX: "12px",
                        }}
                    >
                        SERVER NAME
                    </Typography>
                    <InputBase
                    
                        type="text"
                        value={serverName}
                        onChange={handleServerNameChange}
                        sx={{
                            color: "white",
                            backgroundColor: "#000000",
                            fontSize: "12px",
                            borderRadius: "3px",
                            paddingX: "12px",
                            height: "32px",
                        }}
                    />
                    <Button
                        onClick={handleUpdateServer}
                        sx={{
                            backgroundColor: "#44CFCB",
                            borderRadius: "4px",
                            height: "24px",
                            color: "#000000",
                            fontSize: "14px",
                            textTransform: "none",
                            marginTop: "12px",
                            transition: "background-color 0.3s ease",
                            ":hover": {
                                backgroundColor: "#86ebe9",
                            }
                        }}
                    >
                        Update Server
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Overview;
