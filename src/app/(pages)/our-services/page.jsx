"use client";
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import ApartmentIcon from '@mui/icons-material/Apartment';
import VillaIcon from '@mui/icons-material/Villa';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import ListSection from "@/components/ListSection/listsection";
import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Box,
  Fade,
  Slide,
  Zoom,
  useTheme,
  alpha
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { keyframes } from '@mui/system';
import { Apartment } from '@mui/icons-material';

// Custom animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

export default function OurServicesPage() {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
const iconMap = {
  Apartment: ApartmentIcon,
  
};
  const services = [
    {
      icon:  ApartmentIcon,
      title: "Luxury Apartments",
      description: "Premium high-rise apartments with stunning city views, modern amenities, and 24/7 concierge services.",
      features: ["Smart Home Technology", "Infinity Pool", "Gym & Spa"],
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      delay: 600
    },
    {
      icon:  MapsHomeWorkIcon,
      title: "Designer Studios",
      description: "Thoughtfully designed compact spaces that maximize comfort and style for the modern professional.",
      features: ["Flexible Layouts", "Premium Finishes", "Co-working Spaces"],
      color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      delay: 800
    },
    {
      icon:  VillaIcon,
      title: "Executive Villas",
      description: "Exclusive family estates with private pools, landscaped gardens, and unparalleled privacy.",
      features: ["Private Pool", "Landscaped Gardens", "Multi-car Garage"],
      color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      delay: 1000
    }
  ];

  return (
    <>
      <Breadcrumb image={"/listproperty.jpeg"} title={"Our Services"} />

      {/* Hero Section */}
      

      {/* Services Section */}
      {/* <Box sx={{ py: 12, background: 'linear-gradient(180deg, #f8fafc 0%, #fff 100%)' }}>
        <Container>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(45deg, #2d3436 30%, #636e72 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2
              }}
            >
              Exclusive Property Collections
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                maxWidth: 700,
                mx: 'auto',
                fontWeight: 400,
                lineHeight: 1.6
              }}
            >
              Each category is carefully curated to offer unmatched quality, prime locations, and world-class amenities that define luxury living in Dubai.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Fade in={isVisible} timeout={service.delay}>
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 4,
                      overflow: 'hidden',
                      p: 3,
                      background: '#fff',
                      boxShadow: `0 10px 30px ${alpha('#000', 0.05)}`,
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 16px 40px ${alpha('#000', 0.1)}`
                      }
                    }}
                  >
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          mx: 'auto',
                          mb: 2,
                          borderRadius: '50%',
                          background: service.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                       <service.icon sx={{ fontSize: 40, color: '#fff' }} />
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                        {service.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {service.description}
                      </Typography>
                    </Box>
                    <Box component="ul" sx={{ pl: 2, mt: 2, color: 'text.secondary' }}>
                      {service.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </Box>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box> */}
  
            <ListSection />
       <Box
      sx={{
        background: `
          linear-gradient(135deg, 
            rgba(0, 0, 0, 0.7) 0%, 
    rgba(0, 0, 0, 0.5) 50%, 
    rgba(0, 0, 0, 0.7) 100%
          ),
          url('https://images.musement.com/cover/0002/45/dubai-skyline-at-dusk-jpg_header-144981.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* ✅ Overlay image on top */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
           backgroundColor: 'rgba(0, 0, 0, 0.4)', // <-- semi-transparent black
          opacity: 0.15,
          zIndex: 1
        }}
      />

      {/* ✅ Main content */}
      <Container sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <Fade in={isVisible} timeout={1000}>
          <Box>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
                background: 'linear-gradient(45deg, #fff 30%, #f0f0f0 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                textShadow: '0 4px 8px rgba(0,0,0,0.3)'
              }}
            >
              Redefine Your
            </Typography>
            <Typography
              variant="h1"
              component="span"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
                background: 'linear-gradient(45deg,rgb(175, 127, 127) 30%, rgb(175, 127, 127) 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'block',
                mb: 3
              }}
            >
              Living Experience
            </Typography>
          </Box>
        </Fade>

        <Slide in={isVisible} direction="up" timeout={1200}>
          <Typography
            variant="h5"
            sx={{
              color: alpha('#fff', 0.9),
              mb: 5,
              maxWidth: 600,
              mx: 'auto',
              fontWeight: 300,
              lineHeight: 1.6
            }}
          >
            Discover extraordinary properties that blend luxury, comfort, and innovation in the heart of Dubai's most prestigious locations.
          </Typography>
        </Slide>

        <Zoom in={isVisible} timeout={1500}>
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/hotel-filter" passHref>
              <Button
                variant="contained"
                size="large"
                sx={{
                  background: 'linear-gradient(45deg, rgb(175, 127, 127)  30%, #ff8e8e 90%)',
                  px: 5,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 6,
                  textTransform: 'none'
                }}
              >
                Explore Premium Properties
              </Button>
            </Link>
            <Link href="/contact-us" passHref>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'rgb(175, 127, 127) ',
                  color: '#fff',
                  px: 5,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 6,
                  textTransform: 'none'
                }}
              >
                Schedule Consultation
              </Button>
            </Link>
          </Box>
        </Zoom>
      </Container>
    </Box>
    </>
  );
}
