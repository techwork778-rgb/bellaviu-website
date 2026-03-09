"use client";

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./style.css";
import { Box, Container, Typography, Grid, IconButton, Divider } from "@mui/material";
import { LinkedIn, Instagram, PlayArrow } from '@mui/icons-material';
import { Modal } from "react-bootstrap";
import Breadcrumbs from "@/components/Breadcrumb/Breadcrumb";

const AboutPage = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1200, easing: 'ease-out-cubic', once: true });
  }, []);

  return (
    <div className="luxury-layout">
      <Breadcrumbs title="The Essence of BellaViu" image={"/dubai-creek.jpg"} />

      {/* 1. ARCHITECTURAL MANIFESTO */}
      <section className="manifesto-section">
        <Container maxWidth="md">
          <Box data-aos="fade-up" textAlign="center" py={10}>
            <Typography className="gold-overline">Excellence Defined</Typography>
            <Typography variant="h1" className="luxury-h1">
              Your Gateway to <span className="italic-serif">Curated</span> Living
            </Typography>
            <Typography className="luxury-lead-text">
              At BellaViu, we don't just provide accommodation; we curate environments. 
              Our portfolio represents the pinnacle of Dubai’s holiday homes—where 
              architectural brilliance meets bespoke hospitality.
            </Typography>
          </Box>
        </Container>
      </section>

      {/* 2. THE STORY - ASYMMETRIC LAYOUT */}
      <section className="section-white overflow-hidden">
        <Container>
          <Grid container spacing={0} alignItems="center">
            <Grid item xs={12} md={7} data-aos="reveal-right">
              <div className="luxury-image-wrapper">
                <img src="https://img.freepik.com/free-photo/guy-shows-document-girl-group-young-freelancers-office-have-conversation-working_146671-13569.jpg" alt="Legacy" />
                {/* <div className="experience-tag">EST. 2025</div> */}
              </div>
            </Grid>
            <Grid item xs={12} md={5} className="text-overlay-column" data-aos="fade-left">
              <div className="floating-content-card">
                <Typography className="gold-overline">Our Legacy</Typography>
                <Typography variant="h2" className="luxury-h2">Defining New <br/>Standards</Typography>
                <Typography className="luxury-body">
                  Founded in 2025, BellaViu is a response to the city's need for true sophistication. 
                  We believe a holiday home should be a sanctuary—a private enclave where 
                  the vibrant energy of Dubai meets the tranquility of a masterfully designed space.
                  Whether a traveler or a homeowner, you are entering a partnership based 
                  on transparency and unparalleled quality.
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* 3. THE PILLARS - DARK ELEGANCE */}
      <section className="section-obsidian">
        <Container>
          <Box textAlign="center" mb={6} data-aos="fade-up">
            <Typography className="gold-overline">The BellaViu Difference</Typography>
            <Typography variant="h3" className="white-overline">Why Discerning Guests <br/>Choose Us</Typography>
          </Box>
          <Grid container spacing={6}>
            {[
              { title: "Prime Curation", desc: "Properties hand-selected in Dubai's most prestigious postcodes, from Palm Jumeirah to Downtown." },
              { title: "Uncompromising Safety", desc: "24/7 surveillance and secure gated access in Dubai's elite private communities." },
              { title: "Exceptional Value", desc: "Luxury made accessible through intelligent management and bespoke pricing models." }
            ].map((item, i) => (
              <Grid item xs={12} md={4} key={i} data-aos="fade-up" data-aos-delay={i * 200}>
                <div className="luxury-feature-card">
                  <Typography className="feature-number">0{i+1}</Typography>
                  <Typography variant="h4" className="feature-title">{item.title}</Typography>
                  <Divider className="gold-divider" />
                  <Typography className="feature-desc">{item.desc}</Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* 4. CINEMATIC MOMENT */}
      <section className="cinematic-section" onClick={() => setShowModal(true)}>
        <div className="parallax-bg">
            <img src="/bellaviuvedio.jpg" alt="Dubai Luxury" />
            <div className="cinematic-overlay">
                <div className="play-button-luxury">
                    <PlayArrow className="play-icon-svg" />
                </div>
                <Typography className="cinematic-text">Experience the Vision</Typography>
            </div>
        </div>
      </section>

      {/* 5. THE LEADERSHIP */}
      <section className="section-beige">
        <Container>
          <Box textAlign="center" mb={10} data-aos="fade-up">
            <Typography className="gold-overline">The Minds Behind BellaViu</Typography>
            <Typography variant="h2" className="luxury-h2">Our Leadership</Typography>
          </Box>
          <Grid container spacing={4} justifyContent="center">
            {[
              { name: 'Farha n Mirza', role: 'Founder & Chairman', img: '/farha.jpeg' },
              { name: 'Nazim Ab Mirza', role: 'Founder', img: '/nazim.jpeg' },
              { name: 'Samuel Corral', role: 'Co-Founder', img: '/image.jpg' },
            ].map((member, i) => (
              <Grid item xs={12} sm={6} md={4} key={i} data-aos="fade-up" data-aos-delay={i*200}>
                <div className="executive-card">
                  <div className="executive-img-container">
                    <img src={member.img} alt={member.name} />
                    <div className="executive-socials">
                       <IconButton className="social-btn"><LinkedIn /></IconButton>
                       <IconButton className="social-btn"><Instagram /></IconButton>
                    </div>
                  </div>
                  <div className="executive-info">
                    <Typography className="exec-name">{member.name}</Typography>
                    <Typography className="exec-role">{member.role}</Typography>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="xl" centered className="luxury-modal">
        <Modal.Body className="p-0 bg-black">
          <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
          <video controls autoPlay className="w-100">
            <source src="/dubai.mp4" type="video/mp4" />
          </video>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AboutPage;