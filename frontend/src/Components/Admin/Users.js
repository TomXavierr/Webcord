import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import UserBlockButton from "./Buttons/UserBlockButton";

const UsersTable = () => {
    const adminUserList = useSelector(
        (state) => state.adminUserList.adminUserList
    );

    const handleUpdateUserBlockStatus = (userId, isBlocked) => {
        
      };
    
    if (!Array.isArray(adminUserList)) {
        return (
            <Box>
                <Typography>No user data available.</Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Typography color={"white"}>UsersTable</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell >Display Name</TableCell>
                            <TableCell >Email</TableCell>
                            <TableCell align="right">Block User</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {adminUserList.map((user) => (
                            <TableRow
                                key={user.id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {user.username}
                                </TableCell>
                                <TableCell align="left">
                                    {user.display_name}
                                </TableCell>
                                <TableCell >
                                    {user.email}
                                </TableCell>
                                <TableCell align="right">
                                    <UserBlockButton 
                                    userId={user.id}
                                    isBlocked={user.is_banned} // Pass the initial state based on is_banned
                                    onUpdate={handleUpdateUserBlockStatus}
                                    />
                                   
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default UsersTable;
