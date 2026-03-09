"use client";
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "react-datepicker/dist/react-datepicker.css";
import "./home.css";
import HotelList from "@/components/HotelList/HotelList";
import TestimonialSlider from "@/components/TestimonialSlider/TestimonialSlider";
import ServicesCard from "@/components/ServicesCard/ServicesCard";
import AboutSection from "@/components/AboutSection/AboutSection";
import HeroSection from "@/components/HeroSection/HeroSection";
import Area from "@/components/Area/Area";
import SailingCard from "@/components/SailingCard/SailingCard";

const Home = () => {
  // Logic remains untouched as per instructions
  const [location, setLocation] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [guests, setGuests] = useState(0);
  const [category, setCategory] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const cardData = [
    { title: "50+", description: "Properties Under Management", isRating: false },
    { title: "500+", description: "Happy Customers", isRating: false },
    { title: "", description: "Rating", isRating: true },
  ];

  const faqs = [
    { question: "What makes Bellaviu’s Dubai holiday homes unique?", answer: "Our vacation rentals in Dubai offer spacious living, luxurious interiors, and prime locations at affordable prices. Unlike hotels, our homes provide a personalized experience with the comfort and privacy of a real home." },
    { question: "Are Bellaviu vacation rentals in Dubai safe?", answer: "Yes, all our vacation rentals are located in private, gated communities with 24/7 security surveillance, ensuring a secure and worry-free stay for you and your family." },
    { question: "What is included in Bellaviu’s Dubai holiday homes?", answer: "Our homes are fully furnished with modern amenities, including high-speed Wi-Fi, fully equipped kitchens, and cozy living spaces." },
    { question: "How do I book a vacation rental in Dubai with Bellaviu?", answer: "Booking is simple! Browse our collection of Dubai holiday homes, select your preferred property, choose your dates, and book instantly." },
    { question: "Can I cancel or modify my reservation?", answer: "Yes, we offer flexible cancellation policies. Please refer to the specific property’s terms and conditions during the booking process." },
    { question: "Are Bellaviu vacation rentals in Dubai family-friendly?", answer: "Absolutely! Our holiday homes are designed with families in mind, offering spacious layouts and safe environments." },
    { question: "Do you provide special deals for longer stays?", answer: "Yes, we offer exclusive discounts for extended stays. Contact our team or check our 'Special Offers' section for details." },
    { question: "What attractions are close to Bellaviu holiday homes?", answer: "Our properties are strategically located near Dubai’s top attractions, such as Burj Khalifa, Palm Jumeirah, and Dubai Marina." },
    { question: "Can I request additional services during my stay?", answer: "Yes, we provide add-on services like private chefs, car rentals, and personalized concierge assistance." },
    { question: "Why should I choose Bellaviu over a hotel?", answer: "With Bellaviu, you get the comfort of spacious homes, the privacy of secure communities, and the experience of living like a local at a fraction of hotel costs." }
  ];

  return (
    <>
      <HeroSection />
      <div className="mt-5">
        <AboutSection />
        <Area />
      </div>

      <section className="feature-room-section section">
        <Container>
          <Row className="g-4">
            <ServicesCard />
          </Row>
        </Container>
      </section>

      <section className="feature-room-section section">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Our rooms & suites</h2>
          </div>
          <HotelList />
        </Container>
      </section>

      <section className="feature-room-section section">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Testimonials</h2>
          </div>
          <TestimonialSlider />
        </Container>
      </section>

      {/* UPDATED METRICS SECTION */}
      <div style={{ marginBottom: "100px", marginTop: "100px" }}>
  <Container>
    {/* Header Section: Editorial Style */}
    <Box sx={{ textAlign: "center", mb: 8 }}>
      <Typography
        data-aos="fade-up"
        sx={{ 
          color: "rgb(189, 144, 136)", 
          textTransform: "uppercase", 
          letterSpacing: "6px", 
          fontSize: "0.8rem", 
          fontWeight: 700,
          mb: 1
        }}
      >
        Discover BellaViu
      </Typography>
      <Typography
        data-aos="fade-up"
        variant="h3"
        sx={{ 
          fontWeight: 400, 
          mb: 3, 
          color: "#2c2c2c", 
          fontFamily: '"Playfair Display", serif', // Adding a Serif font for a premium feel
          fontSize: { xs: '2rem', md: '3rem' }
        }}
      >
        Your Journey <span style={{ fontStyle: 'italic', color: 'rgb(189, 144, 136)' }}>Starts</span> Here
      </Typography>
      <Box sx={{ width: "40px", height: "1px", bgcolor: "rgb(189, 144, 136)", margin: "0 auto 24px" }} />
      <Typography
        data-aos="fade-up"
        variant="body1"
        sx={{ 
          color: "#666", 
          lineHeight: "1.8", 
          maxWidth: "700px", 
          margin: "0 auto", 
          fontFamily: '"Urbanist", sans-serif',
          fontSize: "1.1rem"
        }}
      >
        Choose from a variety of furnished apartments available on short-term, mid-term, and long-term basis and luxury villas in Dubai.
      </Typography>
    </Box>

    {/* Metrics Section: Museum Gallery Style */}
    <Row className="justify-content-center">
      {cardData.map((item, index) => (
        <Col md={4} key={index} data-aos="fade-up" data-aos-delay={index * 150}>
          <div className="boutique-metric-card">
            <div className="metric-header">
               {item.isRating ? (
                <div className="star-row">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="premium-star-gold">★</span>
                  ))}
                </div>
              ) : (
                <Typography className="metric-value">{item.title}</Typography>
              )}
            </div>
            
            <div className="metric-footer">
              <div className="footer-line"></div>
              <Typography className="metric-label">{item.description}</Typography>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  </Container>

        {/* UPDATED FAQ SECTION */}
        <Box sx={{ padding: "100px 0 60px" }}>
          <Container style={{ maxWidth: "900px" }}>
            <div className="text-center mb-5">
              <Typography
                data-aos="fade-up"
                variant="h4"
                sx={{ fontWeight: "bold", color: "#9c6c69", fontFamily: '"Urbanist", sans-serif', textTransform: "uppercase", letterSpacing: "2px" }}
              >
                Frequently Asked Questions
              </Typography>
              <div className="rosewood-divider"></div>
            </div>

            <div className="faq-wrapper">
              {faqs.map((faq, index) => (
                <Accordion
                  key={index}
                  className="premium-faq-accordion"
                  disableGutters
                  elevation={0}
                  sx={{ mb: 2 }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#9c6c69" }} />}>
                    <Typography sx={{ fontWeight: "600", fontFamily: '"Urbanist", sans-serif', color: "#333" }}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ color: "#666", lineHeight: "1.6", fontFamily: '"Urbanist", sans-serif' }}>
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </Container>
        </Box>
      </div>
    </>
  );
};

export default Home;