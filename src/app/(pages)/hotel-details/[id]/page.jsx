"use client";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Popover,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import PersonIcon from "@mui/icons-material/Person"; //
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Container, Row, Col, Card } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import CloseIcon from "@mui/icons-material/Close";
import "./style.css";
import { Images } from "lucide-react";
import Image from "next/image";
import { FilterDummyHotelsArr } from "@/utility/utility";
import HotelCard from "@/components/HotelCard/HotelCard";
import { ExpandMore } from "@mui/icons-material";
import { Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal/AuthModal";
import { useRouter } from "next/navigation";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Default theme
import CryptoJS from "crypto-js";
import { useMediaQuery } from "@mui/material";
import AvailabilProperty from "@/components/AvailabilProperty/AvailabilProperty";
const encryptionKey = "BellaViu@12345";
const page = () => {
  // --------------working-------------
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { id } = useParams();
  const { authUser, user } = useAuth() || {};
  const [isModalOpen, setModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [bookedDates, setBookedDates] = useState([]); // Store raw booked dates
  const [anchorDate, setAnchorDate] = useState(null);
  const [images, setImages] = useState([]);
  const [disabledDates, setDisabledDates] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [priceDetails, setPriceDetails] = useState({
    basePrice: 0,
    numberOfNights: 0,
    vat: 0,
    tourismFee: 0, // Static value as per your table
    total: 0,
    cleaningFee: 0,
  });

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        // Assuming the hotels.json is placed in the public folder
        const response = await fetch("/propertyDataDetails.json"); // Path to the local JSON file

        if (!response.ok) {
          throw new Error("Failed to load hotel data");
        }

        const data = await response.json();
        console.log(data, "datatat");
        // Find the hotel by id
        const foundHotel = data.find(
          (hotel) => String(hotel.id) === String(id)
        );

        if (!foundHotel) {
          throw new Error("Hotel not found");
        }

        setHotels(foundHotel);
        if (foundHotel.images && Array.isArray(foundHotel.images)) {
          setImages(foundHotel.images);
        } else {
          throw new Error("Images not found for this hotel");
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);
  const propertyId = Number(hotels.mralfred_id); // or get this dynamically
  // console.log(propertyId);
  useEffect(() => {
    const fetchAllDates = async () => {
      try {
        const [resDb, resApi] = await Promise.all([
          fetch(`/api/get-book-dates?property_id=${id}`),
          fetch(`/api/booking-mralfred?property_id=${propertyId}`),
        ]);

        const [dbDataRaw, apiDataRaw] = await Promise.all([
          resDb.json(),
          resApi.json(),
        ]);

        const dbData = Array.isArray(dbDataRaw) ? dbDataRaw : [];
        const apiData = Array.isArray(apiDataRaw.data) ? apiDataRaw.data : [];
        const extractDates = (arr, source) =>
          arr
            .map((entry) => {
              const checkin = new Date(
                source === "api" ? entry.checkin : entry.checkin_date
              );
              const checkout = new Date(
                source === "api" ? entry.checkout : entry.checkout_date
              );

              const dates = [];
              const current = new Date(checkin);
              while (current <= checkout) {
                dates.push(current.toISOString().split("T")[0]);
                current.setDate(current.getDate() + 1);
              }
              return dates;
            })
            .flat();

        const allDates = [
          ...extractDates(dbData, "db"),
          ...extractDates(apiData, "api"),
        ];
        const uniqueDates = [...new Set(allDates)];
        console.log(uniqueDates);
        setDisabledDates(uniqueDates);

        const todayStr = new Date().toISOString().split("T")[0];
        if (uniqueDates.includes(todayStr)) {
          let nextAvailable = new Date();
          while (
            uniqueDates.includes(nextAvailable.toISOString().split("T")[0])
          ) {
            nextAvailable.setDate(nextAvailable.getDate() + 1);
          }

          setDateRange({
            startDate: nextAvailable,
            endDate: nextAvailable,
            key: "selection",
          });
        }
      } catch (error) {
        console.error("Error fetching or processing dates:", error);
      }
    };

    fetchAllDates();
  }, [propertyId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `/api/booking-mralfred?property_id=${propertyId}`
        );
        const data = await res.json();
        console.log(data, "ddd");
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [propertyId]);
  const currentDate = new Date();
  const handleOpenDate = (event) => {
    setAnchorDate(event.currentTarget);
  };

  const handleCloseDate = () => {
    setAnchorDate(null);
  };

  const open = Boolean(anchorDate);

  const [guestCount, setGuestCount] = useState(1); // Default guest count

  const handleGuestChange = (event) => {
    setGuestCount(event.target.value);
  };

  const [guests, setGuests] = useState("");

  const handleChange = (event) => {
    setGuests(event.target.value);
  };
  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    if (authUser || user) {
      const dataToEncrypt = {
        guest_count: guestCount,
        price: priceDetails.total, //priceDetails.total
        date_range: formatDateRange(),
        id,
      };

      // Encrypt the data
      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(dataToEncrypt),
        encryptionKey
      ).toString();

      try {
        // Redirect to the Confirm-booking page
        await router.push(
          `/confirm-booking?data=${encodeURIComponent(encryptedData)}`
        );
      } catch (error) {
        console.error("Error in router.push:", error);
      }
    } else {
      // If the user is not authenticated, show the modal
      setModalOpen(true);
    }

    setSubmitting(false);
  };

  const isDateDisabled = (date) => {
    return disabledDates.some(
      (disabledDate) =>
        new Date(disabledDate).toDateString() === date.toDateString()
    );
  };

  const areDatesInRangeDisabled = (startDate, endDate) => {
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      if (isDateDisabled(currentDate)) {
        return true; // If any date in the range is disabled
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return false; // All dates in the range are available
  };
  const handleModalClose = () => {
    setModalOpen(false); // Close the modal
  };
  const amenities = [
    {
      icon: "/hotel-service/Icon.svg",
      label: "High-speed Wifi",
    },
    {
      icon: "/hotel-service/Non-smoking-room.svg",
      label: "Non-smoking room",
    },
    {
      icon: "/hotel-service/On-site-parking.svg",
      label: "On-site parking",
    },
    {
      icon: "/hotel-service/Superb-Breakfast.svg",
      label: "Superb Breakfast",
    },
    {
      icon: "/hotel-service/Iconout.svg",
      label: "Outdoor swimming pool",
    },
    {
      icon: "/hotel-service/Fitness-center.svg",
      label: "Fitness center",
    },
    {
      icon: "/hotel-service/Housekeeping-service.svg",
      label: "Housekeeping service",
    },
    {
      icon: "/hotel-service/Restaurant.svg",
      label: "Restaurant",
    },
  ];

  const room = [
    {
      icon: "/hotel-service/Beachfront.svg",
      label: "Beachfront",
    },
    {
      icon: "/hotel-service/Balcony.svg",
      label: "Balcony",
    },
    {
      icon: "/hotel-service/Air-Conditioner.svg",
      label: "Air Conditioner",
    },
    {
      icon: "/hotel-service/King-Bedroom.svg",
      label: "King Bedroom",
    },
    {
      icon: "/hotel-service/Safe-Box.svg",
      label: "Safe Box",
    },
    {
      icon: "/hotel-service/Minibar.svg",
      label: "Minibar",
    },
    {
      icon: "/hotel-service/40-Flat-Screen-HD-TV.svg",
      label: '40" Flat Screen HD TV',
    },
    {
      icon: "/hotel-service/Phones.svg",
      label: "Phones",
    },
    {
      icon: "/hotel-service/Cablesatellite.svg",
      label: "Cable/satellite",
    },
    {
      icon: "/hotel-service/Refrigerator.svg",
      label: "In-room Refrigerator",
    },
    {
      icon: "/hotel-service/USB.svg",
      label: "USB Outlets",
    },
    {
      icon: "/hotel-service/Complimentary.svg",
      label: "Complimentary",
    },
  ];

  const getAmenityIcon = (amenity) => {
    const mapping = {
      "Air Conditioner": "Air-Conditioner.svg",
      TV: "40-Flat-Screen-HD-TV.svg",
      Refrigerator: "Refrigerator.svg",
      "Dining table": "Dining-table.svg",
      Kitchenware: "Kitchenware.svg",
      Kitchen: "Kitchen.svg",
      Microwave: "Microwave.svg",
      "Washing Machine": "Washing-Machine.svg",
      Towels: "Towels.svg",
    };

    return mapping[amenity] || "default-icon.svg";
  };

  const [openGallery, setOpenGallery] = useState(false);
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleOptionSelect = (count) => {
    setGuestCount(count);
    setIsOpen(false);
  };

  const ServiceList = [
    { label: "High-speed Wifi", icon: "" },
    { label: "High-speed Wifi", icon: "" },
  ];
  const formatDateRange = () => {
    const { startDate, endDate } = dateRange;
    return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
  };

  const handleAvailabilityClick = (event) => {
    // Check if the dates are not selected
    if (!isDateSelected) {
      event.preventDefault();
      toast.error(
        "Please select both arrival and departure dates in the calendar."
      );
      return;
    }

    // Check if the selected start date and end date are the same
    if (
      dateRange.startDate &&
      dateRange.endDate &&
      dateRange.startDate.getTime() === dateRange.endDate.getTime()
    ) {
      event.preventDefault();
      toast.error("Check-out date cannot be the same as check-in date.");
      return;
    }
  };

  const calculatePrice = (arrivalDate, departureDate) => {
    const basePrice = hotels?.price || 1;
    const cleaningFee = hotels?.cleaningFee || 200;
    const tourism_fee = hotels?.tourismFee;

    if (arrivalDate && departureDate) {
      const nights = Math.ceil(
        (new Date(departureDate) - new Date(arrivalDate)) /
        (1000 * 60 * 60 * 24)
      );
      if (nights < 1) {
        toast.error("Check-out date must be after the check-in date.");
        setShowTable(false); // Hide the price table if the dates are invalid
        return;
      }
      const subtotal = basePrice * nights;
      const tourismFee = tourism_fee * nights;
      const vatCal = subtotal + cleaningFee;
      const vat = (vatCal * 5) / 100; // 5% VAT
      const total = subtotal + cleaningFee + vat + tourismFee;

      setPriceDetails({
        basePrice,
        numberOfNights: nights,
        total,
        vat,
        tourismFee,
        cleaningFee,
      });
      setShowTable(true);
      handleCloseDate();
    } else {
      setShowTable(false);
    }
  };

  return (
    <>
      <AuthModal
        open={isModalOpen}
        handleClose={handleModalClose} // Close the modal when clicked
      />
      <Breadcrumb title="Apartment Details" image={"/BusinessBay.jpg"} />
      <Box className="py-5" sx={{ marginTop: "2rem" }}>
        <Toaster />
        <Container>
          <Row className="gy-3">
            <Col md={8} lg={8} sm={12}>
              <Image
                src={images[0]}
                alt="Hotel main"
                className="w-100"
                loading="lazy"
                style={{
                  borderRadius: "10px",
                  // height: "100%",
                  maxHeight: "650px",
                  objectFit: "cover",
                }}
                width={800} // Set a specific width (e.g., 800px)
                height={533} // Set a specific height (e.g., 533px, maintaining aspect ratio)
              />
            </Col>

            <Col md={4} lg={4} sm={12}>
              <div className="d-flex flex-column gap-3 position-relative">
                <Image
                  src={images[1]}
                  alt="Hotel detail 1"
                  className="w-100"
                  loading="lazy"
                  style={{
                    borderRadius: "10px",
                    maxHeight: "calc(325px - 0.75rem)",
                    objectFit: "cover",
                  }}
                  width={400} // Set a specific width (e.g., 400px)
                  height={267} // Set a specific height (e.g., 267px, maintaining aspect ratio)
                />
                <div style={{ position: "relative" }}>
                  <Image
                    src={images[2]}
                    alt="Hotel detail 2"
                    className="w-100"
                    loading="lazy"
                    style={{
                      borderRadius: "10px",
                      // height: "calc(40% - 0.75rem)",
                      maxHeight: "calc(325px - 0.75rem)", // Adjusted for spacing
                      objectFit: "cover",
                    }}
                    width={400} // Set a specific width (e.g., 400px)
                    height={267} // Set a specific height (e.g., 267px, maintaining aspect ratio)
                  />
                  {/* Gallery Button Overlay */}
                  <Button
                    variant="contained"
                    className="open-gallery-btn"
                    onClick={() => setOpenGallery(true)}
                    startIcon={<Images size={18} />}
                  >
                    Gallery
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
          <Row
            className="gy-3"
            style={{ paddingTop: "30px", position: "relative" }}
          >
            <Col md={8} lg={8} sm={12}>
              <Card className="hotels-details">


                <Card.Body>
                  <h4 className="details-title">
                    {hotels?.name || "The Heid"}
                  </h4>
                  <p className="details-desc">
                    {hotels?.description || "The Heid"}
                  </p>
                  <hr className="details-divider" />

                  <h4 className="details-title">Services & Amenities:</h4>
                  <div className="row g-3 mb-3">
                    {hotels?.amenities?.map((amenity, index) => (
                      <div key={index} className="col-12 col-sm-6">
                        <div className="d-flex align-items-center gap-2 text-muted rounded">
                          <div className="flex-shrink-0">
                            <img
                              src={`/hotel-service/${getAmenityIcon(amenity)}`}
                              alt=""
                              width="20"
                              height="20"
                              onError={(e) => {
                                e.target.style.display = "none"; // hide broken image
                                e.target.parentNode.innerHTML += `
              <div style="
                width: 12px;
                height: 12px;
                background-color: #00bfa5;
                transform: rotate(45deg);
                margin-left: 4px;
              "></div>`;
                              }}
                              className="text-primary"
                            />
                          </div>
                          <span className="fs-6">{amenity}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Other sections like booking policies, pricing, etc. */}
                </Card.Body>

              </Card>
              <Card className="hotels-details my-4">
                <Card.Body>
                  <h4 className="details-title-booking">Booking Policies</h4>
                  <div className="container my-5">
                    <div className="row">
                      <div className="col">
                        <h2 className="details-title-booking">
                          Check-In, Check-Out
                        </h2>
                        {/* <p className="details-desc">Check-in is at 4:00. Checkout is at 11:00 am</p> */}
                        <p className="details-desc">
                          Check-in is at 3:00 pm. Checkout is at 11:00 am
                          <br />
                          You may request early check-in and/or late check-out
                          after booking. Our team will do our best to
                          accommodate any requests based on availability.
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <h2 className="details-title-booking">Accessibility</h2>
                        <ul>
                          <li className="details-desc">
                            Wheelchair access available
                          </li>
                          <li className="details-desc">Elevators available</li>
                        </ul>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <h2 className="details-title-booking">House Rules</h2>
                        <ul>
                          <li className="details-desc">
                            No smoking (not even on balconies/patios)
                          </li>
                          <li className="details-desc">
                            No pets (not even really cute ones) unless otherwise
                            stated
                          </li>
                          <li className="details-desc">
                            No parties (not even really quiet ones)
                          </li>
                        </ul>
                        <p>
                          * Please be respectful of your neighbors and keep
                          noise to a minimum from 10:00 pm – 8:00 am.
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <h2 className="details-title-booking">Please Note</h2>
                        <ul>
                          <li className="details-desc">There's no cable.</li>
                          <li className="details-desc">
                            The bedroom and living space for some Sonders are
                            separated by opaque curtain panels instead of a
                            solid wall.
                          </li>
                          <li className="details-desc">
                            Due to the central location, noise may be present.
                          </li>
                          <li className="details-desc">
                            Intra-stay cleanings are available during weekdays
                            for an additional charge.
                          </li>
                        </ul>
                        <p>1 hour · Admission Ticket Free</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <h2 className="details-title">Flexible Cancellation</h2>
                        <p className="details-desc">
                          We offer flexible cancellations for all bookings.
                          Select the Flex Rate to cancel your booking up to Up
                          to 5 days before check-in.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
              <Card className="hotels-details my-4">
                <Card.Body>
                  <h4 className="details-title-booking">
                    Frequently Asked Questions
                  </h4>
                  <Accordion className="faq-accordion">
                    <AccordionSummary
                      expandIcon={<ExpandMore className="arrow-icon" />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      className="accordion-summary"
                    >
                      <p className="faq-accordion-title">
                        Will I be able to update my subscription details another
                        time?
                      </p>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="details-desc">
                        You will be able to update your subscription details at
                        a later time.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion className="faq-accordion">
                    <AccordionSummary
                      expandIcon={<ExpandMore className="arrow-icon" />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                      className="accordion-summary"
                    >
                      <p className="faq-accordion-title">
                        How many Tours are available on TravelWP?
                      </p>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="details-desc">
                        There are a variety of tours available on TravelWP. You
                        can browse the selection and find the ones that best
                        suit your interests.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion className="faq-accordion">
                    <AccordionSummary
                      expandIcon={<ExpandMore className="arrow-icon" />}
                      aria-controls="panel3a-content"
                      id="panel3a-header"
                      className="accordion-summary"
                    >
                      <p className="faq-accordion-title">
                        What are the most popular Tours?
                      </p>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="details-desc">
                        The most popular tours on TravelWP tend to be the ones
                        that offer unique experiences and explore popular
                        destinations.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion className="faq-accordion">
                    <AccordionSummary
                      expandIcon={<ExpandMore className="arrow-icon" />}
                      aria-controls="panel4a-content"
                      id="panel4a-header"
                      className="accordion-summary"
                    >
                      <p className="faq-accordion-title">
                        What are the top-rated Tours?
                      </p>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="details-desc">
                        The top-rated tours on TravelWP are those that receive
                        the highest reviews and ratings from previous
                        participants.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion className="faq-accordion">
                    <AccordionSummary
                      expandIcon={<ExpandMore className="arrow-icon" />}
                      aria-controls="panel5a-content"
                      id="panel5a-header"
                      className="accordion-summary"
                    >
                      <p className="faq-accordion-title">
                        What are the most affordable Tours?
                      </p>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="details-desc">
                        TravelWP offers a range of affordable tour options to
                        fit various budgets and preferences.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Card.Body>
              </Card>
            </Col>
            {/* Sticky booking/inquiry column */}
            <Col md={4} lg={4} sm={12}>
              <Card
                className="hotel-booking-wrapper"
                style={{ position: "sticky", top: "18%" }}
              >
                <Card.Body>
                  <h4 className="hotel-pricing">AED {hotels?.price || 500}</h4>
                  <h4 className="details-title mb-2">Book this room</h4>
                  <p className="details-desc">
                    Please set arrival date and departure date before checking
                    availability.
                  </p>
                  <Formik
                    initialValues={{ arrival_date: "", check_out_date: "" }}
                    onSubmit={handleSubmit}
                  >
                    {({
                      values,
                      handleChange,
                      handleSubmit,
                      isSubmitting,
                      setFieldValue,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="d-flex flex-column w-100">
                          <label
                            htmlFor="check_out_date"
                            className="custom-input-label"
                          >
                            Arrival Date - Departure Date
                          </label>
                          <input
                            type="text"
                            name="check_out_date"
                            className="custom-input"
                            placeholder="Select Arrival and Departure Dates"
                            value={formatDateRange()} // Display the selected date range
                            onClick={handleOpenDate} // Open the date picker on click
                            readOnly // Prevent manual editing
                          />
                          <Popover
                            open={Boolean(anchorDate)}
                            anchorEl={anchorDate}
                            onClose={handleCloseDate}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                            }}
                          >
                            <Box p={2}>
                              <div
                                className="date-range-container"
                                style={{
                                  display: "flex",
                                  flexDirection: isMobile ? "column" : "row", // Vertical stack for mobile
                                  gap: "1rem",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <DateRange
                                  editableDateInputs={true}
                                  onChange={(item) => {
                                    const { startDate, endDate } =
                                      item.selection;

                                    if (
                                      areDatesInRangeDisabled(
                                        startDate,
                                        endDate
                                      )
                                    ) {
                                      toast.error(
                                        "One or more selected dates are unavailable. Please choose different dates."
                                      );
                                      return;
                                    }

                                    setDateRange(item.selection);
                                    setIsDateSelected(true);
                                    calculatePrice(startDate, endDate);
                                  }}
                                  moveRangeOnFirstSelection={false}
                                  minDate={new Date()}
                                  ranges={[dateRange]}
                                  months={2} // Still show two months
                                  direction={
                                    isMobile ? "vertical" : "horizontal"
                                  } // Vertical for mobile
                                  dayContentRenderer={(date) => {
                                    const isDisabled = isDateDisabled(date);

                                    return (
                                      <div
                                        style={{
                                          textDecoration: isDisabled
                                            ? "line-through"
                                            : "none",
                                          pointerEvents: isDisabled
                                            ? "none"
                                            : "auto",
                                          color: isDisabled ? "#ccc" : "black",
                                        }}
                                      >
                                        {date.getDate()}
                                      </div>
                                    );
                                  }}
                                />
                              </div>
                            </Box>
                          </Popover>
                        </div>
                        {/* Number of Guests Dropdown */}
                        <div className="d-flex flex-column w-100 custom-dropdown-guest">
                          <label
                            htmlFor="guest_count"
                            className="custom-input-label"
                          >
                            Number of Guests
                          </label>
                          <div className="dropdown-wrapper-guest">
                            <div
                              className="dropdown-header-guest d-flex align-items-center custom-input"
                              onClick={() => setIsOpen(!isOpen)}
                            >
                              <PersonIcon style={{ marginRight: "8px" }} />
                              <span>
                                {guestCount}{" "}
                                {guestCount === 1 ? "Guest" : "Guests"}{" "}
                              </span>{" "}
                              {isOpen ? (
                                <ArrowDropUpIcon
                                  style={{ marginLeft: "auto" }}
                                />
                              ) : (
                                <ArrowDropDownIcon
                                  style={{ marginLeft: "auto" }}
                                />
                              )}
                            </div>
                            {isOpen && (
                              <ul className="dropdown-options-guest">
                                {options.map((count) => (
                                  <li
                                    key={count}
                                    className="dropdown-item-guest d-flex align-items-center"
                                    onClick={() => handleOptionSelect(count)}
                                  >
                                    <PersonIcon
                                      style={{ marginRight: "8px" }}
                                    />
                                    <span>
                                      {count} {count === 1 ? "Guest" : "Guests"}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                        {showTable && (
                          <table className="amount-table">
                            <tbody>
                              <tr>
                                <td>
                                  AED {priceDetails.basePrice} x{" "}
                                  {priceDetails.numberOfNights}{" "}
                                  {priceDetails.numberOfNights === 1
                                    ? "night"
                                    : "nights"}
                                </td>
                                <td>
                                  AED{" "}
                                  {priceDetails.basePrice *
                                    priceDetails.numberOfNights}
                                </td>
                              </tr>
                              <tr>
                                <td>Cleaning Fee</td>
                                <td>AED {priceDetails.cleaningFee}</td>
                              </tr>
                              <tr>
                                <td>5% VAT</td>
                                <td>AED {priceDetails?.vat?.toFixed(2)}</td>
                              </tr>
                              <tr>
                                <td>Dubai Tourism Fee</td>
                                <td>AED {priceDetails.tourismFee}</td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>TOTAL</strong>
                                </td>
                                <td>
                                  <strong>
                                    AED {priceDetails.total.toFixed(2)}
                                  </strong>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        )}
                        <button
                          type="submit"
                          className="Check-availibilty-btn mt-3"
                          onClick={handleAvailabilityClick}
                          disabled={isSubmitting}
                        >
                          {authUser || user ? "Book Now" : "Login to Book"}
                        </button>
                      </form>
                    )}
                  </Formik>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <section className="section">
            <div className="section-header">
              <h4 className="section-title text-center">
                Availability and rates
              </h4>
              <AvailabilProperty />
            </div>
          </section>
        </Container>

        {/* Gallery Modal */}
        <Dialog
          open={openGallery}
          onClose={() => setOpenGallery(false)}
          fullWidth
          maxWidth="md"
        >
          <DialogContent style={{ padding: 0, position: "relative" }}>
            {/* Close Button */}
            <IconButton
              aria-label="close"
              onClick={() => setOpenGallery(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                color: "white",
                zIndex: 5,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <CloseIcon />
            </IconButton>
            {/* Carousel */}
            <Carousel interval={3000}>
              {images.map((imgSrc, index) => (
                <Carousel.Item key={index}>
                  <img
                    src={imgSrc}
                    alt={`Slide ${index}`}
                    className="d-block w-100"
                    style={{
                      borderRadius: "10px",
                      height: "500px",
                      objectFit: "cover",
                    }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default page;
