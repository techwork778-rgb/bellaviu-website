import React from 'react';
import { Container, Typography } from '@mui/material';
import Image from 'next/image';
import { Col, Row } from 'react-bootstrap';
import Link from 'next/link';
import "./AboutSection.css";

const AboutSection = () => {
  return (
    <div className="about-wrapper" data-aos="fade-up">
      <Container maxWidth="lg">
        <Row className="align-items-center">
          <Col md={6} lg={6} sm={12} className="pe-lg-5">
            <div className="image-container-premium">
              <div className="image-frame-decoration" />
              <div className="image-wrapper-inner">
                <Image
                  src="/about-us.png"
                  alt="Luxury interior living room"
                  layout="responsive"
                  width={724}
                  height={525}
                  className="luxury-image"
                />
              </div>
              <div className="experience-badge">
                <Typography className="badge-title">EST.</Typography>
                <Typography className="badge-year">2024</Typography>
              </div>
            </div>
          </Col>
          <Col md={6} lg={6} sm={12} className="ps-lg-5 mt-5 mt-md-0">
            {/* Content Section */}
            <div className="content-box-premium">
              <div className="section-subtitle">EXQUISITE LIVING</div>
              <Typography variant="h2" className="luxury-heading">
                Why Bellaviu is Your <br />
                <span className="accent-text">Perfect Choice</span>
              </Typography>

              <div className="description-container">
                <Typography variant="body1" className="about-desc-premium lead-text">
                  Enjoy breathtaking views, premium amenities, and elegant accommodations with us. 
                  Book your beachfront holiday rental directly for the best rates in Dubai.
                </Typography>

                <Typography variant="body1" className="about-desc-premium">
                  <strong>BellaViu Holiday Homes™</strong>—where every stay is a memorable experience. 
                  As part of our commitment, we strive to be your home away from home.
                </Typography>

                <Typography variant="body1" className="about-desc-premium italic-text">
                  We specialize in managing short-term stays for guests from around 
                  the globe while giving top notch services to property owners.
                </Typography>

                <Typography variant="body1" className="about-desc-premium">
                  Picture a seamless blend of beautiful homes and the attentive care 
                  of a hotel—that is what we are all about. Welcome to BellaViu.
                </Typography>
              </div>

              <div className="button-wrapper-premium">
                <Link href='/about-us'>
                  <button className="hero-duo-button-premium">
                    <span>ABOUT US</span>
                  </button>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutSection;