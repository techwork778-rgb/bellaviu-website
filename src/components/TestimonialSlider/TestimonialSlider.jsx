import React from 'react';
import Slider from 'react-slick';
import { Card, Container } from 'react-bootstrap';
import { Typography, Rating, Avatar, Box, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './TestimonialSlider.css';

const TestimonialSlider = () => {
    const testimonials = [
        {
            rating: 5,
            review: "Bellaviu gave us everything we dreamed of and more. The space, comfort, and attention to detail made our vacation unforgettable. It felt like a home, but better!",
            name: "Sarah M.",
            location: "UK",
            avatar: "/api/placeholder/48/48"
        },
        {
            rating: 5,
            review: "Our Bellaviu stay was perfect for our family of five. The kids loved the space, and we loved the privacy and local feel. It was way better than any hotel we've stayed in before.",
            name: "Ahmed R.",
            location: "Saudi Arabia",
            avatar: "/api/placeholder/48/48"
        },
        {
            rating: 5,
            review: "I felt completely at ease knowing we were in a gated community with 24/7 security. The home was beautifully designed, and every detail was flawless.",
            name: "Laura T.",
            location: "USA",
            avatar: "/api/placeholder/48/48"
        },
        {
            rating: 5,
            review: "For the price we paid, the experience was incredible. Spacious, clean, and luxurious – everything was beyond our expectations. We’ll be back!",
            name: "Priya L.",
            location: "India",
            avatar: "/api/placeholder/48/48"
        }
    ];

    const CustomPrevArrow = ({ onClick }) => (
        <IconButton onClick={onClick} className="bv-testimonial-arrow bv-testimonial-arrow--prev">
            <ChevronLeft size={24} />
        </IconButton>
    );

    const CustomNextArrow = ({ onClick }) => (
        <IconButton onClick={onClick} className="bv-testimonial-arrow bv-testimonial-arrow--next">
            <ChevronRight size={24} />
        </IconButton>
    );

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 2,
        slidesToScroll: 1,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        dotsClass: "slick-dots bv-testimonial-dots",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    };

    return (
        <section className="bv-testimonial-wrapper">
            <Container>
                <Box className="bv-testimonial-header">
                    <Typography variant="overline" className="bv-testimonial-badge">
                        Guest Experiences
                    </Typography>
                    <Typography variant="h2" className="bv-testimonial-title">
                        What Our Guests <span className="bv-testimonial-italic">Say</span>
                    </Typography>
                </Box>

                <Slider {...settings} className="bv-testimonial-slider">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bv-testimonial-slide">
                            <Card className="bv-testimonial-card">
                                <Box className="bv-testimonial-quote-icon">
                                    <Quote size={40} fill="currentColor" opacity={0.1} />
                                </Box>
                                <Card.Body className="bv-testimonial-body">
                                    <Rating
                                        value={testimonial.rating}
                                        readOnly
                                        precision={0.5}
                                        className="bv-testimonial-rating"
                                    />

                                    <Typography className="bv-testimonial-text">
                                        "{testimonial.review}"
                                    </Typography>

                                    <Box className="bv-testimonial-footer">
                                        <Avatar
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            className="bv-testimonial-avatar"
                                        />
                                        <Box className="bv-testimonial-meta">
                                            <Typography className="bv-testimonial-name">
                                                {testimonial.name}
                                            </Typography>
                                            <Typography className="bv-testimonial-location">
                                                {testimonial.location}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </Slider>
            </Container>
        </section>
    );
};

export default TestimonialSlider;