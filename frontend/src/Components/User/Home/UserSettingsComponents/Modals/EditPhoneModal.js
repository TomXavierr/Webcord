import React, { useState } from 'react'
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


const EditPhoneModal = ({ isOpen, onCancel, value, onChange, onSave }) => {
    const [newPhoneNumber, setNewPhoneNumber] = useState(value);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const token = localStorage.getItem('access');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
    
            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/account/update/`,
                {
                    phone: newPhoneNumber,
                },
                config
            );
    
           
            console.log('Phone number updated successfully:', response.data);
            onSave(newPhoneNumber);
    
            onCancel();
        } catch (error) {
            console.error('Failed to update phone number:', error);
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
                        Edit Phone Number
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth margin="normal">
                            <FormLabel sx={LabelStyle}>
                                New Phone Number
                            </FormLabel>
                            <Input
                                name="newPhoneNumber"
                                type="text"
                                value={newPhoneNumber}
                                onChange={(e) => setNewPhoneNumber(e.target.value)}
                                sx={inputPropsStyle}
                            />
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
    )
}

export default EditPhoneModal
