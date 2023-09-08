import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Link,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { signup } from "../../../Redux/actions/userauthaction";

const Signup = ({ signup: createUser, signupError, isAccountCreated }) => {
    const inputPropsStyle = {
        color: "white",
        backgroundColor: "#000000",
        fontSize: "12px",
        paddingLeft : "12px"
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

    const [formData, setFormData] = useState({
        email: "",
        username: "",
        display_name: "",
        password: "",
    });

  
    // if (signupError) {
    //     console.log(signupError);
    // }

    const { email, username, display_name, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await createUser(email, username, display_name, password);
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
                    Create an account
                </Typography>
                <form onSubmit={(e) => onSubmit(e)}>
                    <FormControl fullWidth margin="normal">
                        <FormLabel sx={LabelStyle}>Email</FormLabel>
                        <Input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => onChange(e)}
                            required
                            sx={inputPropsStyle}
                        />
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

                        {/* {emailError && <FormHelperText>This field is required</FormHelperText>} */}
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <FormLabel sx={LabelStyle}>Display Name</FormLabel>
                        <Input
                            type="text"
                            name="display_name"
                            value={display_name}
                            onChange={(e) => onChange(e)}
                            required
                            sx={inputPropsStyle}
                        />
                        {/* {emailError && <FormHelperText>This field is required</FormHelperText>} */}
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <FormLabel sx={LabelStyle}>Username</FormLabel>
                        <Input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => onChange(e)}
                            required
                            sx={inputPropsStyle}
                        />
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
                            onChange={(e) => onChange(e)}
                            required
                            sx={inputPropsStyle}
                        />
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
                    <Button
                        type="submit"
                        variant="contained"
                        style={buttonStyle}
                        fullWidth
                    >
                        Continue
                    </Button>
                    {/* {signupError && (
                        <Typography color="error" style={{ fontSize: "12px" }}>
                            {signupError}
                        </Typography>
                    )} */}
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
