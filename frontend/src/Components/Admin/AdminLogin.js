import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    // InputLabel,
    Link,
    // Stack,
    // TextField,
    Typography,
} from "@mui/material";
import React from "react";

const AdminLogin = () => {
    const inputPropsStyle = {
        color: "white", // Set the text color to white
        backgroundColor: "#000000",
        borderRadius: "0px",
        fontSize: "12px",
        marginTop: "0",
    };
    const LabelStyle = {
        fontFamily: "Sofia Sans, sans-serif", // Replace with your font family
        fontWeight: "bold",
        fontSize: "12px",
        color: "#EBF2FA",
        "&.Mui-focused": {
            color: "#EBF2FA", // Set the same color for focused label
        },
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundImage: "url(/adminloginbg.jpg)",
            }}
        >
            <Box width="400px" height="auto" p={4} bgcolor="#122C34">
                <Typography
                    variant="h4"
                    marginBottom={3}
                    align="center"
                    color="#EBF2FA"
                    style={{
                        fontFamily: "Cascadia Code, monospace", // Use the correct font family
                        fontSize: "24px",
                    }}
                >
                    Admin Login
                </Typography>
                <form>
                    <FormControl fullWidth margin="normal">
                        <FormLabel sx={LabelStyle}>Email</FormLabel>
                        <Input
                            type="email"
                            sx={inputPropsStyle}

                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                        />
                        {/* {emailError && <FormHelperText>This field is required</FormHelperText>} */}
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <FormLabel sx={LabelStyle}>Password</FormLabel>
                        <Input
                            sx={inputPropsStyle}
                            type="password"
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                        />
                        {/* {passwordError && <FormHelperText>This field is required</FormHelperText>} */}
                        <Typography
                            style={{ fontSize: "12px", color: "#3685B5" }}
                            mt={1}
                        >
                            <Link href="#"> Forgot your password?</Link>
                        </Typography>
                    </FormControl>
                    <Button
                        type="submit"
                        variant="contained"
                        style={{
                            backgroundColor: "#44CFCB",
                            marginBottom: "16px",
                            marginTop: "16px",
                        }}
                        sx={{ "&:hover": { backgroundColor: "#a0e3de" } }}
                        fullWidth
                    >
                        Login
                    </Button>
                    <Typography
                        style={{ fontSize: "12px", color: "#EBF2FA" }}
                        mt={1}
                    >
                        Not an Admin?
                        <Link href="/login" sx={{ textDecoration: "none" }}>
                            Login
                        </Link>
                    </Typography>
                </form>
            </Box>
        </div>
    );
};

export default AdminLogin;
