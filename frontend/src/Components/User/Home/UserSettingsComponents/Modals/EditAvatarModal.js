import { Box, Button, DialogActions, Modal, Typography } from "@mui/material";
import React, { useState } from "react";


const EditAvatarModal = ({ isOpen, onCancel, onSave }) => {
    const [image, setImage] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        onSave(image); 
    };
    
    return (
        <Modal open={isOpen} onClose={onCancel} maxWidth="xs">
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
                    <input type="file" onChange={handleFileChange} />
                    {image && (
                        <img
                            src={image}
                            alt="Selected Avatar"
                            style={{
                                width: "100%",
                                height: "auto",
                                marginTop: "16px",
                            }}
                        />
                    )}
                    <DialogActions>
                        <Button onClick={onCancel} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary" onClick={handleSave}>
                            Save
                        </Button>
                    </DialogActions>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditAvatarModal;
