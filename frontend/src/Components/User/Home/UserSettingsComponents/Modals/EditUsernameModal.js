import React, { useState } from "react";
import axios from "axios";
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

const EditUserameModal = ({ isOpen, onCancel, value, onChange, onSave }) => {
    const [newUsername, setNewUsername] = useState(value);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (Object.keys(errors).length === 0) {
                const token = localStorage.getItem("access");
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.put(
                    `${process.env.REACT_APP_API_URL}/account/update/`,
                    {
                        username: newUsername,
                    },
                    config
                );

                console.log(
                    "usernameupdated successfully:",
                    response.data
                );
                onSave(newDisplayName);

                onCancel();
            } else {
                console.error("Cannot submit. Display name is invalid.");
            }
        } catch (error) {
            console.error("Failed to update Display Name:", error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setUsername(value);

        const isValidLength = /^.{1,23}$/;
        const isValid = isValidLength.test(value);

        if (!isValid) {
            setErrors({
                ...errors,
                [name]: "Username too long",
            });
        } else {
            setErrors({
                ...errors,
                [name]: "",
            });
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
                        Edit Display Name
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth margin="normal">
                            <FormLabel sx={LabelStyle}>
                                New Display Name
                            </FormLabel>
                            <Input
                                name="newUsername"
                                type="text"
                                value={newUsername}
                                onChange={handleChange}
                                sx={inputPropsStyle}
                            />
                            {errors.newDisplayName && (
                                <Typography color="error" fontSize="12px">
                                    {errors.newUsername}
                                </Typography>
                            )}
                        </FormControl>

                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
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

export default EditUserameModal;
