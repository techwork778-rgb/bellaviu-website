import React, { useState } from "react";
import {
    Box,
    Grid,
    TextField,InputAdornment,  Popover,
    Button,Typography,IconButton
  } from "@mui/material";
  import "./HeroSearch.css";
  import LocationCityIcon from '@mui/icons-material/LocationCity';
  import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
  import PersonIcon from '@mui/icons-material/Person';
  import SearchIcon from '@mui/icons-material/Search';
  import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Default theme



  export default function HeroSearch() {
    
    const [guestCount, setGuestCount] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorDate, setAnchorDate] = useState(null);
    const [dateRange, setDateRange] = useState({
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    });
    

    const currentDate = new Date()
    const handleOpenDate = (event) => {
      setAnchorDate(event.currentTarget);
    };
  
    const handleCloseDate = () => {
      setAnchorDate(null);
    };
  
    const open = Boolean(anchorDate);
    const handleIncrement = () => {
      setGuestCount(guestCount + 1);
    };
  
    const handleDecrement = () => {
      if (guestCount > 0) {
        setGuestCount(guestCount - 1);
      }
    };
  
    const handleOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const isOpen = Boolean(anchorEl);
  
    return (
<>
        <Box className="search-bar"  >
<Grid container className="search-bar-grid">
  {/* Where are you going? */}
  <Grid item xs={12} sm={4}  >
    <TextField
     size="small" // Compact text field
   className="search-bar-textfield"
      variant="outlined"
      placeholder="Apartment/Studio/Villa"
  
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LocationCityIcon />
          </InputAdornment>
        ),
      }}
    />
  </Grid>

  {/* Check-in / Check-out */}
  {/* <Grid item xs={12} sm={4}  >
    <TextField
         size="small" // Compact text field
      className="search-bar-textfield"
      variant="outlined"
      placeholder="Check-in date — Check-out date"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <CalendarTodayIcon />
          </InputAdornment>
        ),
      }}
    />
  </Grid> */}
   <Grid item xs={12} sm={4}>
      <TextField
        size="small"
        className="search-bar-textfield"
        variant="outlined"
        placeholder="Check-in date — Check-out date"
        value={`${dateRange.startDate.toLocaleDateString()} - ${dateRange.endDate.toLocaleDateString()}`}
        onClick={handleOpenDate} // Open date picker on click
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CalendarTodayIcon />
            </InputAdornment>
          ),
          readOnly: true, // Prevent manual input
        }}
      />
      {/* Popover for Date Range Picker */}
      <Popover
        open={open}
        anchorEl={anchorDate}
        onClose={handleCloseDate}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box p={2}>
          <DateRange
            editableDateInputs={true}
            months={2} // Show two months in the calendar
            direction="horizontal" // Make the months show side by side
            onChange={(item) => setDateRange(item.selection)}
            moveRangeOnFirstSelection={false}
            ranges={[dateRange]}
            minDate={currentDate} // Disable past dates
          />
        </Box>
      </Popover>
    </Grid>


  {/* Guests and Rooms */}
  <Grid item xs={12} sm={3}  >
    <TextField
         size="small" // Compact text field
        onClick={handleOpen}
      className="search-bar-textfield"
      variant="outlined"
      placeholder={
        guestCount > 0
          ? `${guestCount} Guest${guestCount > 1 ? "s" : ""}`
          : "Guests"
      } // Dynamic placeholder
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <PersonIcon />
          </InputAdornment>
        ),
      }}
    />
    
  </Grid>

  {/* Search Button */}
  <Grid item xs={12} sm={1}>
  
    <button className="search-bar-button" >
      
    <SearchIcon />
    </button>
  </Grid>
</Grid>
     </Box>
     <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            mt: 1,
            p: 2,
            borderRadius: 2,
            boxShadow: 2,
            minWidth: 250,
          },
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body1">Guests</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={handleDecrement} disabled={guestCount === 0}>
                <RemoveIcon />
              </IconButton>
              <TextField
                value={guestCount}
                variant="standard"
                size="small"
                sx={{ width: 40, mx: 1, textAlign: "center" }}
                inputProps={{
                  style: { textAlign: "center" },
                  readOnly: true,
                }}
              />
              <IconButton onClick={handleIncrement}>
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Popover>
     </>
         );
     
     }
     
 