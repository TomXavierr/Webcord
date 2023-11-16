import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        backgroundColor: "#073B4C",
        color: "white",
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const MembersList = ({ members }) => {
    return (
        <Box
            sx={{
                paddingLeft: "20px",
                paddingTop: "10px",
            }}
            p
        >
            <Typography
                style={{
                    fontFamily: "Noto Sans, sans-serif",
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "white",
                }}
            >
                All Members
            </Typography>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>NAME</StyledTableCell>
                            <StyledTableCell align="left">
                                MEMBER SINCE
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                ROLES
                            </StyledTableCell>
                            <StyledTableCell align="right">
    
                            </StyledTableCell>
                            <StyledTableCell align="right">
                    
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {members.map((member) => (
                            <StyledTableRow key={member.user.id}>
                                <StyledTableCell component="th" scope="row">
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                marginRight: "10px",
                                            }}
                                            alt={member.user.display_name}
                                            src={`${member.user.avatar}`}
                                        ></Avatar>
                                        {member.user.display_name}
                                    </Box>
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    {member.join_date}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Box sx={{ display: "flex" }}>
                                        <Box
                                            sx={{
                                                backgroundColor: "#0A4C5C",
                                                borderRadius: "4px",
                                                paddingX: "4px",
                                                paddingY: "2px",
                                                color: "white",
                                                display: "flex",
                                                alignItems: "center",
                                                marginRight: "4px",
                                            }}
                                        >
                                            {member.roles[0]}
                                        </Box>
                                        {member.roles.length > 1 && (
                                            <span
                                                title={`+${
                                                    member.roles.length - 1
                                                } more roles`}
                                            >
                                                <Box
                                                    sx={{
                                                        backgroundColor:
                                                            "#0A4C5C",
                                                        borderRadius: "4px",
                                                        padding: "4px",
                                                        color: "white",
                                                    }}
                                                >
                                                    +{member.roles.length - 1}
                                                </Box>
                                            </span>
                                        )}
                                    </Box>
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {/* {member.user.display_name} */}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {/* {member.user.display_name} */}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default MembersList;
