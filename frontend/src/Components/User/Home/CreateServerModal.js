import {
    Avatar,
    Badge,
    Box,
    Button,
    DialogActions,
    FormControl,
    FormLabel,
    IconButton,
    Input,
    Modal,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthenticated, load_user } from "../../../Redux/actions/userauthaction";
import axios from "axios";

const inputPropsStyle = {
    color: "white",
    backgroundColor: "#000000",
    fontSize: "12px",
    borderRadius: "3px",
    paddingLeft: "5px",
    height: "32px",
};

const LabelStyle = {
    fontFamily: "Sofia Sans, sans-serif ",
    fontWeight: 600,
    letterSpacing: "1.5px",
    fontSize: "12px",
    color: "#020F12",
    "&.Mui-focused": {
        color: "#020F12",
    },
};

const CreateServerModal = ({ isOpen, onCancel }) => {
    const [serverName, setServerName] = useState("");
    const [iconFile, setIconFile] = useState(null);
    const userId = useSelector((state) => state.auth.user.id);
    const dispatch = useDispatch();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setIconFile(file);
    };

    const handleClose = () => {
        setServerName("");
        setIconFile(null);
        onCancel();
    };


    const handleCreateServer = async () => {
        try {
            const accessToken = localStorage.getItem("access");

            const formData = new FormData();
            formData.append("name", serverName);
            formData.append("owner", userId); // Add owner field
            if (iconFile) {
                formData.append("icon", iconFile);
            }

            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/server/servers/create/`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            dispatch(load_user());
            

            handleClose();
        } catch (error) {
            console.error("Error creating server:", error.message);
        }
    };

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
                <Box width="400px" p={4} bgcolor="white" borderRadius={2}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mb={2}
                    >
                        <Typography
                            sx={{
                                fontFamily: "Sofia Sans, sans-serif ",
                                fontWeight: 600,
                                letterSpacing: "1.5px",
                                fontSize: "16px",
                                color: "#020F12",
                            }}
                            mb={2}
                        >
                            Create a New Server
                        </Typography>
                        <Typography
                            sx={{
                                // fontFamily: "Sofia Sans, sans-serif ",
                                fontWeight: 400,
                                letterSpacing: "1.5px",
                                fontSize: "10px",
                                color: "#020F12",
                            }}
                            mb={2}
                        >
                            Give your new server a personality with a name and
                            an icon. You can alway change it later.
                        </Typography>

                        <label htmlFor="icon-input">
                            <input
                                type="file"
                                id="icon-input"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />
                            <IconButton
                                onClick={() =>
                                    document
                                        .getElementById("icon-input")
                                        .click()
                                }
                            >
                                <Tooltip title={"Add server Icon"}>
                                    <Badge
                                        sx={{ color: "white" }}
                                        badgeContent={iconFile ? "" : "+"}
                                    >
                                        <Avatar
                                            alt="Add Icon"
                                            src={
                                                iconFile
                                                    ? URL.createObjectURL(
                                                          iconFile
                                                      )
                                                    : null
                                            }
                                            sx={{ width: 72, height: 72 }}
                                        >
                                            {iconFile ? null : (
                                                <AddPhotoAlternateIcon />
                                            )}
                                        </Avatar>
                                    </Badge>
                                </Tooltip>
                            </IconButton>
                        </label>
                        <FormControl fullWidth margin="normal">
                            <FormLabel sx={LabelStyle}>Server Name</FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter server name"
                                value={serverName}
                                onChange={(e) => setServerName(e.target.value)}
                                sx={inputPropsStyle}
                            />
                        </FormControl>
                    </Box>
                    <DialogActions
                        display="flex"
                        justifyContent="space-between"
                        width="100%"
                        marginTop="12px"
                    >
                        <Button onClick={onCancel} color="primary">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleCreateServer}
                            sx={{
                                color: "white",
                                backgroundColor: "#44CFCB",
                                "&:hover": {
                                    backgroundColor: "#44CFCB",
                                },
                            }}
                        >
                            Create
                        </Button>
                    </DialogActions>
                </Box>
            </Box>
        </Modal>
    );
};

export default CreateServerModal;
