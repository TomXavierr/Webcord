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
// import { fetchAdminUserList } from "../../Redux/actions/adminUserListActions";

const UsersTable = () => {
    const adminUserList = useSelector((state) => state.adminUserList.adminUserList);
    // console.log(adminUserList.adminUserList);
    if (!Array.isArray(adminUserList)) {
      return (
          <Box>
              <Typography>No user data available.</Typography>
          </Box>
      );
  }

    return (
        <Box>
            <Typography>UsersTable</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Display Name</TableCell>
                            <TableCell align="right">Action</TableCell>
                            {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
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
                                <TableCell align="right">{user.email}</TableCell>
                                <TableCell align="right">{user.display_name}</TableCell>
                                <TableCell align="right"></TableCell>
                                {/* <TableCell align="right">{row.protein}</TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default UsersTable;
