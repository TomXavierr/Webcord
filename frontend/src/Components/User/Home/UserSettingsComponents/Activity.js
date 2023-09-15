import { Box, Typography } from "@mui/material";
import React from "react";

const Activity = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "left",
                paddingLeft: "24px",
                minWidth: "400px",
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
                Acivity
            </Typography>
        </Box>
    );
};

export default Activity;
