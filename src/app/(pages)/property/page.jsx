"use client";

import { Typography, Grid, Box,Button } from '@mui/material';
import CardComponent from "@/components/CardComponent/CardComponent";
import "./property.css";
import { useState } from 'react';

export default function Page() {
    

    const [showAll, setShowAll] = useState(false);

    const handleShowMore = () => {
        setShowAll(true);
      };

    const AreasinFujairah = [
        {
          title: "Dubai Marina",
          description: "Furnished Apartments",
          imageUrl: "/DubaiMarina.jpg",
          listings: 10,
        },
        {
          title: "Fujairah",
          description: "Furnished Apartments",
          imageUrl: "https://www.deluxehomes.com/wp-content/uploads/2024/06/Sharm-Fujairah.webp",
          listings: 3,
        },
      ];

      const AreasinDubai = [
        {
          title: "Dubai Marina",
          description: "Furnished Apartments",
          imageUrl: "/DubaiMarina.jpg",
          listings: 10,
        },
        {
          title: "Palm Jumeirah",
          description: "Furnished Apartments",
          imageUrl: "/palmjumeirah.jpg",
          listings: 8,
        },
        {
          title: "Dubai Marina",
          description: "Furnished Apartments",
          imageUrl: "/JumeirahBeachResidence.jpg",
          listings: 12,
        },
        {
          title: "Business Bay",
          description: "Furnished Apartments",
          imageUrl: "/BusinessBay.jpg",
          listings: 15,
        },
        {
          title: "Bluewaters Island",
          description: "Furnished Apartments",
          imageUrl: "/Bluewaters-Island.jpg",
          listings: 5,
        },
        {
          title: "Downtown Burj Khalifa",
          description: "Furnished Apartments",
          imageUrl: "/downtowndubai.jpg",
          listings: 20,
        },
        {
          title: "DIFC (Dubai International Financial Centre)",
          description: "Furnished Apartments",
          imageUrl: "DIFC.jpg",
          listings: 18,
        },
      
      ];
      
  return (
    <div>
      {/* Banner Section */}
      <div className="container-fluid">
        <div className="overlay">
          <div className="textWrapper">
            <Typography className="heading">
              Browse properties for rent all over <span className='Dubai-span'> Dubai</span> by area
            </Typography>
            <Typography className="subheading">
              Find furnished apartments for rent in Dubai Marina, Palm Jumeirah, Jumeirah Lake Towers, Jumeirah Beach Residence, Tecom (Barsha Heights), Al Barsha, Business Bay, Bluewaters Island, DIFC, Downtown Burj Khalifa, and many other locations.
            </Typography>
          </div>
          
        </div>
      </div>

    {/* ==========================Areas in Dubai================= */}
    <Box className="container my-5">
      <Typography variant="h4" component="h2" className='Fujaira-title'>
        Areas in Dubai
      </Typography>

      {/* Grid Layout for Cards */}
      <Grid container spacing={3} sx={{ marginTop: 1 }}>
        {AreasinDubai.slice(0, showAll ? AreasinDubai.length : 3).map((area, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CardComponent
              title={area.title}
              description={area.description}
              imageUrl={area.imageUrl}
              listings={area.listings}
            />
          </Grid>
        ))}
      </Grid>
     {/* Button to Show More - Centered */}
     {!showAll && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
          <Button 
            className="seeMore-btn"
            variant="contained" 
            color="primary" 
            onClick={handleShowMore}
          >
            See More
          </Button>
        </Box>
      )}

    </Box>
    </div>
  );
}
