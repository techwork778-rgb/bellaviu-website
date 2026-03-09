"use client";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, Rating } from "@mui/material";
import { Bed, Home, Person } from "@mui/icons-material";
import Link from "next/link";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Heart } from "lucide-react";

export default function VerticalHotelCard({ hotel }) {
  const theme = useTheme();
  const [hoverLikeBtn, setHoverLikeBtn] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isWishlisted, setIsWishlisted] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isHotelInWishlist = wishlist.some((item) => item.id === hotel.id);

    let updatedWishlist;
    if (isHotelInWishlist) {
      // Remove hotel from wishlist if already present
      updatedWishlist = wishlist.filter((item) => item.id !== hotel.id);
      setIsWishlisted(false);
    } else {
      // Add hotel to wishlist if not present
      updatedWishlist = [...wishlist, hotel];
      setIsWishlisted(true);
    }

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    alert(isHotelInWishlist ? "Removed from wishlist" : "Added to wishlist");
  };

  const value = Number(hotel.rating);

  return (
    <Card sx={{ display: "flex", borderRadius: "18px", position: "relative", flexDirection: { xs: "column", md: "row", lg: "row" } }} >
      <div
        onClick={handleWishlist}
        onMouseOver={() => setHoverLikeBtn(true)}
        onMouseLeave={() => setHoverLikeBtn(false)}
        style={{
          position: "absolute", // Position it absolutely within the card
          top: "8px", // 8px from the top
          left: "8px", // 8px from the right
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%", // Circular button
          padding: "6px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Optional shadow
          cursor: "pointer",
          zIndex: 1, // Ensure it stays above other elements
        }}
      >
        {isWishlisted || hoverLikeBtn ? (
          <FavoriteIcon
            style={{ width: "20px", height: "20px", color: "#E2B5B0" }}
          />
        ) : (
          <Heart size={20} color="#E2B5B0" />
        )}
      </div>
      <CardMedia
        component="img"
        sx={{
          width: {
            xs: "auto",
            md: "280px",
            lg: "280ppx",
          }
        }}
        image={hotel.imageUrl || "/placeholder.jpg"}
        alt="Live from space album cover"
      />
      <CardContent
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#F2F4F4",
        }}
      >
        <div>
          <Typography
            gutterBottom
            fontWeight="bold"
            className="hotel-name"
            title={hotel.name}
          >
            {hotel.name}
          </Typography>
          <div>
            <div className="widget-item">
              <Rating name="read-only" value={value} size="small" readOnly />
              <Typography variant="body2" className="text">
                ({hotel.reviews} Reviews)
              </Typography>
            </div>
            <div className="widget-item">
              <Home size={18} className="icon" />
              <Typography variant="body2" className="text">
                Room Size: {hotel.roomSize}
              </Typography>
            </div>
            <div className="widget-item">
              <Bed size={18} className="icon" />
              <Typography variant="body2" className="text">
                Bed: {hotel.bed}
              </Typography>
            </div>
            <div className="widget-item">
              <Person size={18} className="icon" />
              <Typography variant="body2" className="text">
                Max Occupancy: {hotel.maxOccupancy}
              </Typography>
            </div>
          </div>
        </div>
        <div>
          {hotel.price && (
            <Typography
              variant="body2"
              color="text.secondary"
              className="hotel-price"
            >
              <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                {hotel.price}
              </span>
              / Night
            </Typography>
          )}
          <Link href={`/hotel-details`} passHref>
            <Button size="small" variant="text" style={{ color: "#E2B5B0" }}>
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
