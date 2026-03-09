"use client";
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import "./HeroSection.css";

export default function HeroSection() {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guestAnchor, setGuestAnchor] = React.useState(null);

  const GuestAnchorID = Boolean(guestAnchor) ? 'simple-popover' : undefined;

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <Box className="hero-section-home">
      <div className="hero-overlay"></div>
      <Container maxWidth="lg" className="hero-content-wrapper">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <Typography variant="h3" className="hero-title">
              Discover Premium Vacation Rentals <br/> 
              <span className="text-highlight">In Dubai With Bellaviu</span>
            </Typography>
          </motion.div>

          {/* <motion.div variants={fadeInUp}>
            <Typography variant="h6" className="hero-description my-3">
              Curated selection of furnished apartments and bespoke luxury villas.
            </Typography>
          </motion.div> */}

          <motion.div variants={fadeInUp} className="d-flex justify-content-center gap-4 mb-3 my-4">
            <Link href="/hotel-filter" className="text-decoration-none">
              <button className="hero-duo-button-home hero-primary-btn"> 
                <span>Stay With Us</span>
              </button>
            </Link>
            
            <Link href="/add-property" className="text-decoration-none">
              <button className="hero-duo-button-home hero-outline-btn-list-home">
                <span>List With Us</span>
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
      
      {/* Subtle Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="scroll-indicator"
      >
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </motion.div>
    </Box>
  );
}