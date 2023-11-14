import {
    Box,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import { activate } from "../../../Redux/actions/userauthaction";
import { useNavigate, useParams } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";

const Activate = ({ activate, match }) => {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false)
    const { uid, token } = useParams();
   
    const activate_account = async (e) => {
        try{
            setLoading(true)
            await activate(uid, token);
            navigate("/login")
        } finally {
            setLoading(false)
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
                    Activate you account!
                </Typography>
                
                    
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        onClick={activate_account}
                        loading={loading}
                        style={{
                            backgroundColor: "#44CFCB",
                            marginBottom: "16px",
                            marginTop: "16px",
                        }}
                        sx={{ "&:hover": { backgroundColor: "#a0e3de" } }}
                        fullWidth
                    >
                        Activate
                    </LoadingButton>
                    
                
            </Box>
        </div>
    );
};



export default connect(null, { activate })(Activate);
