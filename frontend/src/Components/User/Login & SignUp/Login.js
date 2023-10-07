import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Link,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { useNavigate } from "react-router-dom";
import { login } from "../../../Redux/actions/userauthaction";
import axios from "axios";

const Login = ({ login: loginUser, error, isAuthenticated }) => {
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
    const buttonStyle = {
        backgroundColor: "#44CFCB",
        marginBottom: "16px",
        marginTop: "16px",
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/channels");
        }
    }, [isAuthenticated, navigate]);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;
    const [localError, setLocalError] = useState(null);

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setLocalError({
                detail: "Please enter both email and password.",
            });
            return;
        }

        try {
            const response = await loginUser(email, password);

            if (response && response.data) {
                console.log(response.data);
                navigate("/channels");
            } 
        } catch (error) {
            console.error("API call failed:", error);

        if (error.response && error.response.data) {
            setLocalError({
                detail: error.response.data.detail || "An error occurred.",
            });
        } else if (error.message === "Network Error") {
            setLocalError({
                detail: "Unable to connect to the server. Please try again later.",
            });
        } else {
            setLocalError({
                detail: "An error occurred.",
            });
        }
        }
    };

    const ContinueWithGoogle = async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=http://localhost:3000`
            );
            window.location.replace(res.data.authorization_url);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundImage: "url(/background.png)",
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
                    Welcome Back!
                </Typography>
                <form onSubmit={(e) => onSubmit(e)}>
                    <FormControl fullWidth margin="normal">
                        <FormLabel sx={LabelStyle}>Email</FormLabel>
                        <Input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => onChange(e)}
                            sx={inputPropsStyle}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <FormLabel sx={LabelStyle}>Password</FormLabel>
                        <Input
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => onChange(e)}
                            sx={inputPropsStyle}
                        />
                        <Typography
                            style={{ fontSize: "12px", color: "#3685B5" }}
                            mt={1}
                        >
                            <Link href="#" underline="hover">
                                {" "}
                                Forgot your password?
                            </Link>
                        </Typography>
                    </FormControl>
                    <Button
                        type="submit"
                        variant="contained"
                        style={buttonStyle}
                        fullWidth
                    >
                        Login
                    </Button>
                </form>
                <Button
                    type="submit"
                    variant="contained"
                    onClick={ContinueWithGoogle}
                    style={{
                        backgroundColor: "#ffffff",
                        color: "#000000",
                        display: "flex",
                        alignItems: "center",
                    }}
                    fullWidth
                >
                    <img
                        src="/GoogleIcon.svg" // Make sure to provide the correct path
                        alt="Google Icon"
                        width="24px"
                        style={{ marginRight: "8px" }}
                    />
                    Continue with Google
                </Button>
                {(error || localError) && (
                    <Typography color="error" style={{ fontSize: "12px" }}>
                        {error ? error.detail : localError.detail}
                    </Typography>
                )}
                <Typography
                    style={{ fontSize: "12px", color: "#EBF2FA" }}
                    mt={1}
                >
                    Need an Account?
                    <Link href="/signup" underline="hover">
                        Register
                    </Link>
                </Typography>
            </Box>
        </div>
    );
};

const mapStateToProps = (state) => ({
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
