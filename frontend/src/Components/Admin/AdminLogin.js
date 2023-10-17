import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Link,
    Typography,
} from "@mui/material";
import { connect } from "react-redux";
import { adminLogin } from "../../Redux/actions/adminAuthAction";
import { selectAdminLoginError } from "../../Redux/selectors/adminAuthSelector";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ adminLogin, adminLoginError, isAuthenticated, isAdmin }) => {
    const inputPropsStyle = {
        color: "white", 
        backgroundColor: "#000000",
        borderRadius: "0px",
        fontSize: "12px",
        marginTop: "0",
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

    const navigate = useNavigate();
    

    useEffect(() => {
        if (isAuthenticated && isAdmin) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, isAdmin, navigate]);


    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const {email, password} = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        await adminLogin(email, password);
        navigate("/dashboard");
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
                        fontFamily: "Cascadia Code, monospace", 
                        fontSize: "24px",
                    }}
                >
                    Admin Login
                </Typography>
                <form onSubmit={onSubmit}>
                    <FormControl fullWidth margin="normal">
                        <FormLabel sx={LabelStyle}>Email</FormLabel>
                        <Input
                            type="email"
                            sx={inputPropsStyle}
                            name="email"
                            value={email}
                            onChange={(e) => onChange(e)}
                        />
                        
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <FormLabel sx={LabelStyle}>Password</FormLabel>
                        <Input
                            sx={inputPropsStyle}
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => onChange(e)}
                        />
                       
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
                    {adminLoginError  && (
                        <Typography color="error" style={{ fontSize: "12px" }}>
                            {adminLoginError.detail}
                        </Typography>
                    )}    
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

const mapStateToProps = (state) => ({
    adminLoginError: selectAdminLoginError(state), 
    isAuthenticated: state.adminAuth.isAuthenticated,
    isAdmin: state.adminAuth.isAdmin,
});

export default connect(mapStateToProps, { adminLogin })(AdminLogin);
