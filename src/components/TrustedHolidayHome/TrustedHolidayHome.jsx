import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import "./TrustedHolidayHome.css"; // Import your external CSS file
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ListForm from "@/components/ListForm/ListForm";
import TestimonialSlider from "@/components/TestimonialSlider/TestimonialSlider";
import { Container, Row, Col } from "react-bootstrap";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ListSection from "@/components/ListSection/listsection";
import Link from "next/link";
const faqs = [
  {
    question: "What makes Bellaviu’s Dubai holiday homes unique?",
    answer: "Our vacation rentals in Dubai offer spacious living, luxurious interiors, and prime locations at affordable prices. Unlike hotels, our homes provide a personalized experience with the comfort and privacy of a real home."
  },
  {
    question: "Are Bellaviu vacation rentals in Dubai safe?",
    answer: "Yes, all our vacation rentals are located in private, gated communities with 24/7 security surveillance, ensuring a secure and worry-free stay for you and your family."
  },
  {
    question: "What is included in Bellaviu’s Dubai holiday homes?",
    answer: "Our homes are fully furnished with modern amenities, including high-speed Wi-Fi, fully equipped kitchens, and cozy living spaces. Additional services like housekeeping and concierge are also available."
  },
  {
    question: "How do I book a vacation rental in Dubai with Bellaviu?",
    answer: "Booking is simple! Browse our collection of Dubai holiday homes, select your preferred property, choose your dates, and book instantly through our secure online platform."
  },
  {
    question: "Can I cancel or modify my reservation?",
    answer: "Yes, we offer flexible cancellation policies. Please refer to the specific property’s terms and conditions during the booking process for details."
  },
  {
    question: "Are Bellaviu vacation rentals in Dubai family-friendly?",
    answer: "Absolutely! Our holiday homes are designed with families in mind, offering spacious layouts, safe environments, and proximity to family-friendly attractions in Dubai."
  },
  {
    question: "Do you provide special deals for longer stays?",
    answer: "Yes, we offer exclusive discounts for extended stays in our Dubai vacation rentals. Contact our team or check our 'Special Offers' section for details."
  },
  {
    question: "What attractions are close to Bellaviu holiday homes?",
    answer: "Our properties for vacation rentals are strategically located near Dubai’s top attractions, such as Burj Khalifa, Palm Jumeirah, Dubai Marina, and major shopping and dining hubs."
  },
  {
    question: "Can I request additional services during my stay?",
    answer: "Yes, we provide add-on services like private chefs, car rentals, and personalized concierge assistance to make your stay even more special."
  },
  {
    question: "Why should I choose Bellaviu over a hotel?",
    answer: "With Bellaviu, you get the comfort of spacious, beautifully designed homes, the privacy of secure communities, and the experience of living like a local – all at a fraction of the cost of luxury hotels."
  }
];
const steps = [
  {
    number: 1,
    title: "Property Check",
    description:
      "We inspect your property and ensure it meets our standards for quality and safety.",
  },
  {
    number: 2,
    title: "Revenue Insights",
    description:
      "Estimate potential earnings based on market trends agreement and begin our partnership.",
  },
  {
    number: 3,
    title: "Contract",
    description:
      "Sign the agreement and begin our partnership appeal with expert interior design.",
  },
  {
    number: 4,
    title: "Design ",
    description:
      "Boost your property's appeal with expert interior design and preparation services.",
  },
  {
    number: 5,
    title: "Photos & Pricing",
    description:
      "List your property on top platforms with professional photos and optimized pricing.",
  },
  {
    number: 6,
    title: "Guest Support",
    description:
      "Ensure smooth check-ins and provide 24/7 guest assistance with ease and convenience.",
  },
  {
    number: 7,
    title: "Portals & Payouts",
    description:
      "Track performance and receive monthly payouts with ease and convenience.",
  },
];
const logos = [
  "/Bagyut.png",
  "/Expedia.png",
  "/booking.com_.png",
  "/extral.png",
  "/airbnb.png",
  // New fake brand logo
];
const HolidayHomeOperator = () => {
  const [counters, setCounters] = useState({
    properties: 0,
    clients: 0,
    years: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCounters((prev) => ({
        properties: Math.min(prev.properties + 10, 1000),
        clients: Math.min(prev.clients + 5, 500),
        years: Math.min(prev.years + 1, 10),
      }));
    }, 50);
    return () => clearInterval(interval);
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <>
      <div className="add-property-page">
        {/* Overlay for linear opacity */}
        <div className="background-overlay"></div>

        {/* Centered content */}
        <div className="content-container">
          <Typography variant="h3" className="heading-porperties">
            Property Management Services in Dubai.
          </Typography>
          <Typography className="sub-heading">
            Showcase your property to millions of potential buyers. Showcase
            your property to millions of potential buyers.
          </Typography>
          <a href="#listForm">
            <button class="managep-button my-2">List Your Property</button>
          </a>
        </div>
      </div>

      <div style={{ backgroundColor: "#fff" }}>
        <Slider {...settings}>
          {logos.map((logo, index) => (
            <div
              key={index}
              style={{
                padding: "0 10px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={logo}
                alt={`Logo ${index + 1}`}
                style={{
                  width: "150px", // Set a fixed width for all logos
                  height: "150px", // Set a fixed height to make all logos the same size
                  objectFit: "contain", // Ensure logos scale without distortion
                  margin: "0 auto", // Center the image horizontally
                  display: "block", // Ensures the image is a block element
                }}
              />
            </div>
          ))}
        </Slider>
      </div>

      <Grid
        container
        spacing={3}
        className="container"
        style={{ margin: "0 auto", maxWidth: "1200px" }}
      >
        <Grid item xs={12} md={7}>
          <Typography variant="h4" className="trusted-title">
            Trusted Holiday Home Operator in Dubai
          </Typography>
          <Typography variant="body1" className="trusted-description">
            BellaViu Holiday Homes Dubai offers comprehensive property
            management solutions across all types of real estate, designed to
            optimize value, streamline operations, and enhance guest
            experiences. From individual apartments to expansive property
            portfolios, our expertise covers Dubai’s most sought-after
            locations.
          </Typography>
          <Grid container spacing={2} className="trusted-list-container">
            <Grid item xs={6} md={4}>
              <ul className="trusted-property-list">
                <li>
                  <span class="checkmark"> High-Rise Towers</span>
                </li>
                <li>
                  <span class="checkmark"> Multi-Floor Portfolios </span>
                </li>
                <li>
                  <span class="checkmark"> Single Apartments</span>
                </li>
                <li>
                  <span class="checkmark"> Single Luxury Villas</span>
                </li>
                <li>
                  <span class="checkmark"> Townhouses</span>
                </li>
              </ul>
            </Grid>
            <Grid item xs={6} md={4}>
              <ul className="trusted-property-list">
                <li>
                  <span class="checkmark"> High-Rise Towers</span>
                </li>
                <li>
                  <span class="checkmark">Multi-Floor Portfolios</span>
                </li>
                <li>
                  <span class="checkmark"> Hotels & Resorts</span>
                </li>
                <li>
                  <span class="checkmark"> Prime Location Properties</span>
                </li>
                <li>
                  <span class="checkmark">Real Estate Developers</span>
                </li>
              </ul>
            </Grid>
            <Grid item xs={6} md={4}>
              <ul className="trusted-property-list">
                <li>
                  <span class="checkmark"> Family Offices</span>
                </li>
                <li>
                  <span class="checkmark"> REITs</span>
                </li>
                <li>
                  <span class="checkmark"> Vacation Home Investors</span>
                </li>
              </ul>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={5}>
          <img
            src="/Dubai.jpg"
            alt="Dubai skyline"
            className="trusted-image"
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          // background: 'linear-gradient(90deg, #00c6ff, #0072ff)',
          background: "#9c6c69",

          padding: "20px 60px",
          color: "white",
          textAlign: "left",
          flexDirection: {
            xs: "column", // Column layout on small screens
            sm: "row", // Row layout on medium and larger screens
          },
          gap: 2, // Space between items
        }}
      >
        <Box
          sx={{
            textAlign: {
              xs: "center",
              sm: "left",
            },
            mb: {
              xs: 2,
              sm: 0,
            },
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", fontSize: { xs: "1.5rem", sm: "2rem" } }}
          >
            Ready to maximize your earnings?
          </Typography>
          <Typography
            variant="body1"
            sx={{ mt: 1, fontSize: { xs: "0.9rem", sm: "1rem" } }}
          >
            Your property, our expertise—profit with peace of mind.
          </Typography>
        </Box>
        <a href="#listForm">
          <button className="list-button">List with us</button>
        </a>
      </Box>
      <section className="what-makes-us-section">
        <Container>
          <Row className="align-items-center">
            {/* Video Section */}
            <Col md={6} className="video-section">
              <div className="video-container">
                <img
                  src="https://www.deluxehomes.com/wp-content/uploads/2024/01/Deluxe-Holiday-Homes-Property-Management-Video-Thumbnail-1024x550.png"
                  alt="Video Preview"
                  className="video-image"
                />
                {/* <div className="play-icon"> */}
                {/* <PlayCircleOutlineIcon /> */}
                {/* </div> */}
              </div>
            </Col>
            {/* Content Section */}
            <Col md={6} className="content-section">
              <h2 className="highlight-text">
                What Makes Us
                <br />
                <span className="highlight-text">The Best Choice</span>
              </h2>
              <p className="description">
                BellaViu Holiday Homes' top-tier property management can easily
                be defined in two words:
              </p>
              <ul className="feature-list">
                <li>Transparent</li>
                <li>Simple</li>
              </ul>
              <p className="description">
                We exemplify a commitment to honesty, clarity, and
                straightforwardness in all interactions while ensuring a
                hassle-free experience for property owners.
              </p>
              <Link href="/contact-us">
                <button className="contact-button">Contact Us</button>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
      <ListSection />
      <section className="counter-section">
        <Container>
          <Row>
            <Col md={4} className="counter-box">
              <h2 className="counter-number">{counters.properties}+</h2>
              <p className="counter-text">Properties Managed</p>
            </Col>
            <Col md={4} className="counter-box">
              <h2 className="counter-number">{counters.clients}+</h2>
              <p className="counter-text">Happy Clients</p>
            </Col>
            <Col md={4} className="counter-box">
              <h2 className="counter-number">{counters.years}+</h2>
              <p className="counter-text">Years of Experience</p>
            </Col>
          </Row>
        </Container>
      </section>
      <Box
        sx={{ p: 4, textAlign: "center", display: { xs: "none", md: "block" } }}
      >
        {/* Header Section */}
        <Typography variant="h6" sx={{ mb: 1, color: "#9c6c69" }}>
          7-Steps to Success
        </Typography>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
          Your Seamless Journey with BellaViu Holiday Homes
        </Typography>

        {/* Steps Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            mt: 4,
          }}
        >
          {steps.map((step, index) => (
            <Box key={step.number} sx={{ textAlign: "center", flex: 1 }}>
              {/* Circle */}
              <Avatar
                sx={{
                  bgcolor: "#9c6c69",
                  color: "#fff",
                  width: 56,
                  height: 56,
                  margin: "0 auto",
                  fontSize: 20,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {step.number}
              </Avatar>
              {/* Line */}
              {index < steps.length - 1 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "28px",
                    left: `${(index + 0.5) * 14.28}%`, // Distributes the lines evenly
                    right: `${(7 - (index + 1.5)) * 14.28}%`,
                    height: "2px",
                    bgcolor: "#9c6c69",
                  }}
                />
              )}
              {/* Title */}
              <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                {step.title}
              </Typography>
              {/* Description */}
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                {step.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <div id="listForm">
        <ListForm />
      </div>

      <Box sx={{ padding: "20px" }}>
        <div className="container">
          <h2 className="heading-start">Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </Box>
    </>
  );
};

export default HolidayHomeOperator;
