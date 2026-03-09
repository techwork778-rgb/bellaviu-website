import React, { useState } from "react";
import {
  Slider,
  Checkbox,
  FormControlLabel,
  Typography,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

function Filter({ filters, setFilters }) {
  // Handle price range filter
  const handlePriceChange = (_, newValue) => {
    setFilters((prev) => ({ ...prev, priceRange: newValue }));
  };

  // Handle star rating filter
  const handleStarRatingChange = (event, star) => {
    setFilters((prev) => ({
      ...prev,
      starRatings: event.target.checked
        ? [...prev.starRatings, star]
        : prev.starRatings.filter((rating) => rating !== star),
    }));
  };

  // Handle sorting change
  const handleSortingChange = (event) => {
    setFilters((prev) => ({ ...prev, sortBy: event.target.value }));
  };

  return (
    <div className="filter-container">
      <Typography variant="h6">Price</Typography>
      <Slider
        value={filters.priceRange}
        onChange={handlePriceChange}
        min={5}
        max={1000}
        valueLabelDisplay="auto"
        marks={[
          { value: 5, label: "$5" },
          { value: 1000, label: "$1000" },
        ]}
      />

      <Typography variant="h6">Star Rating</Typography>
      {[1, 2, 3, 4, 5].map((star) => (
        <FormControlLabel
          key={star}
          control={
            <Checkbox
              checked={filters.starRatings.includes(star)}
              onChange={(e) => handleStarRatingChange(e, star)}
            />
          }
          label={`${star} star`}
        />
      ))}

      <Typography variant="h6">Sort By</Typography>
      <Select value={filters.sortBy} onChange={handleSortingChange}>
        <MenuItem value="newest">Newest</MenuItem>
        <MenuItem value="oldest">Oldest</MenuItem>
        <MenuItem value="a-z">A to Z</MenuItem>
        <MenuItem value="z-a">Z to A</MenuItem>
      </Select>

      <Button variant="contained" onClick={() => setFilters({})}>
        Clear Filter
      </Button>
    </div>
  );
}

export default Filter;
