import {
    Avatar,
    Box,
    Button,
    Divider,
    ListItem,
    ListItemButton,
    Stack,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ChangePasswordModal from "./Modals/ChangePasswordModal";
import axios from "axios";

const headingStyles = {
    fontSize: "10px",
    fontFamily: "Sofia Sans, sans-serif",
    color: "rgba(255, 255, 255, 0.8)",
    letterSpacing: "1px",
};
const textStyles = {
    fontSize: "12px",
    fontFamily: "Noto Sans, sans-serif",
    color: "#EBF2FA",
    letterSpacing: "1px",
    color: "#EBF2FA",
};

const MyProfile = () => {
    const user = useSelector((state) => state.auth.user);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
 

    const handlePasswordChange = async (
        currentPassword,
        newPassword,
        confirmPassword
    ) => {
        const token = localStorage.getItem("access");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await axios.post(
              "http://127.0.0.1:8000/auth/users/set_password/",
              {
                current_password: currentPassword,
                new_password: newPassword,
                re_new_password: confirmPassword,
              },
              config
            );
            setIsPasswordModalOpen(false);
        } catch (error) {
          console.error("Password change failed:", error);
    
        }
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
                My Profile
            </Typography>
            <Box
                sx={{
                    height: "350px",
                    backgroundColor: "#031D25",
                    borderRadius: "10px",
                    marginTop: "12px",
                    position: "relative",
                }}
            >
                <Box
                    sx={{
                        height: "72px",
                        backgroundColor: "#122C34",
                        borderRadius: "10px 10px 0 0 ",
                    }}
                ></Box>
                <Avatar
                    sx={{
                        position: "absolute",
                        top: 60,
                        left: 12,
                        height: "48px",
                        width: "48px",
                    }}
                ></Avatar>
                <Box
                    sx={{
                        marginLeft: "72px",
                        display: "flex",
                        justifyContent: "space-between",
                        paddingBlock: "8px",
                        marginRight: "12px",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "14px",
                            fontFamily: "Noto Sans, sans-serif",
                            fontWeight: "600",
                            color: "#EBF2FA",
                        }}
                    >
                        {user.username}
                    </Typography>

                    <Button
                        sx={{
                            backgroundColor: "#44CFCB",
                            borderRadius: "4px",
                            height: "24px",
                            color: "#000000",
                            fontSize: "14px",
                            textTransform: "none",
                        }}
                    >
                        <Typography
                            style={{
                                fontSize: "12px",
                            }}
                        >
                            Edit User Profile
                        </Typography>
                    </Button>
                </Box>

                <Box
                    sx={{
                        marginInline: "12px",
                        marginTop: "12px",
                        height: "214px",
                        marginBottom: "12px",
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        borderRadius: "10px",
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "fffff",
                            alignItems: "center",
                            height: "40px",
                            display: "flex",
                            paddingBlock: "6px",
                            paddingInline: "12px",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box>
                            <Typography style={headingStyles}>
                                USERNAME
                            </Typography>
                            <Typography style={textStyles}>
                                {user.username}
                            </Typography>
                        </Box>
                        <Button
                            sx={{
                                color: "#FFFFFF",
                                borderRadius: "4px",
                                height: "24px",
                                backgroundColor: "rgba(235,242,250,.3)",
                                fontSize: "14px",
                                textTransform: "none",
                            }}
                        >
                            <Typography
                                style={{
                                    fontSize: "12px",
                                }}
                            >
                                Edit
                            </Typography>
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: "fffff",
                            alignItems: "center",
                            height: "40px",
                            display: "flex",
                            paddingBlock: "6px",
                            paddingInline: "12px",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box>
                            <Typography style={headingStyles}>
                                DISPLAY NAME
                            </Typography>
                            <Typography style={textStyles}>
                                {user.display_name}
                            </Typography>
                        </Box>
                        <Button
                            sx={{
                                color: "#FFFFFF",
                                borderRadius: "4px",
                                height: "24px",
                                backgroundColor: "rgba(235,242,250,.3)",
                                fontSize: "14px",
                                textTransform: "none",
                            }}
                        >
                            <Typography
                                style={{
                                    fontSize: "12px",
                                }}
                            >
                                Edit
                            </Typography>
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: "fffff",
                            alignItems: "center",
                            height: "40px",
                            display: "flex",
                            paddingBlock: "6px",
                            paddingInline: "12px",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box>
                            <Typography style={headingStyles}>EMAIL</Typography>
                            <Typography style={textStyles}>
                                {user.email}
                            </Typography>
                        </Box>
                        <Button
                            sx={{
                                color: "#FFFFFF",
                                borderRadius: "4px",
                                height: "24px",
                                backgroundColor: "rgba(235,242,250,.3)",
                                fontSize: "14px",
                                textTransform: "none",
                            }}
                        >
                            <Typography
                                style={{
                                    fontSize: "12px",
                                }}
                            >
                                Edit
                            </Typography>
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: "fffff",
                            alignItems: "center",
                            height: "40px",
                            display: "flex",
                            paddingBlock: "6px",
                            paddingInline: "12px",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box>
                            <Typography style={headingStyles}>PHONE</Typography>
                            <Typography style={textStyles}>
                                {user.phone}
                            </Typography>
                        </Box>
                        <Button
                            sx={{
                                color: "#FFFFFF",
                                borderRadius: "4px",
                                height: "24px",
                                backgroundColor: "rgba(235,242,250,.3)",
                                fontSize: "14px",
                                textTransform: "none",
                            }}
                        >
                            <Typography
                                style={{
                                    fontSize: "12px",
                                }}
                            >
                                Edit
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>

            <Divider
                sx={{
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    marginBlock: "24px",
                    height: ".1px",
                }}
            />
            <Stack>
                <Typography
                    style={{
                        fontFamily: "Noto Sans,sans-serif",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#EBF2FA",
                        letterSpacing: ".5px",
                        marginBottom: "12px",
                    }}
                >
                    Password and Authentication
                </Typography>

                <Button
                    onClick={() => setIsPasswordModalOpen(true)}
                    style={{
                        backgroundColor: "#44CFCB",
                        borderRadius: "4px",
                        height: "24px",
                        width: "fit-content",
                        color: "#000000",
                        fontSize: "14px",
                        textTransform: "none",
                    }}
                >
                    <Typography
                        style={{
                            fontSize: "12px",
                        }}
                    >
                        Change Password
                    </Typography>
                    <ChangePasswordModal
                        isOpen={isPasswordModalOpen}
                        onClose={() => setIsPasswordModalOpen(false)}
                        onPasswordChange={handlePasswordChange}
                    />
                </Button>
            </Stack>
        </Box>
    );
};

export default MyProfile;
