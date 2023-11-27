import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const InviteModal = ({isOpen, onClose}) => {
    const friends = useSelector((state) => state.auth.user.friends);

    return (
        <Modal open={isOpen} onClose={onClose}>
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
                        Invite your friends to server
                    </Typography>

                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default InviteModal;
