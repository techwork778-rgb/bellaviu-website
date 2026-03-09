import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Box,
  Skeleton,
  Tabs,
  Tab,
  Divider,
  useMediaQuery,
  useTheme
} from "@mui/material";
import HotelCard from "../HotelCard/HotelCard";
import "./ServicesCard.css";
import { DummyHotelsArr } from "@/utility/utility"; // Import FilterDummyHotelsArr

const categories = ["All", "1 Bedroom", "2 Bedroom", "Studio", "Villa"];

const ServicesCard = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('/propertyData.json'); // Fetch from the public folder
        if (!response.ok) {
          throw new Error('Failed to fetch hotels');
        }
        const data = await response.json();
        setHotels(data); // Set the fetched data
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);
  if (loading) {
    return (
      <Box>
        <Skeleton
          variant="text"
          height={60}
          sx={{ mb: 2, width: "50%", mx: "auto" }}
        />
        <Skeleton
          variant="text"
          height={40}
          sx={{ mb: 4, width: "70%", mx: "auto" }}
        />
        <Grid container spacing={3}>
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Skeleton
                  variant="rectangular"
                  height={200}
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    );
  }

  if (error) return <div>Error: {error}</div>;

  const filteredHotels = hotels.filter((hotel) => {
    const propertyType = hotel?.propertyType?.toLowerCase();

    return (
      selectedCategory === "All" ||
      propertyType === selectedCategory.toLowerCase()
    );
  });

  return (
    <div>
      <Typography
        variant="h2"
        sx={{
          fontSize: "40px",
          fontWeight: "700",
          color: "#bd9088",
          textShadow: "1px 1px #00000054",
          mb: 2,
          textAlign: "center",
        }}
      >
        Holiday Home Rental Apartments & Villas in Dubai
      </Typography>

      <Typography
        variant="h6"
        sx={{ justifyContent: "center", display: "flex" }}
      >
        Browse Apartments & Villas
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          paddingTop: "50px"
        }}
      >
        {isMobile ? (
          <Box
            sx={{
              maxWidth: "500px",
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 1,
              px: 2,
            }}
          >
            {categories.map((category, index) => (
              <Box
                key={category}
                onClick={() => setSelectedCategory(category)}
                sx={{
                  py: 1,
                  textAlign: "center",
                  borderBottom: `${selectedCategory === category ? '2px' : '1.5px'} solid`,
                  borderColor: selectedCategory === category ? "#bd9088" : "#e0e0e0",
                  color: selectedCategory === category ? "#bd9088" : "inherit",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  ...(index === categories.length - 1 && categories.length % 2 !== 0 && {
                    gridColumn: "1 / -1",
                    width: "50%",  // Make it take half the width
                    margin: "0 auto"  // Center it in the row
                  })
                }}
              >
                {category}
              </Box>
            ))}
          </Box>
        ) : (
          <>
            <Tabs
              value={selectedCategory}
              onChange={(event, newValue) => setSelectedCategory(newValue)}
              variant={isMobile ? "scrollable" : "standard"}
              scrollButtons={isMobile ? "auto" : false}
              className="bv-tabs-root"
              sx={{
                minHeight: "unset",
                padding: "6px",
                background: "#f5f2ee", // Luxury soft beige
                borderRadius: "50px",
                width: "fit-content",
                margin: "0 auto",
                "& .MuiTabs-indicator": {
                  display: "none", // Remove default underline
                },
                "& .MuiTabs-flexContainer": {
                  gap: "8px",
                },
              }}
            >
              {categories.map((category) => (
                <Tab
                  key={category}
                  label={category}
                  value={category}
                  className={`bv-tabs-item ${selectedCategory === category ? 'bv-tabs-active' : ''}`}
                  sx={{
                    textTransform: "none",
                    fontSize: "15px",
                    fontWeight: "600",
                    minHeight: "unset",
                    minWidth: { xs: "90px", md: "120px" },
                    padding: "10px 24px",
                    borderRadius: "50px",
                    color: "#666",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    fontFamily: "'Urbanist', sans-serif",
                    "&.Mui-selected": {
                      color: "#fff !important",
                      backgroundColor: "#bd9088", // Luxury Gold/Tan
                      boxShadow: "0 4px 15px rgba(189, 144, 136, 0.4)",
                    },
                    "&:hover": {
                      color: selectedCategory === category ? "#fff" : "#bd9088",
                      backgroundColor: selectedCategory === category ? "#bd9088" : "rgba(189, 144, 136, 0.05)",
                    },
                  }}
                />
              ))}
            </Tabs>
            <Box
              sx={{
                width: "100%",
                maxWidth: "500px",
                borderBottom: "1.5px solid #bd9088",
                position: "relative",
                top: "-3px",
                mx: "auto"
              }}
            />
          </>
        )}
      </Box>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        {filteredHotels.length > 0 ? (
          filteredHotels.slice(0, 4).map((hotel) => (
            <Grid item xs={12} sm={6} md={3} key={hotel.id}>
              <HotelCard hotel={hotel} />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ margin: "20px" }}>
            No properties available in this category.
          </Typography>
        )}
      </Grid>
    </div>
  );
};

export default ServicesCard;