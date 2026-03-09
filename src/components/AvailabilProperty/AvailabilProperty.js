import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import HotelCard from "@/components/HotelCard/HotelCard"; // Assuming you have this component
import { Skeleton } from "@mui/material"; // Import the Skeleton component

const AvailabilProperty = () => {
  const [hotels, setHotels] = useState([]); // State to store fetched hotels
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch hotels data from JSON file or API
    const fetchHotels = async () => {
      try {
        const response = await fetch("/propertyData.json"); // Replace with actual path
        if (!response.ok) {
          throw new Error("Failed to fetch hotels");
        }
        const data = await response.json();
        setHotels(data); // Set the fetched data
      } catch (err) {
        setError(err.message); // Set error message if the fetch fails
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchHotels();
  }, []); // Empty dependency array to run the effect once when component mounts

  if (loading) {
    return (
      <Row className="g-4">
        {[1, 2, 3, 4].map((_, index) => (
          <Col key={index} sm={12} md={3} lg={3}>
            {/* Skeleton loader for hotel cards */}
            <Skeleton variant="rectangular" width="100%" height={250} />
          </Col>
        ))}
      </Row>
    );
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error if there was an issue fetching data
  }

  return (
    <Row className="g-4">
      {hotels.slice(0, 4).map((hotel) => (
        <Col key={hotel.id} sm={12} md={3} lg={3}>
          <HotelCard hotel={hotel} />
        </Col>
      ))}
    </Row>
  );
};

export default AvailabilProperty;
