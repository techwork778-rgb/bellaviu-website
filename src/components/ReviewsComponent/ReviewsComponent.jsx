import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import {
  Box,
  Typography,
  Rating,
  LinearProgress,
  Button,
  ButtonGroup,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

const ReviewsComponent = () => {
  const reviews = [
    {
      rating: 5,
      heading: "Excellent",
      date: "07 Jun 2023",
      comment:
        "This hotel is a little gem! Best hotel in this price range i have ever stayed in.Wished i could have stayed longer. Will hopefully be back next year.",
    },
    {
      rating: 5,
      heading: "Very Good",
      date: "11 Jul 2023",
      comment: "Great customer service",
    },
    {
      rating: 4,
      heading: "Good",
      date: "24 Apr 2024",
      comment: "Very Good Theme",
    },
  ];

  const ratingCounts = {
    5: 2,
    4: 1,
    3: 0,
    2: 0,
    1: 0,
  };

  const averageRating = 4.67;
  const totalReviews = 3;

  return (
    <Box p={3}>
      <Row>
        {/* Left side - Overall Rating */}
        <Col md={6}>
          <Typography
            variant="h4"
            component="div"
            style={{ color: "#475569", fontWeight: "bold" }}
          >
            {averageRating}/5
          </Typography>
          <Box display="flex" alignItems="center" mb={1}>
            <Rating value={averageRating} precision={0.1} readOnly />
          </Box>
          <Typography variant="body2" color="text.secondary">
            {totalReviews} Reviews
          </Typography>
        </Col>

        {/* Middle - Rating Bars */}
        <Col md={6}>
          {[5, 4, 3, 4, 1].map((star) => (
            <Box key={star} display="flex" alignItems="center" mb={1}>
              <Typography variant="body2" style={{ minWidth: "60px" }}>
                {star} stars
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(ratingCounts[star] / totalReviews) * 100}
                color="warning"
                style={{
                  flexGrow: 1,
                  marginLeft: "8px",
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#E2E8F0",
                  color:'#E2B5B0 !important'
                }}
              />
              <Typography
                variant="body2"
                style={{ marginLeft: "8px", minWidth: "30px" }}
              >
                {ratingCounts[star]}
              </Typography>
            </Box>
          ))}
        </Col>
      </Row>
      <Row>
        <Col md={12} className="d-flex justify-content-start align-items-start">
          <ButtonGroup>
            <Button variant="contained" style={{ backgroundColor: "#E2B5B0" }}>
              All
            </Button>
            <Button
              variant="outlined"
              style={{ borderColor: "#E2B5B0", color: "#E2B5B0" }}
            >
              With Photos Only
            </Button>
          </ButtonGroup>

          <FormControl
            size="small"
            style={{ marginLeft: "16px", minWidth: 120 }}
          >
            <Select
              defaultValue="oldest"
              style={{ backgroundColor: "#F8FAFC" }}
            >
              <MenuItem value="oldest">Oldest</MenuItem>
              <MenuItem value="newest">Newest</MenuItem>
              <MenuItem value="highest">Highest Rated</MenuItem>
              <MenuItem value="lowest">Lowest Rated</MenuItem>
            </Select>
          </FormControl>
        </Col>
      </Row>

      {/* Reviews List */}
      <Box mt={4}>
        {reviews.map((review, index) => (
          <Card
            key={index}
            className="mb-3"
            style={{ backgroundColor: "#F8FAFC" }}
          >
            <Card.Body>
              <Rating value={review.rating} readOnly />
              <h3>{review.heading}</h3>
              <Typography variant="body2" color="text.secondary" mt={1}>
                {review.date}
              </Typography>
              <Typography variant="body1" mt={2}>
                {review.comment}
              </Typography>
            </Card.Body>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ReviewsComponent;
