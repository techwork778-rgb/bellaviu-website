"use client";

import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

// Amenities and Facilities arrays
const amenities = [
  "Free Wi-Fi",
  "Smart TV",
  "Microwave",
  "Toaster",
  "Stove / Oven",
  "Outdoor furniture",
  "Clothes drying rack",
  "Coffee Maker",
  "Bathtub",
  "Washing Machine",
  "Refrigerator",
  "Hair dryer",
  "Shampoo",
  "Bed linens",
  "Hangers",
];

const Features = ({ amenities }) => {
  return (
    <Box sx={{  borderRadius: "8px" }}>
      {/* Amenities Section */}
      <Typography
        variant="h5"
        sx={{
          marginBottom: "20px",
        //   fontWeight: "bold",
        //   textAlign: "center",
          color: "#4a4a4a",
        }}
      >
        Amenities
      </Typography>

      <Grid container spacing={3}>
        {amenities.map((amenity, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Box shadow for each grid item
                backgroundColor: "#fff", // Background color for boxes
              }}
            >
              {/* Icon */}
              <DoneIcon sx={{ color: "#9C6C69", fontSize: "18px" }} />

              {/* Text */}
              <Typography sx={{ fontSize: "14px", color: "#4a4a4a" }}>
                {amenity.name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Features;
