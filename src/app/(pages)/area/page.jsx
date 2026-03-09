"use client";
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography, 
} from "@mui/material";
import { Row, Col } from "react-bootstrap";
import { DummyHotelsArr} from "@/utility/utility";
import "./AreaDetails.css";
import HotelCard from "@/components/HotelCard/HotelCard";
import HotelList from "@/components/HotelList/HotelList";
import FilterArea from "@/components/FilterArea/FilterArea";
export default function Page() {
  return (
    <>
      <Box className="hero-section">
        <Container maxWidth="lg">
          <Typography variant="h3" className="hero-title">
            Effortless Vacation Stays with Dubai's Best Rentals
          </Typography>
          <Typography variant="h6" className="hero-description my-3">
            Affordable Luxury Vacation Apartments and Villas in Dubai
          </Typography>
        </Container>
      </Box>
      <FilterArea/>

      <section className="feature-room-section section">
        <Container>
          {/* <Row className="g-4"> */}
            {/* {DummyHotelsArr.map((hotel, index) => (
              <Col xs={12} lg={3} md={3} key={index}>
                <HotelCard key={hotel.id} hotel={hotel} />
              </Col>
            ))} */}
             <HotelList />
          {/* </Row> */}
        </Container>
      </section>

    </>

  );
}
