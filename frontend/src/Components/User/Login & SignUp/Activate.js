import {
    Box,
    Button,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import { activate } from "../../../Redux/actions/userauthaction";
import { useNavigate, useParams } from "react-router-dom";

const Activate = ({ activate, match }) => {

    
    const navigate = useNavigate();

    const { uid, token } = useParams();
    console.log(uid);
    console.log(token);
    const [verified, setVerified] = useState(false)
   
    const activate_account = async (e) => {
       
        await activate(uid, token);
        setVerified(true);
        navigate("/login");
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
                
                    
                    <Button
                        type="submit"
                        variant="contained"
                        onClick={activate_account}

                        style={{
                            backgroundColor: "#44CFCB",
                            marginBottom: "16px",
                            marginTop: "16px",
                        }}
                        sx={{ "&:hover": { backgroundColor: "#a0e3de" } }}
                        fullWidth
                    >
                        Activate
                    </Button>
                    
                
            </Box>
        </div>
    );
};



export default connect(null, { activate })(Activate);
