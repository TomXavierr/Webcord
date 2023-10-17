import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import Banner1 from "../../../src/assets/ImageSvgs/Banner1.svg";
import Banner2 from "../../../src/assets/ImageSvgs/Banner2.svg";
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div>
            <Box
                sx={{
                    backgroundImage: `url(${Banner1}), url(${Banner2})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "left bottom, right bottom", 
                    backgroundSize: "50% 60%, 50% 60%", 
                    position: "relative",
                    padding: "32px",
                    minHeight: "700px"
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 80,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Container>
                        <Typography
                            variant="h4"
                            marginBottom={3}
                            align="center"
                            color="#EBF2FA"
                            style={{
                                fontFamily: "Cascadia Code, monospace", // Use the correct font family
                                fontSize: "48px",
                            }}
                        >
                            Welcome to{" "}
                            <span style={{ color: "#44CFCB" }}>Webcord</span>
                        </Typography>
                        <Typography
                            color="#EBF2FA"
                            style={{
                                fontFamily: "Cascadia Code, monospace",
                                fontSize: "24px",
                                textAlign: "center", 
                            }}
                        >
                            Your Gateway to Creating Vibrant Communities
                            <br />
                            Connecting, and Collaborating!
                        </Typography>
                    </Container>

                    <Button
                        type="submit"
                        variant="contained"
                        style={{
                            backgroundColor: "#44CFCB",
                            borderRadius: "24px",
                            marginTop: "32px",
                        }}
                        sx={{ "&:hover": { backgroundColor: "#a0e3de" } }}
                    >
                        <Link
                            to="/login"
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            Login
                        </Link>
                    </Button>
                    
                </div>
            </Box>
        </div>
    );
};

export default Banner;
