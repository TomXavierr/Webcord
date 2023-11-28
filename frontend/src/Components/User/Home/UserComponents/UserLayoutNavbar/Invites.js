import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Invites = () => {
    const [serverInvites, setServerInvites] = useState([]);
    const userId = useSelector((state) => state.auth.user.id)

    const getServerInvites = async () => {
        try{
            const token = localStorage.getItem("access");
            const config = {
                headers: {
                    Authorization : `Bearer ${token}`,
                },
            };

            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/server/invitations/received/`,
                config
            );

            if (response.status === 200 && response.data.count > 0) {
                setServerInvites(response.data.results);
            } else {
                console.error("Failed to get invites");
            }
        } catch (error) {
            console.error("Error while fetching server invites", error);
        }
    }

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

            
                    
        </Box>
    );
};

export default Invites;
