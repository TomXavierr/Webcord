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

const EditEmailModal = ({ isOpen, onCancel, value, onChange, onSave }) => {
    const [newEmail, setNewEmail] = useState(value);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem("access");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/account/update/`,
                {
                    email: newEmail,
                },
                config
            );

            console.log("Display name updated successfully:", response.data);
            onSave(newEmail);

            onCancel();
            {
                console.error("Cannot submit. Display name is invalid.");
            }
        } catch (error) {
            console.error("Failed to update Display Name:", error);
        }
    };

    const handleChange = (event) => {
        const { email, value } = event.target;

        setNewEmail(value);

        // const isValidLength = /^.{1,23}$/;
        // const isValid = isValidLength.test(value);

        // if (!isValid) {
        //     setErrors({
        //         ...errors,
        //         [email]: "Display name too long",
        //     });
        // } else {
        //     setErrors({
        //         ...errors,
        //         [email]: "",
        //     });
        // }
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
                        Edit Email
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth margin="normal">
                            <FormLabel sx={LabelStyle}>New Email</FormLabel>
                            <Input
                                name="newEmail"
                                type="email"
                                value={newEmail}
                                onChange={handleChange}
                                sx={inputPropsStyle}
                            />
                            {errors.newEmail && (
                                <Typography color="error" fontSize="12px">
                                    {errors.newEmail}
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

export default EditEmailModal;
