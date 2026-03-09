


// import React from "react";
// import { Card, CardContent, Typography } from "@mui/material";
// import CountUp from "react-countup";
// import { useInView } from 'react-intersection-observer';

// const SailingCard = ({ title, description }) => {
//   // Intersection Observer Hook
//   const { ref, inView } = useInView({
//     triggerOnce: true,  // Trigger only once when the card comes into view
//     threshold: 0.5,     // When 50% of the card is in view, trigger the count-up
//   });

//   return (
//     <Card
//       ref={ref}
//       sx={{
//         textAlign: "center",
//         p: 4,
//         boxShadow: "none",
//         backgroundColor: "#F9F9F9",
//         fontFamily: '"Urbanist", sans-serif',
//       }}
//     >
//       <CardContent>
//         <Typography
//           variant="h3"
//           style={{
//             color: "#9c6c69",
//             fontFamily: '"Urbanist", sans-serif',
//           }}
//         >
//           {inView ? (
//             <CountUp
//               start={0} // Start from 0
//               end={parseInt(title.replace(/\D/g, ''))} // Extract number from string like "50+"
//               duration={4} // Duration of the count-up animation
//               separator=","
//               suffix={title.replace(/[0-9]/g, '')} // Add the suffix (like "+" in "50+")
//             />
//           ) : (
//             title
//           )}
//         </Typography>
//         <Typography variant="body1" sx={{ fontFamily: '"Urbanist", sans-serif' }}>
//           {description}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default SailingCard;

import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const SailingCard = ({ title, description, isRating }) => {
  // Intersection Observer Hook
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger only once when the card comes into view
    threshold: 0.5, // When 50% of the card is in view, trigger the count-up
  });

  return (
    <Card
      ref={ref}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
        p: 4,
        boxShadow: "none",
        backgroundColor: "#F9F9F9",
        fontFamily: '"Urbanist", sans-serif',
        height: "100%", // Ensures equal height
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80px", // Ensures consistent height for the heading
          }}
        >
          {isRating ? (
            Array(5)
              .fill(0)
              .map((_, idx) => (
                <StarIcon
                  key={idx}
                  sx={{
                    color: "#FFD700", // Golden star color
                    fontSize: "2rem", // Adjust size
                  }}
                />
              ))
          ) : inView ? (
            <Typography
              variant="h3"
              sx={{
                color: "#9c6c69",
                fontFamily: '"Urbanist", sans-serif',
              }}
            >
              <CountUp
                start={0}
                end={parseInt(title.replace(/\D/g, ""))} // Extract number
                duration={4}
                separator=","
                suffix={title.replace(/[0-9]/g, "")} // Add the suffix (e.g., "+")
              />
            </Typography>
          ) : (
            <Typography
              variant="h3"
              sx={{
                color: "#9c6c69",
                fontFamily: '"Urbanist", sans-serif',
              }}
            >
              {title}
            </Typography>
          )}
        </Box>
        <Typography variant="body1" sx={{ fontFamily: '"Urbanist", sans-serif', mt: 1 }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SailingCard;
