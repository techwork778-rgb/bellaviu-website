"use client";
import React, { useState, useEffect } from "react";
import "./style.css";
import {
  Box,
  Divider,
  Grid,
  Pagination,
  Stack,
  Typography,
  Alert,
  Skeleton,
} from "@mui/material";
import HotelCard from "@/components/HotelCard/HotelCard";
import { Col, Container, Row } from "react-bootstrap";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import FilterArea from "@/components/FilterAreaCopy/FilterArea";

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [hotelsPerPage] = useState(6); // Number of hotels per page
  const [hotels, setHotels] = useState([]); // All hotels fetched
  const [filteredHotels, setFilteredHotels] = useState([]); // Hotels after filtering
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFallbackAlert, setShowFallbackAlert] = useState(false);
  // Fetch hotels on component mount
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch("/propertyData.json"); // Fetch from the public folder
        if (!response.ok) {
          throw new Error("Failed to fetch hotels");
        }
        const data = await response.json();
        setHotels(data);
        setFilteredHotels(data); // Initially show all hotels
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  // Filter apply handler
  const handleFilterApply = (filters) => {
    // console.log("Applied Filters:", filters);
    // console.log(hotels,"h")
    const filtered = hotels.filter((hotel) => {
      // Filter by city if provided

      if (filters.bedrooms) {
        const requestedValue = filters.bedrooms.value.toLowerCase();

        const requestedBedrooms = requestedValue.includes("studio")
          ? 0
          : parseInt(requestedValue.match(/\d+/)?.[0] || "0", 10);

        const hotelType = hotel.propertyType.toLowerCase();
        const propertyBedrooms = hotelType.includes("studio")
          ? 0
          : parseInt(hotelType.match(/\d+/)?.[0] || "0", 10);

        if (requestedBedrooms !== propertyBedrooms) return false;
      }

      if (filters.guests) {
        const requestedGuests = parseInt(
          filters.guests.value.match(/\d+/)?.[0] || "0",
          10
        );
        const maxGuests = parseInt(
          hotel.maxOccupancy.match(/\d+/)?.[0] || "0",
          10
        );
        if (requestedGuests !== maxGuests) return false;
      }

      // Filter by price range if provided
      // Fix this part
      if (filters.price_range) {
        const [minPrice, maxPrice] = filters.price_range;
        const price = Number(hotel.price);
        if (price < minPrice || price > maxPrice) {
          return false;
        }
      }

      // Add more filters here as needed

      return true;
    });
    if (filtered.length === 0) {
      setShowFallbackAlert(true); // show alert
      setFilteredHotels(hotels); // fallback to all
    } else {
      setShowFallbackAlert(false); // hide alert
      setFilteredHotels(filtered);
    }

    setCurrentPage(1);
        window.scrollTo({ top: 0, behavior: 'smooth' }); //
    // setFilteredHotels(filtered);
    // setCurrentPage(1); // Reset to first page when filter changes
  };

  // Error state
  if (error) return <div>Error: {error}</div>;

  // Pagination calculations based on filtered hotels
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = filteredHotels.slice(
    indexOfFirstHotel,
    indexOfLastHotel
  );
  const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Breadcrumb title="Apartments" image={"/bluewaters.jpg"} />
      <Container className="hotel-container" maxWidth="xl">
        {showFallbackAlert && (
          <Alert severity="info" sx={{ mb: 2 }}>
            No matching hotels found. Showing all available properties.
          </Alert>
        )}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              className="filter-box"
              sx={{
                position: "sticky",
                top: "25%",
                bottom: "auto",
                marginBottom: "30px",
              }}
            >
              <FilterArea onApply={handleFilterApply} />
              <Divider sx={{ marginBottom: 2 }} />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={9}>
            <div className="results-header">
              <Typography variant="subtitle1" className="mb-3">
                Showing {currentHotels.length} results
              </Typography>

              <Stack
                spacing={2}
                alignItems="center"
                className="pagination mb-3"
              >
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  showFirstButton
                  showLastButton
                />
              </Stack>
            </div>

            {/* Skeleton Loader for Cards */}
            <Row>
              {loading
                ? Array(hotelsPerPage)
                    .fill(null)
                    .map((_, index) => (
                      <Col xs={12} lg={4} md={4} key={index} className="mb-4">
                        <Skeleton
                          variant="rectangular"
                          height={300}
                          sx={{ borderRadius: 2 }}
                        />
                      </Col>
                    ))
                : currentHotels.map((hotel, index) => (
                    <Col xs={12} lg={4} md={4} key={index} className="mb-4">
                      <HotelCard hotel={hotel} />
                    </Col>
                  ))}
            </Row>

            {/* No Hotels Found Message */}
            {/* {currentHotels.length === 0 && !loading && (
              <Box className="no-hotels-message">
                <div>
                  <Typography variant="h5" className="no-hotels-title">
                    No Hotels Found
                  </Typography>
                  <Typography variant="body1" className="no-hotels-text">
                    Unfortunately, there are no hotels available. Please try again later.
                  </Typography>
                </div>
              </Box>
            )} */}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Page;
