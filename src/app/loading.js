"use client";
import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function Loading() {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            bgcolor="#f5f5f5"
            textAlign="center"
        >
            <CircularProgress size={50} thickness={5} style={{ color: 'black' }} />
            <Typography variant="h6" style={{ marginTop: '20px', color: '#333' }}>
                Loading, please wait...
            </Typography>
        </Box>
    );
}