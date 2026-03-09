"use client";
import React from "react";
import Breadcrumbs from "../../../components/Breadcrumb/Breadcrumb";
import { Col, Container, Row, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Box from "@mui/material/Box";
import "./manage-account.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const HotelCard = ({ image, name, description, checkIn, checkOut,totalGuest, price, isCancelled }) => {
    return (
      <Card className={`hotel-card mb-3 ${isCancelled ? "cancelled-booking" : ""}`}>
        {isCancelled && <div className="cancelled-overlay">Cancelled</div>}
        <div className="hotel-card-wrapper">
          <Card.Img variant="left" src={image} className="hotel-card-image" />
          <Card.Body>
            <Card.Title className="hotel-card-title">{name}</Card.Title>
            <Card.Text className="hotel-card-description">{description}</Card.Text>
            <div className="hotel-card-details">
              <div>
                <strong>Check-in:</strong> {checkIn}
              </div>
              <div>
                <strong>Check-out:</strong> {checkOut}
              </div>
              <div>
                <strong>Total Guest:</strong> {totalGuest}
              </div>
            </div>
            {!isCancelled && (
              <div className="hotel-card-footer d-flex justify-content-between">
                <div className="hotel-card-price">
                  <strong>Price:</strong> ${price}/night
                </div>
                <div className="hotel-card-actions">
                  <Button variant="danger" className="me-2">
                    Cancel Booking
                  </Button>
                  <Button variant="secondary">View Details</Button>
                </div>
              </div>
            )}
          </Card.Body>
        </div>
      </Card>
    );
  };
  

const NoHotelBooked = () => (
  <div className="no-hotel-booked text-center">
    <img
      src="/images/no-booking.svg"
      alt="No Booking"
      className="no-booking-image mb-3"
    />
    <h3>No Bookings Found</h3>
    <p className="text-muted">It seems you have no bookings in this category. Start exploring hotels now!</p>
    <Button variant="outline-primary" size="lg">
      Find Hotels
    </Button>
  </div>
);

const Page = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const activeBookings = [
    {
      image: "/hotels/hotel-img1.webp",
      name: "Luxury Beach Resort",
      description: "Experience the luxury of a beachfront property with world-class amenities.",
      checkIn: "2024-12-15",
      checkOut: "2024-12-20",
      totalGuest: 4,
      price: 250,
    },
    {
      image: "/hotels/hotel-img2.webp",
      name: "Mountain View Hotel",
      description: "Relax in the heart of the mountains with breathtaking views and comfort.",
      checkIn: "2024-12-18",
      checkOut: "2024-12-22",
      totalGuest: 4,
      price: 180,
    },
  ];

  const cancelledBookings = [
    {
      image: "/hotels/hotel-img1.webp",
      name: "Ocean Breeze Hotel",
      description: "Unwind at this relaxing oceanside retreat with panoramic views.",
      checkIn: "2024-11-10",
      checkOut: "2024-11-15",
      totalGuest: 4,
      price: 220,
      isCancelled: true,
    },
  ];

  const upcomingBookings = [
    {
      image: "/hotels/hotel-img3.webp",
      name: "City Center Hotel",
      description: "Stay in the heart of the city with all modern amenities and attractions nearby.",
      checkIn: "2025-01-10",
      checkOut: "2025-01-15",
      totalGuest: 4,
      price: 200,
    },
  ];

  const completedBookings = [];

  return (
    <>
      <Breadcrumbs title="Manage Account" image={"/BusinessBay.jpg"}   />
      <Container className="py-5">
        <Row>
          <Col md={3} lg={3} sm={12}>
            <ButtonGroup vertical className="w-100">
              <Button
                className={value === 0 ? "manage-account-tab active" : "manage-account-tab"}
                onClick={() => handleChange(0)}
                id="tab-0"
                aria-controls="tabpanel-0"
              >
                Active Bookings
              </Button>
              <Button
                className={value === 1 ? "manage-account-tab active" : "manage-account-tab"}
                onClick={() => handleChange(1)}
                id="tab-1"
                aria-controls="tabpanel-1"
              >
                Cancelled Bookings
              </Button>
              <Button
                className={value === 2 ? "manage-account-tab active" : "manage-account-tab"}
                onClick={() => handleChange(2)}
                id="tab-2"
                aria-controls="tabpanel-2"
              >
                Upcoming Bookings
              </Button>
              <Button
                className={value === 3 ? "manage-account-tab active" : "manage-account-tab"}
                onClick={() => handleChange(3)}
                id="tab-3"
                aria-controls="tabpanel-3"
              >
                Completed Bookings
              </Button>
            </ButtonGroup>
          </Col>
          <Col md={9} lg={9} sm={12}>
            <TabPanel value={value} index={0}>
              {activeBookings.length > 0 ? (
                activeBookings.map((booking, index) => (
                  <HotelCard key={index} {...booking} />
                ))
              ) : (
                <NoHotelBooked />
              )}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {cancelledBookings.length > 0 ? (
                cancelledBookings.map((booking, index) => (
                  <HotelCard key={index} {...booking} isCancelled />
                ))
              ) : (
                <NoHotelBooked />
              )}
            </TabPanel>
            <TabPanel value={value} index={2}>
              {upcomingBookings.length > 0 ? (
                upcomingBookings.map((booking, index) => (
                  <HotelCard key={index} {...booking} />
                ))
              ) : (
                <NoHotelBooked />
              )}
            </TabPanel>
            <TabPanel value={value} index={3}>
              {completedBookings.length > 0 ? (
                completedBookings.map((booking, index) => (
                  <HotelCard key={index} {...booking} />
                ))
              ) : (
                <NoHotelBooked />
              )}
            </TabPanel>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Page;
