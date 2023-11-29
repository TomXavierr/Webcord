import {
    Avatar,
    Box,
    Button,
    Card,
    CardActionArea,
    CardMedia,
    Typography,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { load_user } from "../../../../../Redux/actions/userauthaction";

const Invites = () => {
    const [serverInvites, setServerInvites] = useState([]);
    const userId = useSelector((state) => state.auth.user.id);
    const joinedServers = useSelector((state) =>
        state.auth.user.servers.map(server => server.id),
        (prev, next) => prev.join() === next.join()
    );
    
    const dispatch = useDispatch();

    const getServerInvites = async () => {
        try {
            const token = localStorage.getItem("access");
            console.log("joined server" + joinedServers);
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/server/invitations/received/`,
                config
            );

            if (response.status === 200 && response.data.count > 0) {
                setServerInvites(response.data.results);
            } else {
                console.log("No Invites to show");
            }
        } catch (error) {
            console.error("Error while fetching server invites", error);
        }
    };

    const handleJoinServer = async (invitationToken) => {
        try {
            const token = localStorage.getItem("access");
            console.log(token)
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };


            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/server/accept-invitation/${invitationToken}/`,
                {},
                config
            );

            if (response.status === 200) {
                console.log(response)
                toast(response.data.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                });
                dispatch(load_user());
                console.log("Joined server");
            } else {
                console.error("Failed to get invites");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getServerInvites();
    }, [userId]);

    useEffect(() => {
        console.log(serverInvites);
    }, [serverInvites]);

    return (
        <Box
            sx={{
                paddingLeft: "20px",
                paddingTop: "10px",
            }}
            p
        >
            <Typography
                style={{
                    fontFamily: "Noto Sans, sans-serif",
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "white",
                }}
            >
                All Invites
            </Typography>
            {serverInvites.map((invite) => (
                <Card
                    key={invite.id}
                    sx={{
                        maxWidth: 300,
                        display: "flex",
                        justifyContent: "space-between",
                        backgroundColor: "#0A4C5C",
                        color: "white",
                        padding: "8px",
                        marginBottom: "12px",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#EBF2FA",
                                fontFamily: "Noto Sans, sans-serif",
                                fontSize: "12px",
                            }}
                            component="div"
                        >
                            {invite.sender.display_name} invited you to join a
                            server.
                        </Typography>
                        <Typography
                            component="div"
                            sx={{
                                fontFamily: "Noto Sans, sans-serif",
                                fontSize: "14px",
                                fontWeight: "bold",
                                color: "white",
                            }}
                        >
                            {invite.server.name}
                        </Typography>
                        <Button
                            onClick={() => handleJoinServer(invite.token)}
                            sx={{
                                backgroundColor: joinedServers.includes(invite.server.id)
                                    ? "#2e3633"
                                    : "#32965d" ,
                                borderRadius: "4px",
                                height: "24px",
                                fontSize: "14px",
                                textTransform: "none",
                                marginTop: "10px",
                                marginRight: "10px",
                                "&:hover": {
                                    backgroundColor: "#1e604e",
                                },
                            }}
                            disabled={joinedServers.includes(invite.server.id)}
                        >
                            <Typography
                                style={{
                                    fontSize: "12px",
                                    color: "white"
                                }}
                            >
                                {joinedServers.includes(invite.server.id)
                                ? "Already Joined"
                                : "Join server"}
                            </Typography>
                        </Button>
                    </Box>
                    <Avatar
                        src={invite.server.icon}
                        sx={{
                            height: "72px",
                            width: "72px",
                        }}
                    />
                </Card>
            ))}
        </Box>
    );
};

export default Invites;
