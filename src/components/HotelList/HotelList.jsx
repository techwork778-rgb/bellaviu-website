// HotelList.js
import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import HotelCard from "@/components/HotelCard/HotelCard"; // Assuming you have this component

const HotelList = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    // Fetch data from JSON file (or API endpoint)
    const fetchHotels = async () => {
      try {
        const response = await fetch('/propertyData.json'); // replace with your JSON path
        const data = await response.json();
        setHotels(data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };
    fetchHotels();
  }, []);

  return (
    <Row className="g-4">
      {hotels.map((hotel, index) => (
        <Col xs={12} lg={3} md={3} key={index}>
          <HotelCard hotel={hotel} />
        </Col>
      ))}
    </Row>
  );
};

export default HotelList;
