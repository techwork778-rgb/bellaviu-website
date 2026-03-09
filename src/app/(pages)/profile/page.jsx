"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Tabs,
  Tab,
  Button,
  Modal,
} from "react-bootstrap";
import { useAuth } from "@/context/AuthContext";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import "./profileCss.css";
import toast, { Toaster } from "react-hot-toast";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
const page = () => {
  const { authUser, user } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [CancelBookings, setCancelBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [errorFetchingBookings, setErrorFetchingBookings] = useState(null);
  const [propertyDetails, setPropertyDetails] = useState({});
  const [activeTab, setActiveTab] = useState("upcoming");
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    // Normalize user data
    const normalizedUser =
      user ||
      (authUser && {
        uid: authUser.userId,
        displayName:
          authUser.displayName || `${authUser.firstName} ${authUser.lastName}`,
        email: authUser.email,
      });

    if (!normalizedUser) {
      // Redirect to login if no user is authenticated
      window.location.href = "/";
    } else {
      // Set user details
      setUserDetails({
        name: normalizedUser.displayName,
        email: normalizedUser.email,
        id: normalizedUser.uid,
      });

      // Fetch bookings for the user
      fetchUserBookings(normalizedUser.uid);
      fetchUserCancelBookings(normalizedUser.uid);
    }
  }, [authUser, user]);

  // const fetchPropertyDetails = async (propertyId) => {
  //   const myHeaders = new Headers();
  //   myHeaders.append(
  //     "Authorization",
  //     "Bearer Bellaviu@mralfred.com:p8hrz1a9b6c4d2e7f5g0h3j2k9l8m4n7kl4t9u0vy6n"
  //   );

  //   try {
  //     const response = await fetch(
  //       `https://api.mralfred.io/api/external/properties/${propertyId}`,
  //       {
  //         method: "GET",
  //         headers: myHeaders,
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(`Failed to fetch property data for ID: ${propertyId}`);
  //     }

  //     const data = await response.json();
  //     console.log(data, "Property Data");

  //     // Store the fetched property details
  //     setPropertyDetails((prevDetails) => ({
  //       ...prevDetails,
  //       [propertyId]: data?.data || {},
  //     }));
  //   } catch (error) {
  //     console.error(
  //       `Error fetching property data for ID ${propertyId}:`,
  //       error
  //     );
  //   }
  // };
  const fetchPropertyDetails = async (propertyId) => {
    try {
      // Fetch the property details from the local JSON file
      const response = await fetch("/propertyDataDetails.json");
  
      if (!response.ok) {
        throw new Error("Failed to fetch property details from local file.");
      }
  
      const propertyDetails = await response.json();
    
  
      // Find the property by ID
      const property = propertyDetails.find((property) => property.id === Number(propertyId));
      
  
      if (!property) {
        throw new Error(`Property with ID: ${propertyId} not found.`);
      }
  
      // Store the fetched property details in the state
      setPropertyDetails((prevDetails) => ({
        ...prevDetails,
        [propertyId]: property,
      }));
  
    } catch (error) {
      console.error(`Error fetching property data for ID ${propertyId}:`, error);
    }
  };
  
  
  useEffect(() => {
    // Combine bookings and cancelled bookings in one array
    const allBookings = [...bookings, ...CancelBookings];

    allBookings.forEach((booking) => {
      if (!propertyDetails[booking.property_id]) {
        fetchPropertyDetails(booking.property_id);
      }
    });
  }, [bookings, CancelBookings]);
  const fetchUserBookings = async (userId) => {
    try {
      const response = await fetch(`/api/user-bookings?userId=${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      setErrorFetchingBookings(error.message);
      console.error("Error fetching bookings:", error);
    } finally {
      setLoadingBookings(false);
    }
  };
  const fetchUserCancelBookings = async (userId) => {
    try {
      const response = await fetch(
        `/api/user-cancel-bookings?userId=${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cancel bookings");
      }
      const data = await response.json();
      setCancelBookings(data);
    } catch (error) {
      setErrorFetchingBookings(error.message);
      console.error("Error fetching cancel bookings:", error);
    } finally {
      setLoadingBookings(false);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear(); // Extract year
    const month = date.getMonth() + 1; // Get month (1-indexed)
    const day = date.getDate(); // Get day
    return `${day < 10 ? "0" + day : day}-${
      month < 10 ? "0" + month : month
    }-${year}`;
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);

    // Use toLocaleTimeString for AM/PM formatting
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleShowModal = (orderId) => {
    setSelectedOrderId(orderId);
    setShowModal(true);
  };

  // Function to hide the confirmation modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrderId(null);
  };

  // Function to handle the actual cancel booking logic using fetch
  const handleCancelBooking = async () => {
    setLoading(true); 
    try {
      // Send the order_ids in the correct format
      const response = await fetch("/api/cancel-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderIds: [selectedOrderId] }), // Sending order_id as an array
      });

      if (response.ok) {
        // Handle success (e.g., show a success message, update state, etc.)
        toast.success("Booking canceled successfully");
        setShowModal(false); // Close the modal after successful cancellation
        
        const normalizedUser =
          user ||
          (authUser && {
            uid: authUser.userId,
            displayName:
              authUser.displayName ||
              `${authUser.firstName} ${authUser.lastName}`,
            email: authUser.email,
          });

        if (normalizedUser) {
          fetchUserBookings(normalizedUser.uid); // Re-fetch the bookings using the user's UID
          fetchUserCancelBookings(normalizedUser.uid); // Re
        }
      } else {
        // Handle failure (e.g., show an error message)
        const errorData = await response.json();
        toast.error(`Error: ${errorData.error}`);
      }
    } catch (error) {
      // Handle any error that occurs during the API call
      console.error("Error canceling booking:", error);
      toast.error("Error canceling booking");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Breadcrumb title="Profile" image={"/blogs.jpeg"} />
      <Container className="mt-4">
        <Row>
          {/* Profile Information */}
          <Col md={4}>
            <Card className="mb-4 shadow-sm border-light profile-card">
              <Card.Body>
                <h4 className="mb-3">Profile Information</h4>
                {userDetails ? (
                  <>
                    <p>
                      <strong>Name:</strong> {userDetails.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {userDetails.email}
                    </p>
                    <p>
                      <strong>User ID:</strong> {userDetails.id}
                    </p>
                  </>
                ) : (
                  <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Booking Details */}
          <Col md={8}>
            <Card className="shadow-sm border-light">
              <Card.Body>
                <h4 className="mb-3">Your Bookings</h4>
                {loadingBookings ? (
                  <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                  </div>
                ) : errorFetchingBookings ? (
                  <Alert variant="danger">{errorFetchingBookings}</Alert>
                ) : (
                  <Tabs
                    activeKey={activeTab}
                    onSelect={(key) => setActiveTab(key)}
                    id="booking-tabs"
                    className="mb-3"
                  >

                    <Tab eventKey="upcoming" title="Bookings">
                      {bookings
                        .filter(
                          (booking) => new Date(booking.check_out) >= new Date()
                        )
                        .map((booking) => {
                          const userTimeZone = dayjs.tz.guess(); // Get user's timezone
                          const checkInDateTime = dayjs(booking.check_in)
                            .tz(userTimeZone)
                            .hour(14)
                            .minute(0)
                            .second(0); // Set to 2:00 PM in user's timezone

                          const currentDateTime = dayjs().tz(userTimeZone); // Get current time in user's timezone

                          return (
                            <Card
                              key={booking.property_id}
                              className="mb-3 shadow-sm"
                            >
                              <Card.Body className="d-flex">
                                <Row className="w-100">
                                  <Col md={6} className="property-details">
                                    <h5 className="card-title text-secondary">
                                      {booking.property_name}
                                    </h5>
                                    <p>
                                      <strong>Property ID:</strong>{" "}
                                      {booking.property_id}
                                    </p>
                                    <p>
                                      <strong>Order ID:</strong>{" "}
                                      {booking.order_id}
                                    </p>
                                    <p>
                                      <strong>Check-In:</strong>{" "}
                                      {formatDate(booking.check_in)}
                                    </p>
                                    <p>
                                      <strong>Check-Out:</strong>{" "}
                                      {formatDate(booking.check_out)}
                                    </p>
                                    <p>
                                      <strong>Guest Count:</strong>{" "}
                                      {booking.guest_count}
                                    </p>
                                    <p>
                                      <strong>Price:</strong> AED{" "}
                                      {booking.price}
                                    </p>
                                  </Col>

                                  <Col md={6}>
                                    <img
                                      src={
                                        propertyDetails[booking.property_id]
                                          ?.imageUrl ||
                                        "/footerimages.jpg"
                                      }
                                      alt={booking.property_name}
                                      className="property-img"
                                      style={{
                                        width: "100%",
                                        height: "auto",
                                        borderRadius: "5px",
                                        objectFit: "cover",
                                      }}
                                    />
                                    {propertyDetails[booking.property_id] && (
                                      <>
                                        <p>
                                          <strong>Check-In Time:</strong>{" "}
                                          {formatTime(
                                            propertyDetails[booking.property_id]
                                              .checkin_time_from
                                          )}{" "}
                                          -{" "}
                                          {formatTime(
                                            propertyDetails[booking.property_id]
                                              .checkin_time_to
                                          )}
                                        </p>
                                        <p>
                                          <strong>Check-Out Time:</strong>{" "}
                                          {formatTime(
                                            propertyDetails[booking.property_id]
                                              .checkout_until
                                          )}
                                        </p>
                                      </>
                                    )}
                                    {new Date() < checkInDateTime && (
                                      <Button
                                        variant="danger"
                                        onClick={() =>
                                          handleShowModal(booking.order_id)
                                        }
                                      >
                                        Cancel Booking
                                      </Button>
                                    )}
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          );
                        })}
                      {bookings.filter(
                        (booking) => new Date(booking.check_out) >= new Date()
                      ).length === 0 && (
                        <Alert variant="info">
                          No upcoming bookings found.
                        </Alert>
                      )}
                    </Tab>

                    {/* History Bookings Tab */}
                    <Tab eventKey="history" title="History Bookings">
                      {bookings.filter(
                        (booking) => new Date(booking.check_out) < new Date()
                      ).length === 0 ? (
                        <Alert variant="info">No history bookings found.</Alert>
                      ) : (
                        bookings
                          .filter(
                            (booking) =>
                              new Date(booking.check_out) < new Date()
                          )
                          .map((booking) => (
                            <Card
                              key={booking.property_id}
                              className="mb-3 shadow-sm"
                            >
                              <Card.Body className="d-flex">
                                <Row className="w-100">
                                  <Col md={6} className="property-details">
                                    <h5 className="card-title text-secondary">
                                      {booking.property_name}
                                    </h5>
                                    <p>
                                      <strong>Property ID:</strong>{" "}
                                      {booking.property_id}
                                    </p>
                                    <p>
                                      <strong>Order ID:</strong>{" "}
                                      {booking.order_id}
                                    </p>
                                    <p>
                                      <strong>Check-In:</strong>{" "}
                                      {formatDate(booking.check_in)}
                                    </p>
                                    <p>
                                      <strong>Check-Out:</strong>{" "}
                                      {formatDate(booking.check_out)}
                                    </p>
                                    <p>
                                      <strong>Guest Count:</strong>{" "}
                                      {booking.guest_count}
                                    </p>
                                    <p>
                                      <strong>Price:</strong> AED{booking.price}
                                    </p>
                                  </Col>

                                  <Col md={6}>
                                    <img
                                      src={
                                        propertyDetails[booking.property_id]
                                          ?.imageUrl||
                                        "/footerimages.jpg"
                                      }
                                      alt={booking.property_name}
                                      className="property-img"
                                      style={{
                                        width: "100%",
                                        height: "auto",
                                        borderRadius: "5px",
                                        objectFit: "cover",
                                      }}
                                    />
                                    {propertyDetails[booking.property_id] && (
                                      <>
                                        <p>
                                          <strong>Check-In Time:</strong>{" "}
                                          {formatTime(
                                            propertyDetails[booking.property_id]
                                              .checkin_time_from
                                          )}{" "}
                                          -{" "}
                                          {formatTime(
                                            propertyDetails[booking.property_id]
                                              .checkin_time_to
                                          )}
                                        </p>
                                        <p>
                                          <strong>Check-Out Time:</strong>{" "}
                                          {formatTime(
                                            propertyDetails[booking.property_id]
                                              .checkout_until
                                          )}
                                        </p>
                                      </>
                                    )}
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          ))
                      )}
                    </Tab>
                    {/* Cancelled Bookings Tab */}
                    <Tab eventKey="cancelled" title="Cancelled Bookings">
                      {CancelBookings.length === 0 ? (
                        <Alert variant="info">
                          No cancelled bookings found.
                        </Alert>
                      ) : (
                        CancelBookings.map((booking) => (
                          <Card
                            key={booking.property_id}
                            className="mb-3 shadow-sm"
                          >
                            <Card.Body className="d-flex">
                              <Row className="w-100">
                                <Col md={6} className="property-details">
                                  <h5 className="card-title text-secondary">
                                    {booking.property_name}
                                  </h5>
                                  <p>
                                    <strong>Property ID:</strong>{" "}
                                    {booking.property_id}
                                  </p>
                                  <p>
                                    <strong>Order ID:</strong>{" "}
                                    {booking.order_id}
                                  </p>
                                  <p>
                                    <strong>Check-In:</strong>{" "}
                                    {formatDate(booking.check_in)}
                                  </p>
                                  <p>
                                    <strong>Check-Out:</strong>{" "}
                                    {formatDate(booking.check_out)}
                                  </p>
                                  <p>
                                    <strong>Guest Count:</strong>{" "}
                                    {booking.guest_count}
                                  </p>
                                  <p>
                                    <strong>Price:</strong> AED{booking.price}
                                  </p>
                                </Col>

                                <Col md={6}>
                                  {/* Property Image */}
                                  <img
                                    src={
                                      propertyDetails[booking.property_id]
                                        ?.imageUrl ||
                                      "/footerimages.jpg" // Use a more descriptive fallback image
                                    }
                                    alt={booking.property_name}
                                    className="property-img"
                                    style={{
                                      width: "100%",
                                      height: "auto",
                                      borderRadius: "5px",
                                      objectFit: "cover",
                                    }}
                                  />

                                  {/* Check-In/Check-Out Times */}
                                  {propertyDetails[booking.property_id] ? (
                                    <>
                                      <p>
                                        <strong>Check-In Time:</strong>{" "}
                                        {formatTime(
                                          propertyDetails[booking.property_id]
                                            .checkin_time_from
                                        )}{" "}
                                        -{" "}
                                        {formatTime(
                                          propertyDetails[booking.property_id]
                                            .checkin_time_to
                                        )}
                                      </p>
                                      <p>
                                        <strong>Check-Out Time:</strong>{" "}
                                        {formatTime(
                                          propertyDetails[booking.property_id]
                                            .checkout_until
                                        )}
                                      </p>
                                    </>
                                  ) : (
                                    <p>Loading property details...</p> // Show a loading message until property details are available
                                  )}
                                </Col>
                              </Row>
                            </Card.Body>
                          </Card>
                        ))
                      )}
                    </Tab>
                  </Tabs>
                ) }
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Cancellation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to cancel this booking? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="danger" onClick={handleCancelBooking}>
          {loading ? <Spinner as="span" animation="border" size="sm" /> : "Confirm Cancellation"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default page;
