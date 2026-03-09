

"use client";
import React from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  Paper,
  Avatar,
  Fade,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";
import {
  CheckCircle,
  LocationOn,
  Group,
  Payment,
  Email,
  Hotel,
  ArrowForward,
  Star,
  Shield,
  Support,
  Home,
} from "@mui/icons-material";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Link from "next/link";
import "./style.css";

const Page = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const journeyMilestones = [
    {
      title: "Visit Our Website",
      description:
        "Go to Bellaviu holiday homes. You'll find a wide range of beautiful holiday homes ready for you to explore.",
      date: "Step 1",
      location: "Online Platform",
      category: "Discovery",
      impact: "Find Your Perfect Match",
      color: "#6366f1",
      icon: <Home />,
    },
    {
      title: "Choose Your Home",
      description:
        "Browse through our homes using filters like: Number of guests, Location, Price, Type of home (apartment, villa, etc). Each home has photos, a list of features, and details to help you choose the perfect place.",
      date: "Step 2",
      location: "Search Portal",
      category: "Selection",
      impact: "Tailored Results",
      color: "#3b82f6",
      icon: <Star />,
    },
    {
      title: "Check Availability",
      description:
        "Pick your check-in and check-out dates to see if the home is available. If it is, you'll be able to move to the next step right away.",
      date: "Step 3",
      location: "Booking System",
      category: "Planning",
      impact: "Secure Your Dates",
      color: "#10b981",
      icon: <CheckCircle />,
    },
    {
      title: "Book Your Stay",
      description:"Click Book Now and fill in your details. You'll need: Your name and contact info, Number of guests, Payment details. Don't worry—our booking system is safe and secure.",
      date: "Step 4",
      location: "Payment Portal",
      category: "Booking",
      impact: "Confirmed Reservation",
      color: "#f59e0b",
      icon: <Payment />,
    },
    {
      title: "Enjoy Your Stay",
      description:
        "When you arrive, our team will be ready to welcome you. We'll help you check in and make sure you have everything you need for a comfortable stay.",
      date: "Step 5",
      location: "Email & SMS",
      category: "Confirmation",
      impact: "All Set to Go",
      color: "#8b5cf6",
      icon: <Email />,
    },
  ];

  const benefits = [
    {
      title: "Stylish & Comfortable Homes",
      description:
        "Handpicked properties featuring premium amenities and sophisticated design",
      icon: <Star sx={{ color: "#f59e0b" }} />,
    },
    {
      title: "Top Locations in Dubai",
      description:
        "Strategic locations near Dubai's business districts, shopping, and attractions",
      icon: <LocationOn sx={{ color: "#ef4444" }} />,
    },
    {
      title: "24/7 Guest Support",
      description:
        "Rigorous safety protocols and secure properties with 24/7 monitoring",
      icon: <Shield sx={{ color: "#10b981" }} />,
    },
    {
      title: "Clean & Safe",
      description:
        "Personal guest managers and round-the-clock concierge services",
      icon: <Support sx={{ color: "#8b5cf6" }} />,
    },
  ];

  return (
    <>
      <Breadcrumb title="Booking Journey" image={"/blogs.jpeg"} />

      <Container 
        maxWidth="xl" 
        sx={{ 
          mb: { xs: 4, md: 8 }, 
          mt: { xs: 2, md: 5 },
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <Grid container spacing={{ xs: 4, md: 8 }}>
          <Grid item xs={12} lg={8}>
            <Box sx={{ mb: { xs: 4, md: 6 } }}>
              <Typography
                variant="h2"
                gutterBottom
                sx={{
                  fontWeight: 800,
                  color: "#1e293b",
                  mb: { xs: 2, md: 3 },
                  mt: { xs: 2, md: 5 },
                  fontSize: { 
                    xs: "1.8rem", 
                    sm: "2.2rem", 
                    md: "2.8rem", 
                    lg: "3.5rem" 
                  },
                  lineHeight: 1.1,
                  textAlign: { xs: 'center', md: 'left' }
                }}
              >
                Simple Steps to Extraordinary Stays
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: "#64748b",
                  lineHeight: 1.6,
                  fontWeight: 400,
                  maxWidth: { xs: '100%', md: 700 },
                  fontSize: { 
                    xs: "1.1rem", 
                    sm: "1.3rem", 
                    md: "1.5rem" 
                  },
                  textAlign: { xs: 'center', md: 'left' },
                  mx: { xs: 'auto', md: 0 }
                }}
              >
                From discovery to departure, we've streamlined every touchpoint
                to ensure your Dubai experience exceeds expectations from the
                very first click.
              </Typography>
            </Box>

            <Timeline 
              position={isMobile ? "right" : "alternate"}
              sx={{
                '& .MuiTimelineItem-root': {
                  minHeight: { xs: 'auto', md: '200px' }
                }
              }}
            >
              {journeyMilestones.map((milestone, index) => (
                <TimelineItem key={index}>
                  {!isMobile && (
                    <TimelineOppositeContent
                      sx={{
                        m: "auto 0",
                        textAlign: index % 2 === 0 ? "right" : "left",
                        px: { xs: 1, md: 3 },
                        py: 2,
                        display: { xs: 'none', md: 'block' }
                      }}
                    >
                      <Chip
                        label={milestone.category}
                        sx={{
                          backgroundColor: milestone.color,
                          color: "white",
                          fontWeight: 700,
                          mb: 2,
                          px: 2,
                          fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
                        }}
                      />
                      <Typography
                        variant="h4"
                        sx={{ 
                          fontWeight: 800, 
                          color: "#1e293b", 
                          mb: 1,
                          fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" }
                        }}
                      >
                        {milestone.date}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ 
                          color: "#64748b", 
                          mb: 1,
                          fontSize: { xs: "0.9rem", md: "1rem" }
                        }}
                      >
                        {milestone.location}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent:
                            index % 2 === 0 ? "flex-end" : "flex-start",
                        }}
                      >
                        <Avatar
                          sx={{
                            backgroundColor: `${milestone.color}20`,
                            color: milestone.color,
                            width: { xs: 28, md: 32 },
                            height: { xs: 28, md: 32 },
                            mr: index % 2 === 0 ? 0 : 1,
                            ml: index % 2 === 0 ? 1 : 0,
                          }}
                        >
                          {milestone.icon}
                        </Avatar>
                      </Box>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          display: "block",
                          mt: 2,
                          fontWeight: 700,
                          color: milestone.color,
                          fontSize: { xs: "0.9rem", md: "1rem" },
                        }}
                      >
                        {milestone.impact}
                      </Typography>
                    </TimelineOppositeContent>
                  )}

                  <TimelineSeparator>
                    <TimelineDot
                      sx={{
                        backgroundColor: milestone.color,
                        width: { xs: 20, md: 24 },
                        height: { xs: 20, md: 24 },
                        border: "4px solid white",
                        boxShadow: `0 0 0 4px ${milestone.color}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        sx={{
                          color: "white",
                          fontSize: { xs: "10px", md: "12px" },
                          fontWeight: "bold",
                        }}
                      >
                        {index + 1}
                      </Box>
                    </TimelineDot>
                    {index < journeyMilestones.length - 1 && (
                      <TimelineConnector
                        sx={{
                          height: { xs: 60, md: 80 },
                          background: `linear-gradient(to bottom, ${
                            milestone.color
                          }40, ${journeyMilestones[index + 1].color}40)`,
                        }}
                      />
                    )}
                  </TimelineSeparator>

                  <TimelineContent sx={{ py: "20px", px: { xs: 1, md: 3 } }}>
                    {isMobile && (
                      <Box sx={{ mb: 2 }}>
                        <Chip
                          label={milestone.category}
                          sx={{
                            backgroundColor: milestone.color,
                            color: "white",
                            fontWeight: 700,
                            mb: 1,
                            px: 1,
                            fontSize: "0.7rem",
                          }}
                        />
                        <Typography
                          variant="h6"
                          sx={{ 
                            fontWeight: 800, 
                            color: "#1e293b", 
                            mb: 0.5,
                            fontSize: "1.1rem"
                          }}
                        >
                          {milestone.date}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ 
                            color: "#64748b", 
                            mb: 1,
                            fontSize: "0.8rem"
                          }}
                        >
                          {milestone.location}
                        </Typography>
                      </Box>
                    )}
                    
                    <Card
                      sx={{
                        maxWidth: { xs: '100%', md: 450 },
                        borderRadius: { xs: 3, md: 4 },
                        boxShadow: { 
                          xs: "0 4px 20px rgba(0,0,0,0.08)", 
                          md: "0 12px 40px rgba(0,0,0,0.12)" 
                        },
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        border: `2px solid ${milestone.color}20`,
                        overflow: "hidden",
                        "&:hover": {
                          transform: { xs: "translateY(-4px)", md: "translateY(-12px)" },
                          boxShadow: { 
                            xs: "0 8px 30px rgba(0,0,0,0.15)", 
                            md: "0 25px 60px rgba(0,0,0,0.2)" 
                          },
                          borderColor: milestone.color,
                        },
                      }}
                    >
                      <Box sx={{ position: "relative", overflow: "hidden" }}>
                        <CardMedia
                          height={isSmallScreen ? "150" : "200"}
                          alt={milestone.title}
                          className="card-media"
                          sx={{
                            objectFit: "cover",
                            transition: "transform 0.4s ease",
                            backgroundColor: `${milestone.color}10`,
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            top: { xs: 8, md: 16 },
                            right: { xs: 8, md: 16 },
                            backgroundColor: milestone.color,
                            color: "white",
                            borderRadius: "50%",
                            width: { xs: 36, md: 48 },
                            height: { xs: 36, md: 48 },
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            fontSize: { xs: "1rem", md: "1.2rem" },
                          }}
                        >
                          {index + 1}
                        </Box>
                      </Box>
                      <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                        <Typography
                          variant="h4"
                          gutterBottom
                          sx={{
                            fontWeight: 800,
                            color: "#1e293b",
                            mb: { xs: 1, md: 2 },
                            fontSize: { 
                              xs: "1.1rem", 
                              sm: "1.3rem", 
                              md: "1.5rem" 
                            },
                          }}
                        >
                          {milestone.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            lineHeight: 1.7,
                            mb: { xs: 2, md: 4 },
                            color: "#64748b",
                            fontSize: { xs: "0.9rem", md: "1rem" },
                          }}
                        >
                          {milestone.description}
                        </Typography>
                        
                        {isMobile && (
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: 700,
                              color: milestone.color,
                              fontSize: "0.9rem",
                            }}
                          >
                            {milestone.impact}
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Box sx={{ 
              position: { xs: 'static', lg: 'sticky' }, 
              top: { lg: 120 },
              mt: { xs: 4, lg: 0 }
            }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, sm: 4, md: 5 },
                  borderRadius: { xs: 3, md: 4 },
                  background:
                    "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                  border: "1px solid #cbd5e1",
                  mb: { xs: 3, md: 5 },
                }}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ 
                    fontWeight: 800, 
                    color: "#1e293b", 
                    mb: { xs: 2, md: 4 },
                    fontSize: { xs: "1.3rem", sm: "1.5rem", md: "2rem" },
                    textAlign: { xs: 'center', md: 'left' }
                  }}
                >
                  Quick Navigation
                </Typography>
                {journeyMilestones.map((milestone, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: { xs: 2, md: 3 },
                      mb: 2,
                      borderRadius: 3,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      "&:hover": {
                        backgroundColor: `${milestone.color}10`,
                        borderColor: milestone.color,
                        transform: { xs: "scale(1.02)", md: "translateX(8px)" },
                        "& .nav-avatar": {
                          transform: "scale(1.2)",
                        },
                      },
                    }}
                  >
                    <Avatar
                      className="nav-avatar"
                      sx={{
                        width: { xs: 12, md: 16 },
                        height: { xs: 12, md: 16 },
                        backgroundColor: milestone.color,
                        mr: { xs: 2, md: 3 },
                        transition: "transform 0.3s ease",
                      }}
                    />
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{ 
                          fontWeight: 700, 
                          color: "#1e293b",
                          fontSize: { xs: "0.9rem", md: "1rem" }
                        }}
                      >
                        {milestone.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: "#64748b",
                          fontSize: { xs: "0.8rem", md: "0.875rem" }
                        }}
                      >
                        {milestone.date}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, sm: 4, md: 5 },
                  borderRadius: { xs: 3, md: 4 },
                  background:
                    "linear-gradient(135deg, #fef7ff 0%, #f3e8ff 100%)",
                  border: "1px solid #e9d5ff",
                }}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ 
                    fontWeight: 800, 
                    color: "#1e293b", 
                    mb: { xs: 2, md: 4 },
                    fontSize: { xs: "1.3rem", sm: "1.5rem", md: "2rem" },
                    textAlign: { xs: 'center', md: 'left' }
                  }}
                >
                  Why Choose BellaViu?
                </Typography>
                {benefits.map((benefit, index) => (
                  <Box key={index} sx={{ mb: { xs: 3, md: 4 } }}>
                    <Box sx={{ 
                      display: "flex", 
                      alignItems: "center", 
                      mb: { xs: 1, md: 2 },
                      flexDirection: { xs: 'column', sm: 'row' },
                      textAlign: { xs: 'center', sm: 'left' }
                    }}>
                      <Avatar
                        sx={{
                          backgroundColor: "transparent",
                          mr: { xs: 0, sm: 2 },
                          mb: { xs: 1, sm: 0 },
                          width: { xs: 28, md: 32 },
                          height: { xs: 28, md: 32 },
                        }}
                      >
                        {benefit.icon}
                      </Avatar>
                      <Typography
                        variant="h6"
                        sx={{ 
                          fontWeight: 700, 
                          color: "#1e293b",
                          fontSize: { xs: "1rem", md: "1.25rem" }
                        }}
                      >
                        {benefit.title}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ 
                        color: "#64748b", 
                        lineHeight: 1.6, 
                        ml: { xs: 0, sm: 6 },
                        fontSize: { xs: "0.85rem", md: "0.875rem" },
                        textAlign: { xs: 'center', sm: 'left' }
                      }}
                    >
                      {benefit.description}
                    </Typography>
                  </Box>
                ))}
              </Paper>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: { xs: 6, md: 12 },
            background:
              "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
            color: "white",
            borderRadius: { xs: 4, md: 6 },
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              width: { xs: "100%", md: "60%" },
              height: "100%",
              background: "url(/blogs.jpeg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: { xs: 0.08, md: 0.15 },
            }}
          />
          <Box
            sx={{ 
              position: "relative", 
              zIndex: 1, 
              p: { xs: 4, sm: 6, md: 10 }, 
              textAlign: "center" 
            }}
          >
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                fontWeight: 900,
                mb: { xs: 2, md: 4 },
                fontSize: { 
                  xs: "1.8rem", 
                  sm: "2.5rem", 
                  md: "3rem", 
                  lg: "4rem" 
                },
              }}
            >
              Ready to Begin Your Journey?
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: { xs: 4, md: 6 },
                maxWidth: { xs: '100%', md: 700 },
                mx: "auto",
                lineHeight: 1.6,
                opacity: 0.9,
                fontWeight: 400,
                fontSize: { 
                  xs: "1rem", 
                  sm: "1.2rem", 
                  md: "1.5rem" 
                },
              }}
            >
              Join thousands of satisfied guests who have discovered the perfect
              blend of luxury, comfort, and authentic Dubai hospitality with
              BellaViu Holiday Homes.
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: { xs: 2, md: 4 },
                justifyContent: "center",
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
              }}
            >
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                sx={{
                  backgroundColor: "white",
                  color: "#0f172a",
                  px: { xs: 4, md: 6 },
                  py: { xs: 1.5, md: 2 },
                  borderRadius: 4,
                  fontWeight: 800,
                  textTransform: "none",
                  fontSize: { xs: "1rem", md: "1.2rem" },
                  width: { xs: '100%', sm: 'auto' },
                  maxWidth: { xs: 280, sm: 'none' },
                  "&:hover": {
                    backgroundColor: "#f8fafc",
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 30px rgba(255,255,255,0.3)",
                  },
                }}
              >
                Start Your Booking
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "rgba(255,255,255,0.3)",
                  color: "white",
                  px: { xs: 4, md: 6 },
                  py: { xs: 1.5, md: 2 },
                  borderRadius: 4,
                  fontWeight: 700,
                  textTransform: "none",
                  fontSize: { xs: "1rem", md: "1.2rem" },
                  width: { xs: '100%', sm: 'auto' },
                  maxWidth: { xs: 280, sm: 'none' },
                  "&:hover": {
                    borderColor: "white",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    transform: "translateY(-4px)",
                  },
                }}
              >
                View Properties
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Page;