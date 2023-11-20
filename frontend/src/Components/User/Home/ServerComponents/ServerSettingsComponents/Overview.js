import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";

const Overview = ({data}) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "left",
                paddingLeft: "24px",
                width: "45vw",
                minWidth: "450px",
                backgroundColor: "#transparent",
            }}
        >
            <Typography
                style={{
                    fontFamily: "Noto Sans,sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#EBF2FA",
                    letterSpacing: ".5px",
                }}
            >
                Server Overview
            </Typography>
            <Box
                sx={{
                    display:"flex",
                    backgroundColor: "#031D25",
                    marginTop: "12px",
                    position: "relative",
                }}
            >
                <Box sx={{
                    width: "50%"
                }}>
                    <Avatar src={data.icon}/>
                </Box>
                <Box sx={{
                    width: "50%"
                }}>
                    <Typography
                        style={{
                            fontFamily: "Noto Sans,sans-serif",
                            fontSize: "16px",
                            fontWeight: 600,
                            color: "#EBF2FA",
                            letterSpacing: ".5px",
                            marginBottom: "12px",
                        }}
                    >
                        Password and Authentication
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Overview;
