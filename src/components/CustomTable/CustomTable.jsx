import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

const CustomTable = ({ tableplans }) => {
    return (
        <div>
            {tableplans.map((plan, index) => (
                <div key={index} style={{ marginBottom: "32px" }}>
                    <Typography
                        variant="h5"
                        sx={{ fontWeight: "bold", mb: 2 }}
                    >
                        {plan.title}
                    </Typography>

                    <TableContainer
                        component={Paper}
                        elevation={0}
                        sx={{
                            borderRadius: 2,
                            border: "1px solid #E2B5B0",
                            overflowX: "auto", // To allow horizontal scrolling on small screens
                        }}
                    >
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow>
                                    {plan.dates.map((day, idx) => (
                                        <TableCell
                                            key={idx}
                                            align="center"
                                            sx={{
                                                fontWeight: "bold",
                                                color: "#E2B5B0",
                                                fontSize: { xs: "0.875rem", sm: "1rem" }, // Make text smaller on mobile
                                            }}
                                        >
                                            {day}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    {plan.price.map((price, idx) => (
                                        <TableCell
                                            key={idx}
                                            align="center"
                                            sx={{
                                                color: "text.secondary",
                                                fontSize: { xs: "0.875rem", sm: "1rem" }, // Smaller text on mobile
                                            }}
                                        >
                                            ${price.toFixed(2)}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            ))}
        </div>
    );
};

export default CustomTable;
