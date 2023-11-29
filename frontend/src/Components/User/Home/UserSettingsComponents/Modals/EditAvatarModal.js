import {
    Box,
    Button,
    DialogActions,
    IconButton,
    Input,
    Modal,
    Typography,
} from "@mui/material";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const EditAvatarModal = ({ isOpen, onCancel, onSave }) => {
    const [newAvatar, setNewAvatar] = useState(null);
    const currentAvatar = useSelector((state) => state.auth.user.avatar);

    const [previewUrl, setPreviewUrl] = useState(
        currentAvatar
            ? `${process.env.REACT_APP_API_URL}${currentAvatar}`
            : null
    );

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setNewAvatar(file);

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem("access");
            const formData = new FormData();
            formData.append("avatar", newAvatar);

            console.log("new" + newAvatar);

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            };

            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/account/update/`,
                formData,
                config
            );

            console.log("Avatar updated successfully:", response.data.avatar);
            onSave(response.data.avatar);
        } catch (error) {
            console.error("Failed to update Avatar:", error);
        }
    };

    const handleClose = (event) => {
        event.stopPropagation();
        onCancel();
    };

    useEffect(() => {
        if (currentAvatar) {
            setPreviewUrl(`${process.env.REACT_APP_API_URL}${currentAvatar}`);
        }
    }, [currentAvatar]);

    return (
        <Modal open={isOpen} onClose={onCancel}>
            <Box
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Box width="400px" p={4} bgcolor="#122C34" borderRadius={2}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                        
                    >
                        <Typography
                            variant="h4"
                            color="#EBF2FA"
                            fontSize="24px"
                        >
                            Edit Avatar
                        </Typography>
                        <IconButton onClick={onCancel} color="primary">
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {previewUrl !== null && (
                            <img
                                src={previewUrl}
                                alt="Preview"
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    borderRadius: "50px",
                                    border: "1px solid #44CFCB",
                                    objectFit: "cover",
                                }}
                            />
                        )}
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <label
                            htmlFor="avatar-input"
                            style={{ display: "block" }}
                        >
                            <Input
                                type="file"
                                id="avatar-input"
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                            />
                            <Button
                                component="span"
                                sx={{
                                    backgroundColor: "#44CFCB",
                                    borderRadius: "4px",
                                    height: "24px",
                                    color: "#000000",
                                    fontSize: "12px",
                                    textTransform: "none",
                            
                                }}
                            >
                                Choose Avatar
                            </Button>
                        </label>

                        <DialogActions
                            sx={{
                                display: "flex",
                            }}
                        >
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                color="primary"
                                onClick={handleSubmit}
                            >
                                Save
                            </Button>
                        </DialogActions>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditAvatarModal;
