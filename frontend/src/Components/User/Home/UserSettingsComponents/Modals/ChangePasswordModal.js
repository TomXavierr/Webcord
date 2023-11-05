import React, { useEffect, useState } from "react";
import {
    DialogActions,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
    Modal,
    Typography,
} from "@mui/material";
import axios from "axios";

const inputPropsStyle = {
    color: "white", // Set the text color to white
    backgroundColor: "#000000",
    fontSize: "12px",
};
const LabelStyle = {
    fontFamily: "Sofia Sans, sans-serif ",
    fontWeight: 600,
    letterSpacing: "1.5px",
    fontSize: "12px",
    color: "#EBF2FA",
    "&.Mui-focused": {
        color: "#EBF2FA",
    },
};

const ChangePasswordModal = ({ isOpen, onCancel }) => {
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    useEffect(() => {
    }, [errors]);

    const handleSave = async (event) => {
        event.preventDefault();

        if (
            passwordData.currentPassword &&
            passwordData.newPassword &&
            passwordData.confirmPassword &&
            !errors.currentPassword &&
            !errors.newPassword &&
            !errors.confirmPassword
        ) {
            if (passwordData.newPassword !== passwordData.confirmPassword) {
                setErrors({
                    ...errors,
                    confirmPassword: "Passwords do not match.",
                });
                return;
            }

            try {
                const response = await axios.patch(
                    `${process.env.REACT_APP_API_URL}/account/change-password/`,
                    {
                        current_password: passwordData.currentPassword,
                        new_password: passwordData.newPassword,
                        confirm_password: passwordData.confirmPassword,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "access"
                            )}`,
                        },
                    }
                );

                // Handle successful response here
                console.log(response.data.detail);

                // Close the modal
                onCancel();
            } catch (error) {
                console.error(
                    "Password change failed:",
                    error.response.data.detail
                );
                if (error.response.data.error === 'current_password error') {
                    setErrors({
                        ...errors,
                        currentPassword: error.response.data.detail,
                    });
                } else if (error.response.data.error === 'confirm_password error') {
                    setErrors({
                        ...errors,
                        confirmPassword: error.response.data.detail,
                    });
                } else {
                
                    setErrors({
                        ...errors,
                        confirmPassword: "Password change failed. Please try again.",
                    });
                }
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        // Update password data
        setPasswordData({
            ...passwordData,
            [name]: value,
        });

        // Validate password with regex
        if (name === "newPassword" || name === "confirmPassword") {
            const regex =
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
            const isValid = regex.test(value);

            if (!isValid) {
                setErrors({
                    ...errors,
                    [name]: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long.",
                });
            } else {
                setErrors({
                    ...errors,
                    [name]: "",
                });
            }
        }
    };

    const handleClose = (event) => {
        event.stopPropagation();
        onCancel();
    };

    return (
        <Modal open={isOpen} onClose={onCancel} maxwidth="xs">
            <Box
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Box width="400px" height="auto" p={4} bgcolor="#122C34">
                    <Typography
                        variant="h4"
                        color="#EBF2FA"
                        style={{
                            fontSize: "24px",
                        }}
                    >
                        Change Password
                    </Typography>
                    <form onSubmit={handleSave}>
                        <FormControl fullWidth margin="normal">
                            <FormLabel sx={LabelStyle}>
                                Current Password
                            </FormLabel>
                            <Input
                                name="currentPassword"
                                type="password"
                                value={passwordData.currentPassword}
                                onChange={handleChange}
                                sx={inputPropsStyle}
                            />
                            {errors.currentPassword && (
                                <Typography
                                    color="error"
                                    style={{ fontSize: "12px" }}
                                >
                                    {errors.currentPassword}
                                </Typography>
                            )}
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <FormLabel sx={LabelStyle}>New Password</FormLabel>
                            <Input
                                name="newPassword"
                                type="password"
                                value={passwordData.newPassword}
                                onChange={handleChange}
                                sx={inputPropsStyle}
                            />
                            {errors.newPassword && (
                                <Typography
                                    color="error"
                                    style={{ fontSize: "12px" }}
                                >
                                    {errors.newPassword}
                                </Typography>
                            )}
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <FormLabel sx={LabelStyle}>
                                Confirm Password
                            </FormLabel>
                            <Input
                                name="confirmPassword"
                                type="password"
                                value={passwordData.confirmPassword}
                                onChange={handleChange}
                                sx={inputPropsStyle}
                            />
                            {errors.confirmPassword && (
                                <Typography
                                    color="error"
                                    style={{ fontSize: "12px" }}
                                >
                                    {errors.confirmPassword}
                                </Typography>
                            )}
                        </FormControl>

                        <DialogActions>
                            <Button
                                onClick={(event) => handleClose(event)}
                                color="primary"
                            >
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
                                Save
                            </Button>
                        </DialogActions>
                    </form>
                </Box>
            </Box>
        </Modal>
    );
};

export default ChangePasswordModal;
