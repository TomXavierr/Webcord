import {
    Box,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Link,
    Typography,
} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useState } from "react";
import { connect } from "react-redux";

import { signup } from "../../../Redux/actions/userauthaction";

const inputPropsStyle = {
    color: "white",
    backgroundColor: "#000000",
    fontSize: "12px",
    paddingLeft: "12px",
};
const LabelStyle = {
    fontFamily: "Sofia Sans, sans-serif",
    fontWeight: "bold",
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


const Signup = ({ signup: createUser, signupError, isAccountCreated }) => {
    
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        display_name: "",
        password: "",
    });
    
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const { email, username, display_name, password } = formData;

    const validateEmail = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    const validateUsername = (username) => {
        const usernameRegex = /^[a-zA-Z0-9]+$/;
        return usernameRegex.test(username);
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        const newErrors = { ...errors };

        switch (name) {
            case "email":
                newErrors.email = validateEmail(value)
                    ? ""
                    : "Invalid email address";
                break;
            case "username":
                newErrors.username = validateUsername(value)
                    ? ""
                    : "Username must contain only letters and numbers";
                break;
            case "password":
                newErrors.password = validatePassword(value)
                    ? ""
                    : "Password must be at least 8 characters long";
                break;
            default:
                break;
        }

        setErrors(newErrors);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(errors).every((key) => errors[key] === "")) {
            setLoading(true);

            try{

                await createUser(
                    formData.email,
                    formData.username,
                    formData.display_name,
                    formData.password
                );
            }finally {
                setLoading(false); 
            }
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
                        fontFamily: "Cascadia Code, monospace", 
                        fontSize: "24px",
                    }}
                >
                    Create an account
                </Typography>
                <form onSubmit={(e) => onSubmit(e)}>
                    <FormControl fullWidth margin="normal">
                        <FormLabel sx={LabelStyle}>Email</FormLabel>
                        <Input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                            sx={inputPropsStyle}
                        />
                        {errors.email && (
                            <FormHelperText
                                style={{ fontSize: "12px", color: "#FF160c" }}
                            >
                                {errors.email}
                            </FormHelperText>
                        )}
                        {signupError &&
                            signupError.email &&
                            signupError.email.length > 0 && (
                                <FormHelperText
                                    style={{
                                        fontSize: "12px",
                                        color: "#FF160c",
                                    }}
                                >
                                    {signupError.email[0]}
                                </FormHelperText>
                            )}
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <FormLabel sx={LabelStyle}>Display Name</FormLabel>
                        <Input
                            type="text"
                            name="display_name"
                            value={display_name}
                            onChange={handleInputChange}
                            sx={inputPropsStyle}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <FormLabel sx={LabelStyle}>Username</FormLabel>
                        <Input
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleInputChange}
                            sx={inputPropsStyle}
                        />
                        {errors.username && (
                            <FormHelperText
                                style={{ fontSize: "12px", color: "#FF160c" }}
                            >
                                {errors.username}
                            </FormHelperText>
                        )}
                        {signupError &&
                            signupError.username &&
                            signupError.username.length > 0 && (
                                <FormHelperText
                                    style={{
                                        fontSize: "12px",
                                        color: "#FF160c",
                                    }}
                                >
                                    {signupError.username[0]}
                                </FormHelperText>
                            )}
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <FormLabel sx={LabelStyle}>Password</FormLabel>
                        <Input
                            name="password"
                            type="password"
                            value={password}
                            onChange={handleInputChange}
                            sx={inputPropsStyle}
                        />
                        {errors.password && (
                            <FormHelperText
                                style={{ fontSize: "12px", color: "#FF160c" }}
                            >
                                {errors.password}
                            </FormHelperText>
                        )}
                        {signupError &&
                            signupError.password &&
                            signupError.password.length > 0 && (
                                <FormHelperText
                                    style={{
                                        fontSize: "12px",
                                        color: "#FF160c",
                                    }}
                                >
                                    {signupError.password[0]}
                                </FormHelperText>
                            )}
                        {/* {passwordError && <FormHelperText>This field is required</FormHelperText>} */}
                    </FormControl>
                    <LoadingButton 
                        type="submit"
                        variant="contained"
                        style={buttonStyle}
                        fullWidth
                        loading={loading}
                    >
                        Continue
                    </LoadingButton>
                
                    {isAccountCreated ? (
                        <Typography
                            style={{ fontSize: "12px", color: "#00FF00" }}
                        >
                            Account created successfully. Check your email for
                            activation instructions.
                        </Typography>
                    ) : null}

                    <Typography
                        style={{ fontSize: "12px", color: "#EBF2FA" }}
                        mt={1}
                    >
                        <Link href="/login" sx={{ textDecoration: "none" }}>
                            Already have an Account?
                        </Link>
                    </Typography>
                </form>
            </Box>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        signupError: state.auth.signupError,
        isAccountCreated: state.auth.isAccountCreated,
    };
};

export default connect(mapStateToProps, { signup })(Signup);
