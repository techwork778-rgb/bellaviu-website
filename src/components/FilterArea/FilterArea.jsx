// "use client";
// import React, { useState } from "react";
// import {
//   Box,
//   Container,
//   Typography, Menu, MenuItem, Checkbox, ListItemText, Slider, TextField, Button, Grid, IconButton
// } from "@mui/material";
// import { Row, Col } from "react-bootstrap";
// import { DummyHotelsArr, DummyServicesArr } from "@/utility/utility";
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import "./FilterArea.css";
// import HotelCard from "@/components/HotelCard/HotelCard";
// import ControlPointIcon from '@mui/icons-material/ControlPoint';
// import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
// import Divider from '@mui/material/Divider';

// export default function FilterArea() {

//     const [anchorCity, setAnchorCity] = useState(null);
//     const [selectedCity, setSelectedCity] = useState(null); // Store the selected city (single city)
//     const [selectedArea, setSelectedArea] = useState(null);
//     const [anchorArea, setAnchorArea] = useState(null);
//     const [anchorPrice, setAnchorPrice] = useState(null); // For opening/closing the dropdown
//     const [priceRange, setPriceRange] = useState([100, 1000]); // Store the price range [min, max]
//     const [anchorBedroom, setAnchorBedroom] = useState(null); // For opening/closing the dropdown
//     const [selectedBedrooms, setSelectedBedrooms] = useState([]);
//     const [anchorBathroom, setAnchorBathroom] = useState(null); // For opening/closing the dropdown
//     const [selectedBathrooms, setSelectedBathrooms] = useState([]); // Store selected bathroom options
//     const [guests, setGuests] = useState(1);
//     const [anchorGuest, setAnchorGuest] = useState(null);
//     const [anchorAmenities, setAnchorAmenities] = useState(null); // For opening/closing the dropdown
//     const [selectedAmenities, setSelectedAmenities] = useState([]); // Store selected amenities

//     const amenitiesOptions = [
//       "Air Conditioner", "Allocated Parking", "Balcony/Terrace", "Cable Channels",
//       "Central Cooling", "City view", "Close to Beach", "Close to Bus Station",
//       "Close to Mall", "Close to Taxis", "Coffee machine", "Dining area", "Dining table",
//       "Dishwasher", "Electric kettle", "Elevator in Building", "Family/Kid Friendly",
//       "Kid's Play Area", "Kitchen", "Kitchenware", "Microwave", "Non Smoking",
//       "Refrigerator", "Safebox", "Shared Gym", "Shared Pool", "Stovetop", "Toaster",
//       "Towels", "TV", "Washing Machine", "Water View", "Wireless Internet"
//     ];

//     // Handle dropdown opening
//     const handleClickAmenities = (event) => {
//       setAnchorAmenities(event.currentTarget);
//     };

//     // Handle dropdown closing
//     const handleCloseAmenities = () => {
//       setAnchorAmenities(null);
//     };

//     // Handle checkbox toggle for amenities
//     const handleToggleAmenities = (amenity) => {
//       setSelectedAmenities((prev) =>
//         prev.includes(amenity)
//           ? prev.filter((item) => item !== amenity)
//           : [...prev, amenity]
//       );
//     };

//     // Clear all selected amenities
//     const handleClearAmenities = () => {
//       setSelectedAmenities([]);
//     };

//     // Apply selected amenities
//     const handleApplyAmenities = () => {
//      // alert(`Selected Amenities: ${selectedAmenities.join(", ")}`);
//       handleCloseAmenities(); // Close the dropdown
//     };
//     const handleDecrement = () => {
//       if (guests > 1) {
//         setGuests(guests - 1);
//       }
//     };

//     const handleIncrement = () => {
//       setGuests(guests + 1);
//     };

//     const handleClearGuest = () => {
//       setGuests(1);
//     };

//     const handleApplyGuest = () => {
//       // Implement your apply logic here
//       console.log('Applied guests:', guests);
//       handleCloseGuest();
//     };

//     const handleClickGuest = (event) => {
//       setAnchorGuest(event.currentTarget);
//     };

//     const handleCloseGuest = () => {
//       setAnchorGuest(null);
//     };
//     const areas = [
//       "Dubai Maritime City",
//   "Mina Rashid",
//   "Sheikh Zayed Road",
//   "Dubai Health Care City",
//   "Jumeirah Golf Estates",
//   "Sobha Hartland 2",
//   "Dubai International City",
//   "City Walk",
//   "Dubai Design District (D3)",
//   "Madinat Jumeirah Living",
//   "Dubai Science Park",
//   "Fujairah",
//   "Dubai Motor City",
//   "DIFC",
//   "Meydan City",
//   "Al Habtoor City",
//   "Dubai Water Canal",
//   "Bluewaters Island",
//   "Dubai Investment Park",
//   "Al Marjan Island",
//   "Ajmanmkar"
//     ];
//     const bedroomOptions = [
//       "1 BD Apartments",
//       "2 BD Apartments",
//       "3 BD Apartments",
//       "3+ BD Villas",
//       "4 BD Apartments",
//       "4+ BD Villas",
//       "Studio"
//     ];

//     const handleClickCity = (event) => {
//       setAnchorCity(event.currentTarget);
//     };

//     // Handle the closing of the dropdown
//     const handleCloseCity = () => {
//       setAnchorCity(null);
//     };

//     // Handle checkbox toggle for cities (only one city at a time)
//     const handleToggleCity = (city) => {
//       setSelectedCity(city); // Set the selected city, replacing the previous one
//       // handleClose(); // Close the dropdown after selection
//     };
//     const handleClickArea = (event) => {
//       setAnchorArea(event.currentTarget);
//     };

//     // Handle the closing of the dropdown
//     const handleCloseArea = () => {
//       setAnchorArea(null);
//     };
//     const handleToggleArea = (area) => {
//       setSelectedArea(area); // Set the selected area, replacing any previous selection
//     };
//     const handleClickPrice = (event) => {
//       setAnchorPrice(event.currentTarget);
//     };

//     // Handle the closing of the dropdown
//     const handleClosePrice = () => {
//       setAnchorPrice(null);
//     };

//     // Handle slider change (price range)
//     const handleSliderChange = (event, newValue) => {
//       setPriceRange(newValue);
//     };

//     // Handle input change for 'from' and 'to' values
//     const handleInputChange = (e) => {
//       const { name, value } = e.target;
//       const newValue = value ? parseInt(value, 10) : '';

//       if (name === 'from') {
//         setPriceRange([newValue, priceRange[1]]);
//       } else {
//         setPriceRange([priceRange[0], newValue]);
//       }
//     };

//     // Clear the price range input fields
//     const handleClearPrice = () => {
//       setPriceRange([100, 1000]); // Reset the price range fields
//     };

//     // Apply the selected price range (you can add logic here to apply the range)
//     const handleApplyPrice = () => {
//       // alert(`Price Range Applied: $${priceRange[0]} - $${priceRange[1]}`); // Handle the apply action here
//       handleClosePrice(); // Close the dropdown after applying
//     };
//     const handleClickBedroom = (event) => {
//       setAnchorBedroom(event.currentTarget);
//     };

//     // Handle the closing of the dropdown
//     const handleCloseBedroom = () => {
//       setAnchorBedroom(null);
//     };

//     // Handle checkbox toggle for bedroom options
//     const handleToggleBedroom = (bedroom) => {
//       setSelectedBedrooms((prev) =>
//         prev.includes(bedroom)
//           ? prev.filter((item) => item !== bedroom)
//           : [...prev, bedroom]
//       );
//     };

//     // Clear all selections
//     const handleClearBedroom = () => {
//       setSelectedBedrooms([]); // Reset the selected bedrooms
//     };

//     // Apply selected bedroom options
//     const handleApplyBedroom = () => {
//       //alert(`Selected Bedrooms: ${selectedBedrooms.join(", ")}`); // Handle the apply action
//       handleCloseBedroom(); // Close the dropdown after applying
//     };
//     const bathroomOptions = Array.from({ length: 14 }, (_, i) => `${i + 1} Bath${i + 1 > 1 ? 's' : ''}`);

//     // Handle the opening of the bathroom dropdown
//     const handleClickBathroom = (event) => {
//       setAnchorBathroom(event.currentTarget); // Open the dropdown
//     };

//     // Handle the closing of the dropdown
//     const handleCloseBathroom = () => {
//       setAnchorBathroom(null); // Close the dropdown
//     };

//     // Handle checkbox toggle for bathroom options
//     const handleToggleBathroom = (bathroom) => {
//       setSelectedBathrooms((prev) =>
//         prev.includes(bathroom)
//           ? prev.filter((item) => item !== bathroom)
//           : [...prev, bathroom]
//       );
//     };

//     // Clear all selections
//     const handleClearBathroom = () => {
//       setSelectedBathrooms([]); // Reset the selected bathrooms
//     };

//     // Apply selected bathroom options
//     const handleApplyBathroom = () => {
//      // alert(`Selected Bathrooms: ${selectedBathrooms.join(", ")}`); // Handle the apply action
//       handleCloseBathroom(); // Close the dropdown after applying
//     };

//   return (
//     <>
// <Container maxWidth="lg" sx={{ py: 6 }} className="listings-container">

// <h1 className="title">Listings in Palm Jumeirah</h1>

// <div className="button-row">
//   <button class="outline-button">Date<ArrowDropDownIcon /> </button>
//   <button class="outline-button" onClick={handleClickCity}>City <ArrowDropDownIcon /> </button>
//   <button class="outline-button " onClick={handleClickArea}>Area <ArrowDropDownIcon /> </button>
//   <button class="outline-button" onClick={handleClickPrice}>Price Range <ArrowDropDownIcon /> </button>
//   <button class="outline-button" onClick={handleClickBedroom}>Bedrooms <ArrowDropDownIcon /> </button>
//   <button class="outline-button" onClick={handleClickBathroom}>Bathrooms<ArrowDropDownIcon /> </button>
// </div>

// <div className="search-property">
//   <div className="button-row">
//     <button class="outline-button" onClick={handleClickAmenities}  >Amenities <ArrowDropDownIcon /> </button>
//     <button class="outline-button" onClick={handleClickGuest}>Guests <ArrowDropDownIcon /> </button>
//     <button class="search-button">Search</button>
//   </div>
//   <div class="archive-found-posts">
//     <span class="found-number">72</span> properties found
//   </div>

// </div>

// </Container>

// <Menu
//         anchorEl={anchorCity}
//         open={Boolean(anchorCity)}
//         onClose={handleCloseCity}
//         PaperProps={{
//           style: { width: 200 }, // Adjust the width of the dropdown
//         }}
//       >
//         {/* Loop over cities to create menu items */}
//         {['Dubai'].map((city) => (
//           <MenuItem key={city} onClick={() => handleToggleCity(city)}>
//             <Checkbox checked={selectedCity === city} /> {/* Only check if it's the selected city */}
//             <ListItemText primary={city} />
//           </MenuItem>
//         ))}
//       </Menu>
//       <Menu
//         anchorEl={anchorArea}
//         open={Boolean(anchorArea)}
//         onClose={handleCloseArea}
//         PaperProps={{
//           style: {
//             maxHeight: 320, // Set max height to show about 10 items
//             width: 200, // Set width of the dropdown
//             overflowY: 'auto', // Enable scrolling if there are more items than the visible area
//           }
//         }}
//       >
//         {/* Loop through the areas (U.S. states) */}
//         {areas.map((area) => (
//           <MenuItem key={area} onClick={() => handleToggleArea(area)}>
//             <Checkbox checked={selectedArea === area} /> {/* Only check if it's the selected area */}
//             <ListItemText primary={area} />
//           </MenuItem>
//         ))}
//       </Menu>

//       <Menu
//         anchorEl={anchorPrice}
//         open={Boolean(anchorPrice)}
//         onClose={handleClosePrice}
//         PaperProps={{
//           style: {
//             maxHeight: 320, // Limit dropdown height
//             width: 300,     // Set dropdown width
//             padding: '16px',
//           },
//         }}
//       >
//         <Box sx={{ width: '100%' }}>
//           {/* Header */}
//           <Typography
//             variant="subtitle1"
//             sx={{
//               fontWeight: 'bold',
//               marginBottom: 2,
//               textAlign: 'center',
//             }}
//           >
//             Price Range
//           </Typography>

//           {/* Slider for Price Range */}
//           <Slider
//             value={priceRange}
//             onChange={handleSliderChange}
//             valueLabelDisplay="auto"
//             valueLabelFormat={(value) => `$${value}`}
//             min={50}    // Minimum price
//             max={5000}  // Maximum price
//             step={50}   // Increment step
//             getAriaLabel={() => 'Price range'}
//             disableSwap
//             sx={{
//               color: 'primary.main',
//               mb: 2,
//             }}
//           />

//           {/* From and To Inputs */}
//           <Box sx={{ display: 'flex', gap: 1, marginBottom: 2 }}>
//             <TextField
//               label="From"
//               type="number"
//               name="from"
//               value={priceRange[0]}
//               onChange={handleInputChange}
//               size="small"
//               fullWidth
//               inputProps={{
//                 min: 50,
//                 max: 5000,
//               }}
//             />
//             <TextField
//               label="To"
//               type="number"
//               name="to"
//               value={priceRange[1]}
//               onChange={handleInputChange}
//               size="small"
//               fullWidth
//               inputProps={{
//                 min: 50,
//                 max: 5000,
//               }}
//             />
//           </Box>

//           {/* Divider */}
//           <Divider sx={{ margin: '12px 0', borderColor: 'grey.300' }} />

//           {/* Action Buttons */}
//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: 'space-between',
//             }}
//           >
//             <button
//               onClick={handleClearPrice}
//                className="clear-button"
//             >
//               Clear
//             </button>
//             <button
//               onClick={handleApplyPrice}

//              className="apply-button"

//             >
//               Apply
//             </button>
//           </Box>
//         </Box>
//       </Menu>

//       <Menu
//         anchorEl={anchorBedroom}
//         open={Boolean(anchorBedroom)}
//         onClose={handleCloseBedroom}
//         PaperProps={{
//           style: {
//             maxHeight: 320, // Limit dropdown height
//             width: 400,     // Set dropdown width
//             padding: '10px',
//           },
//         }}
//       >
//         <Box sx={{ width: '100%' }}>
//           {/* Header */}
//           <Typography
//             variant="subtitle1"
//             sx={{
//               fontWeight: 'bold',
//               marginBottom: 1,
//               paddingLeft: 1,
//             }}
//           >
//             Select Bedrooms
//           </Typography>

//           {/* Bedrooms Grid */}
//           <Grid container spacing={1}>
//             {bedroomOptions.map((bedroom) => (
//               <Grid item xs={6} key={bedroom}>
//                 <MenuItem
//                   onClick={() => handleToggleBedroom(bedroom)}
//                   sx={{
//                     padding: 0.5,
//                     display: 'flex',
//                     alignItems: 'center',
//                     borderRadius: 1,
//                     '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' },
//                   }}
//                 >
//                   <Checkbox
//                     checked={selectedBedrooms.includes(bedroom)}
//                     size="small"
//                   />
//                   <ListItemText primary={bedroom} />
//                 </MenuItem>
//               </Grid>
//             ))}
//           </Grid>

//           {/* Divider */}
//           <Divider sx={{ margin: '12px 0', borderColor: 'grey.300' }} />

//           {/* Buttons */}
//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               padding: '0 8px',
//               marginTop: 1,
//             }}
//           >
//             <button
//               onClick={handleClearBedroom}
//                    className="clear-button"
//             >
//               Clear
//             </button>
//             <button
//             onClick={handleApplyBedroom}
//               className="apply-button"
//             >
//               Apply
//             </button>
//           </Box>
//         </Box>
//       </Menu>

//       <Menu
//         anchorEl={anchorBathroom}
//         open={Boolean(anchorBathroom)}
//         onClose={handleCloseBathroom}
//         PaperProps={{
//           style: {
//             maxHeight: 320, // Keep a max height
//             width: 300, // Set consistent width
//             padding: '10px 20px', // Add padding for better spacing
//           },
//         }}
//       >
//         <Box sx={{ width: '100%' }}>
//           <Typography
//             gutterBottom
//             sx={{ marginBottom: 2, fontSize: '1rem', fontWeight: 'bold' }}
//           >
//             Select Bathrooms
//           </Typography>

//           {/* Bathroom options in a grid */}
//           <Grid container spacing={1}>
//             {bathroomOptions.map((bathroom) => (
//               <Grid
//                 item
//                 xs={6}
//                 key={bathroom}
//                 sx={{ display: 'flex', alignItems: 'center' }}
//               >
//                 <MenuItem
//                   onClick={() => handleToggleBathroom(bathroom)}
//                   sx={{ padding: 0, width: '100%' }}
//                 >
//                   <Checkbox
//                     checked={selectedBathrooms.includes(bathroom)}
//                     size="small"
//                   />
//                   <ListItemText
//                     primary={bathroom}
//                     sx={{ fontSize: '0.9rem', marginLeft: 1 }}
//                   />
//                 </MenuItem>
//               </Grid>
//             ))}
//           </Grid>

//           <Divider sx={{ margin: '15px 0', borderColor: 'grey.300' }} />

//           {/* Clear and Apply buttons */}
//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               padding: '5px 0'
//             }}
//           >
//             <button
//               onClick={handleClearBathroom}
//                   className="clear-button"
//             >
//               Clear
//             </button>
//             <button
//               onClick={handleApplyBathroom}
//               className="apply-button"
//             >
//               Apply
//             </button>
//           </Box>
//         </Box>
//       </Menu>

//       <Menu
//         id="guests-menu"
//         anchorEl={anchorGuest}
//         open={Boolean(anchorGuest)}
//         onClose={handleCloseGuest}
//         PaperProps={{
//           style: {
//             padding: '10px', // Adds slight padding to the dropdown
//             minWidth: '300px', // Ensures consistent width
//           },
//         }}
//       >
//         {/* Header with Guest Count Controls */}
//         <Box
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             padding: '16px',
//           }}
//         >
//           <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
//             Guests
//           </Typography>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <IconButton
//               onClick={handleDecrement}
//               disabled={guests === 1}
//               sx={{
//                 color: guests === 1 ? 'grey.400' : 'black', // Subtle disabled state
//               }}
//             >
//               <RemoveCircleOutlineIcon />
//             </IconButton>
//             <TextField
//               value={guests}
//               onChange={(e) => setGuests(Number(e.target.value))}
//               variant="standard"
//               inputProps={{
//                 min: 1,
//                 style: { textAlign: 'center', fontSize: '1rem' },
//               }}
//               sx={{ width: '50px', mx: 1, textAlign: 'center' }}
//             />
//             <IconButton onClick={handleIncrement}>
//               <ControlPointIcon />
//             </IconButton>
//           </Box>
//         </Box>

//         <Divider sx={{ margin: '10px 0', borderColor: 'grey.300' }} />

//         {/* Clear and Apply Buttons */}
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px' }}>
//           <button
//             onClick={handleClearGuest}
//             className="clear-button"
//           >
//             Clear
//           </button>
//           <button
//             onClick={handleApplyGuest}
//             className="apply-button"
//           >
//             Apply
//           </button>
//         </Box>
//       </Menu>

//       <Menu
//         anchorEl={anchorAmenities}
//         open={Boolean(anchorAmenities)}
//         onClose={handleCloseAmenities}
//         PaperProps={{
//           style: {
//             maxHeight: 320, // Limit dropdown height
//             width: 400,     // Set dropdown width
//             padding: "10px",
//           },
//         }}
//       >
//         <Box sx={{ width: '100%' }}>
//           {/* Header */}
//           <Typography
//             variant="subtitle1"
//             sx={{
//               fontWeight: 'bold',
//               marginBottom: 1,
//               paddingLeft: 1,
//             }}
//           >
//             Select Amenities
//           </Typography>

//           {/* Amenities Grid */}
//           <Grid container spacing={1}>
//             {amenitiesOptions.map((amenity) => (
//               <Grid item xs={6} key={amenity}>
//                 <MenuItem
//                   onClick={() => handleToggleAmenities(amenity)}
//                   sx={{
//                     padding: 0.5,
//                     display: 'flex',
//                     alignItems: 'center',
//                     borderRadius: 1,
//                     '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' },
//                   }}
//                 >
//                   <Checkbox
//                     checked={selectedAmenities.includes(amenity)}
//                     size="small"
//                   />
//                   <ListItemText primary={amenity} />
//                 </MenuItem>
//               </Grid>
//             ))}
//           </Grid>

//           {/* Divider */}
//           <Divider sx={{ margin: '12px 0', borderColor: 'grey.300' }} />

//           {/* Buttons */}
//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               padding: '0 8px',
//               marginTop: 1,
//             }}
//           >
//             <button
//               onClick={handleClearAmenities}
//              className="clear-button"
//             >
//               Clear
//             </button>
//             <button
//               onClick={handleApplyAmenities}

//              className="apply-button"
//             >
//               Apply
//             </button>
//           </Box>
//         </Box>
//       </Menu>
//     </>
//   )
// }
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Slider from "@mui/material/Slider";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {Container} from "@mui/material"
// **MUI Theme Override**
const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputLabel-root": { color: "#999" }, // Default label color
          "& .MuiInputLabel-root.Mui-focused": { color: "#000" }, // Black on focus
        },
      },
    },
  },
});

// **Custom Select Field (Single Select)**
export const CustomSelectField = ({
  name,
  FieldValue,
  placeholder,
  options,
}) => {
  const [selectValue, setSelectValue] = React.useState(null);

  const handleChange = (_, value) => {
    setSelectValue(value);
    FieldValue(name, value);
  };

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.label}
      value={selectValue}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={placeholder}
          size="small"
          margin="dense"
          sx={{ width: "180px" }}
        />
      )}
    />
  );
};

// **Multi-Select Amenities**
export const MultiSelectAmenities = ({
  name,
  FieldValue,
  placeholder,
  options,
}) => {
  const [selectedValues, setSelectedValues] = React.useState([]);

  const handleChange = (_, values) => {
    setSelectedValues(values);
    FieldValue(name, values);
  };

  return (
    <Autocomplete
      size="small"
      multiple
      options={options}
      disableCloseOnSelect
      getOptionLabel={(option) => option.label}
      value={selectedValues}
      onChange={handleChange}
      renderOption={(props, option, { selected }) => (
        <Grid
          item
          xs={12}
          component="li"
          {...props}
          sx={{ display: "flex", alignItems: "center", padding: "8px" }}
          key={option.value}
        >
          <Checkbox checked={selected} />
          <ListItemText primary={option.label} />
        </Grid>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={placeholder}
          size="small"
          sx={{ width: "180px" }}
        />
      )}
    />
  );
};

// **Price Range Slider (Hidden until Clicked)**
const PriceRangeSlider = ({ name, FieldValue }) => {
  const [priceRange, setPriceRange] = React.useState([0, 5000]); // Default range
  const [open, setOpen] = React.useState(false); // Controls visibility

  const handleChange = (_, newValue) => {
    setPriceRange(newValue);
    FieldValue(name, newValue);
  };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Box sx={{ width: 180, position: "relative" }}>
        {/* Text Field to Trigger Slider */}
        <TextField
          margin="dense"
          label="Price Range"
          size="small"
          value={`AED ${priceRange[0]} - AED ${priceRange[1]}`}
          onClick={() => setOpen(true)}
          sx={{ width: "180px", cursor: "pointer" }}
          InputProps={{ readOnly: true }}
        />

        {/* Slider - Only Visible When Clicked */}
        {open && (
          <Box
            sx={{
              position: "absolute",
              zIndex: 10,
              backgroundColor: "white",
              boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
              padding: "12px",
              borderRadius: "8px",
              width: "180px",
            }}
          >
            <Slider
              value={priceRange}
              onChange={handleChange}
              valueLabelDisplay="auto"
              min={0}
              max={10000}
              step={500}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "14px",
                color: "#666",
              }}
            >
              <span>AED {priceRange[0]}</span>
              <span>AED {priceRange[1]}</span>
            </Box>
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
};

// **Options Data**
const areas = [
  "Downtown",
  "Creek harbour",
  "Dubai hills",
  "Marina",
  "Palm juemeirah",
  "JBR Marina Beach",
  "Dubai Maritime City",
  "Mina Rashid",
  "Sheikh Zayed Road",
  "Dubai Health Care City",
  "Jumeirah Golf Estates",
  "Sobha Hartland 2",
  "Dubai International City",
  "City Walk",
  "Dubai Design District (D3)",
  "Madinat Jumeirah Living",
  "Dubai Science Park",
  "Fujairah",
  "Dubai Motor City",
  "DIFC",
  "Meydan City",
  "Al Habtoor City",
  "Dubai Water Canal",
  "Bluewaters Island",
  "Dubai Investment Park",
  "Al Marjan Island",
  "Ajmanmkar",
].map((item) => ({ label: item, value: item }));

const type = ["Villa", "Apartment"].map((item) => ({
  label: item,
  value: item,
}));

const bedroomOptions = [
  "1 BD Apartments",
  "2 BD Apartments",
  "3 BD Apartments",
  "3+ BD Villas",
  "4 BD Apartments",
  "4+ BD Villas",
  "Studio",
].map((item) => ({ label: item, value: item }));

const bathroomsOptions = [
  "1 Bathroom",
  "2 Bathrooms",
  "3+ Bathrooms",
].map((item) => ({ label: item, value: item }));

const guestsOptions = [
  "1 Guest",
  "2 Guests",
  "3 Guests",
  "4 Guests",
  "5 Guests",
  "6 Guests",
  "7 Guests",
  "8 Guests",
  "9 Guests",
  "10 Guests",
  "10+ Guests",
].map((item) => ({ label: item, value: item }));

const amenitiesOptions = [
  "Air Conditioner",
  "Allocated Parking",
  "Balcony/Terrace",
  "Cable Channels",
  "Central Cooling",
  "City view",
  "Close to Beach",
  "Close to Bus Station",
  "Close to Mall",
  "Close to Taxis",
  "Coffee machine",
  "Dining area",
  "Dining table",
  "Dishwasher",
  "Electric kettle",
  "Elevator in Building",
  "Family/Kid Friendly",
  "Kid's Play Area",
  "Kitchen",
  "Kitchenware",
  "Microwave",
  "Non Smoking",
  "Refrigerator",
  "Safebox",
  "Shared Gym",
  "Shared Pool",
  "Stovetop",
  "Toaster",
  "Towels",
  "TV",
  "Washing Machine",
  "Water View",
  "Wireless Internet",
].map((item) => ({ label: item, value: item }));

// **Main Component**
export default function SearchFilters() {
  const [formValues, setFormValues] = React.useState({});

  const handleSetFieldValue = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
    <ThemeProvider
      theme={theme}
      // className="container d-flex"
      // sx={{ maxWidth: "1200px", width: "100%" }}
    >

<div maxWidth="lg"
          className="row"
          sx={{
            display: "flex",
            justifyContent: "center",
            maxWidth: "1200px",
            width: "100%",
          }}
        >
          <Box
            className="col-md-10"
            component="form"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              padding: "10px",
              gap: 2,
              justifyContent: "start",
              "& .MuiAutocomplete-root": { minWidth: "100px" },
            }}
            noValidate
            autoComplete="off"
          >
            {/* Filters */}
            <CustomSelectField
              name="area"
              FieldValue={handleSetFieldValue}
              placeholder="Community"
              options={areas}
            />
            <CustomSelectField
              name="type"
              FieldValue={handleSetFieldValue}
              placeholder="Type"
              options={type}
            />
            <CustomSelectField
              name="bedrooms"
              FieldValue={handleSetFieldValue}
              placeholder="Bedrooms"
              options={bedroomOptions}
            />
            <CustomSelectField
              name="bathrooms"
              FieldValue={handleSetFieldValue}
              placeholder="Bathrooms"
              options={bathroomsOptions}
            />
            <CustomSelectField
              name="guests"
              FieldValue={handleSetFieldValue}
              placeholder="Guests"
              options={[
                {
                  value: "icon",
                  label: (
                    <PersonAddIcon
                      style={{ marginRight: 8, verticalAlign: "middle" }}
                    />
                  ),
                },
                ...guestsOptions,
              ]}
            />

            {/* Price Range Slider (Collapsible) */}
            <PriceRangeSlider
              name="price_range"
              FieldValue={handleSetFieldValue}
            />

            {/* Multi-Select Amenities */}
            <MultiSelectAmenities
              name="amenities"
              FieldValue={handleSetFieldValue}
              placeholder="Amenities"
              options={amenitiesOptions}
            />

            {/* Search Button */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#a1879f",
                color: "#fff",
                height: "fit-content",
              }}
            >
              Search
            </Button>
          </Box>
          <Box className="col-md-2 " sx={{paddingTop:"10px"}} >
            <h6>72 properties found</h6>
          </Box>
        </div>
    </ThemeProvider>
    </Container>
  );
}
