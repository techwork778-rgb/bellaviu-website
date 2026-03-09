import React from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import { Sun, MapPin } from "lucide-react"; // Import Lucide Icons
import './HeadersectionOne.css'; // Import the external CSS file
import Image from "next/image";

const HeadersectionOne = () => {
  return (
    <Box className="header-section-container">
      <Grid container spacing={3}>
        <Grid item xs={12} md={1}></Grid>
        <Grid item xs={12} md={4}>
          <Box>
            <Image
              src="/about-us-home.webp"
              alt="Beach Paradise"
              className="header-image"
              width={500}
              height={500}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box px={3}>
            <Typography variant="h4" className="header-subtitle">
            About Deluxe Holiday Homes
            </Typography>
            <Typography variant="body1" className="header-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>
            {/* Icon Box 1 */}
            <Box className="icon-box">
              <Sun size={24} color="#E2B5B0" />
              <Typography  className="icon-text">
                Realistic Summer Vacation
              </Typography>
            </Box>
            {/* Icon Box 2 */}
            <Box className="icon-box">
              <MapPin size={24} color="#E2B5B0" />
              <Typography className="icon-text">
                Discover Our Amazing Location
              </Typography>
            </Box>
            <Button variant="contained" className="book-now-button">
              Book Now
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeadersectionOne;
