import { Box, Button, DialogActions, Modal, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";


const EditAvatarModal = ({ isOpen, onCancel, onSave , currentAvatar }) => {
    const [newAvatar, setNewAvatar] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(
        currentAvatar ? `${process.env.REACT_APP_API_URL}/${currentAvatar}` : null
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

    const handleSubmit = async(event) => {
        event.preventDefault();

        try{
            const token = localStorage.getItem('access');
            const formData = new FormData();
            formData.append('avatar', newAvatar);

            console.log("new" + newAvatar);

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            }

            const response = await axios.put(`${process.env.REACT_APP_API_URL}/account/update/`,
            formData,
            config);

            console.log('Avatar updated successfully:', response.data.avatar);
            onSave(response.data.avatar);
        } catch (error) {
            console.error('Failed to update Avatar:', error);
        }
    }

    const handleClose = (event) => {
        event.stopPropagation();
        onCancel();
    };

    useEffect(() => {
        if (currentAvatar) {
            setPreviewUrl(`${process.env.REACT_APP_API_URL}/${currentAvatar}`);
        }
    }, [currentAvatar]);
    
    return (
        <Modal open={isOpen} onClose={onCancel} >
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
                        Edit Avatar
                    </Typography>
                    
                    {previewUrl && (
                        <img
                            src={previewUrl}
                            alt="Preview"
                            style={{
                                width: "100%",
                                height: "auto",
                                marginTop: "12px",
                                borderRadius: "8px",
                            }}
                        />
                    )}
                    <input type="file" onChange={handleFileChange}  />
                    
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary" onClick={handleSubmit}>
                            Save
                        </Button>
                    </DialogActions>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditAvatarModal;
