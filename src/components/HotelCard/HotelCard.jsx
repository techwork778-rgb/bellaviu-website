"use client";
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider, Rating } from "@mui/material";
import { Bed, Home, User, Heart } from "lucide-react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./HotelCard.css";
import Link from "next/link";
import { convertPrice, useCurrency } from "@/context/CurrencyContext";

function HotelCard({ hotel }) {
  const { exchangeRate, currencySymbol } = useCurrency();

  const [hoverLikeBtn, setHoverLikeBtn] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const value = Number(hotel?.rating || 0);

  // Check if the hotel is already in the wishlist
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isHotelInWishlist = wishlist.some(item => item.id === hotel?.id);
    setIsWishlisted(isHotelInWishlist);
  }, [hotel?.id]);

  const handleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isHotelInWishlist = wishlist.some(item => item.id === hotel.id);

    let updatedWishlist;
    if (isHotelInWishlist) {
      // Remove hotel from wishlist if already present
      updatedWishlist = wishlist.filter(item => item.id !== hotel.id);
      setIsWishlisted(false);
    } else {
      // Add hotel to wishlist if not present
      updatedWishlist = [...wishlist, hotel];
      setIsWishlisted(true);
    }

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    alert(isHotelInWishlist ? "Removed from wishlist" : "Added to wishlist");
  };


  const originalPrice = hotel?.price 
  ? typeof hotel.price === 'string' 
    ? Number(hotel.price.replace(/[^\d.-]/g, "")) 
    : hotel.price
  : 1;


  return (
    <Card className="card-container-main" component={Link} href={`/hotel-details/${hotel?.id || 1}`}>
      <div className="image-wrapper">
        <CardMedia
          className="card-media"
          component="img"
          height="200"
          image={hotel?.imageUrl || "/placeholder.jpg"} // Provide a fallback image
          alt={hotel?.name}
          loading="lazy"
        />
      </div>

      {/* Card Content */}
      <CardContent>
        <Typography
          gutterBottom
          fontWeight="bold"
          className="hotel-name"
          title={hotel?.name}
        >
          {hotel?.name}
        </Typography>

        {/* Details */}
        <div>
          <div className="widget-item justify-content-between">
            <Rating name="read-only" value={value} size="small" readOnly />
            <Typography variant="body2" className="text">
              ({hotel?.reviews} Reviews)
            </Typography>
          </div>
          <div className="widget-item">
            <Bed size={18} className="icon-card" />
            <Typography variant="body2" className="text">
              Bed: {hotel?.bed}
            </Typography>
          </div>
          <div className="widget-item mb-0">
            <User size={18} className="icon-card" />
            <Typography variant="body2" className="text">
              Max Occupancy: {hotel?.maxOccupancy}
            </Typography>
          </div>
        </div>
      </CardContent>

      {/* Divider */}
      <Divider width="90%" style={{ margin: "0 auto" }} />

      {/* Card Actions */}
      <CardActions className="card-actions justify-content-between">
        <h4 className="pricing">{currencySymbol + " " + convertPrice(originalPrice, exchangeRate)} <span>/night</span></h4>
      </CardActions>
    </Card>
  );
}

export default HotelCard;
// "use client";
// import React, { useState, useEffect } from "react";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import { Divider, Rating } from "@mui/material";
// import { Bed, Home, User, Heart } from "lucide-react";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import "./HotelCard.css";
// import Link from "next/link";
// import { convertPrice, useCurrency } from "@/context/CurrencyContext";

// function HotelCard({ hotel }) {
//   const { exchangeRate, currencySymbol } = useCurrency();

//   const [hoverLikeBtn, setHoverLikeBtn] = useState(false);
//   const [isWishlisted, setIsWishlisted] = useState(false);

//   const value = Number(hotel?.rating || 4);

//   // Check if the hotel is already in the wishlist
//   useEffect(() => {
//     const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
//     const isHotelInWishlist = wishlist.some(item => item.id === hotel?.id);
//     setIsWishlisted(isHotelInWishlist);
//   }, [hotel?.id]);

//   const handleWishlist = () => {
//     const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
//     const isHotelInWishlist = wishlist.some(item => item.id === hotel.id);

//     let updatedWishlist;
//     if (isHotelInWishlist) {
//       // Remove hotel from wishlist if already present
//       updatedWishlist = wishlist.filter(item => item.id !== hotel.id);
//       setIsWishlisted(false);
//     } else {
//       // Add hotel to wishlist if not present
//       updatedWishlist = [...wishlist, hotel];
//       setIsWishlisted(true);
//     }

//     localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
//     alert(isHotelInWishlist ? "Removed from wishlist" : "Added to wishlist");
//   };

//   const originalPrice = hotel?.basic_price 
//   ? typeof hotel.basic_price === 'string' 
//     ? Number(hotel.basic_price.replace(/[^\d.-]/g, "")) 
//     : hotel.basic_price
//   : 1;

//   return (
//     <Card className="card-container-main" component={Link} href={`/hotel-details/${hotel?.id}`}>
//       <div className="image-wrapper">
//         <CardMedia
//           className="card-media"
//           component="img"
//           height="200"
//           image={hotel?.imageUrl || "/footerimages.jpg"} // Provide a fallback image
//           alt={hotel?.title}
//           loading="lazy"
//         />
//       </div>

//       {/* Card Content */}
//       <CardContent>
//         <Typography
//           gutterBottom
//           fontWeight="bold"
//           className="hotel-name"
//           title={hotel?.title}
//         >
//           {hotel?.title}
//         </Typography>

//         {/* Details */}
//         <div>
//           <div className="widget-item justify-content-between">
//             <Rating name="read-only" value={value} size="small" readOnly />
//             <Typography variant="body2" className="text">
//               ({hotel?.reviews || 4} Reviews)
//             </Typography>
//           </div>
//           <div className="widget-item">
//             <Home size={18} className="icon-card" />
//             <Typography variant="body2" className="text">
//             Property Type: {hotel?.property_type?.name || "Not available"}
//             </Typography>
//           </div>
//           <div className="widget-item">
//             <Bed size={18} className="icon-card" />
//             <Typography variant="body2" className="text">
//               Bed: {hotel?.bedrooms}
//             </Typography>
//           </div>
//           <div className="widget-item mb-0">
//             <User size={18} className="icon-card" />
//             <Typography variant="body2" className="text">
//               Max Occupancy: {hotel?.max_guests}
//             </Typography>
//           </div>
//         </div>
//       </CardContent>

//       {/* Divider */}
//       <Divider width="90%" style={{ margin: "0 auto" }} />

//       {/* Card Actions */}
//       <CardActions className="card-actions justify-content-between">
//         <h4 className="pricing">{currencySymbol + " " + convertPrice(originalPrice, exchangeRate)} <span>/night</span></h4>
//       </CardActions>
//     </Card>
//   );
// }

// export default HotelCard;
