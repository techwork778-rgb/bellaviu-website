
import { Card, CardContent, Typography, CardMedia, Box } from '@mui/material';

const CardComponent = ({ title, description, imageUrl, listings }) => {
  return (
    <Card sx={{ position: 'relative', width: '100%', height: '300px', overflow: 'hidden', borderRadius: '15px' }}>
      {/* Image as background, full width and height */}
      <CardMedia
        component="img"
        alt={title}
        image={imageUrl}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Overlay on the image */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent black overlay
          zIndex: 1, // Ensures the overlay is above the image
        }}
      />

      {/* Top Text Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          right: '10px',
          color: 'white',
          padding: '10px',
          borderRadius: '10px',
          zIndex: 100, // Ensures the text is above the overlay
        }}
      >
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </Box>

      {/* Bottom Text Overlay */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          right: '10px',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          zIndex: 100, // Ensures the text is above the overlay
        }}
      >
        <Typography variant="body2" >
          {description}
        </Typography>
        <Typography variant="body2" >
          {listings} Listings
        </Typography>
      </Box>

      {/* Card Content Below the Image */}
      <CardContent sx={{ backgroundColor: 'white', padding: '16px' }}>
        {/* Additional content can go here */}
      </CardContent>
    </Card>
  );
};

export default CardComponent;
// import { Card, CardContent, Typography, CardMedia, Box } from '@mui/material';
// import './CardComponent.css'; 


// const CardComponent = ({ title, description, imageUrl, listings }) => {
//   return (
//     <Card className="card-container">
//       {/* Image as background, full width and height */}
//       <CardMedia
//         component="img"
//         alt={title}
//         image={imageUrl}
//         className="card-media"
//       />

//       {/* Overlay on the image */}
//       <Box className="card-overlay" />

//       {/* Top Text Overlay */}
//       <Box className="card-text-top">
//         <Typography variant="h6" component="div">
//           {title}
//         </Typography>
//       </Box>

//       {/* Bottom Text Overlay */}
//       <Box className="card-text-bottom">
//         <Typography variant="body2" color="text.secondary">
//           {description}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {listings} Listings
//         </Typography>
//       </Box>

//       {/* Card Content Below the Image */}
//       <CardContent className="card-content">
//         {/* Additional content can go here */}
//       </CardContent>
//     </Card>
//   );
// };

// export default CardComponent;
