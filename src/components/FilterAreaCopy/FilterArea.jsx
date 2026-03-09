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
import PersonAddIcon from '@mui/icons-material/PersonAdd';

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
export const CustomSelectField = ({ name, FieldValue, placeholder, options }) => {
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
        <TextField {...params} label={placeholder} size="small" margin="dense" sx={{ width: "100%" }} />
      )}
    />
  );
};

// **Multi-Select Amenities**
export const MultiSelectAmenities = ({ name, FieldValue, placeholder, options }) => {
  const [selectedValues, setSelectedValues] = React.useState([]);

  const handleChange = (_, values) => {
    setSelectedValues(values);
    FieldValue(name, values);
  };

  return (
    <Autocomplete size="small"
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
          sx={{ display: "flex", alignItems: "center", padding: "8px", width: "100%", }}
          key={option.value}
        >
          <Checkbox checked={selected} />
          <ListItemText primary={option.label} />
        </Grid>
      )}
      renderInput={(params) => (
        <TextField {...params} label={placeholder} size="small" sx={{ width: "100%" }} />
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
      <Box sx={{ position: "relative" }}>
        {/* Text Field to Trigger Slider */}
        <TextField 
          margin="dense"
          label="Price Range"
          size="small"
          value={`AED ${priceRange[0]} - AED ${priceRange[1]}`}
          onClick={() => setOpen(true)}
          sx={{ width: "100%", cursor: "pointer"}}
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
              width: "100%",
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
            <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#666" }}>
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
  'Downtown',
  'Creek harbour',
  'Dubai hills',
  'Marina',
  'Palm juemeirah',
  'JBR Marina Beach',
  'Dubai Maritime City',
  'Mina Rashid',
  'Sheikh Zayed Road',
  'Dubai Health Care City',
  'Jumeirah Golf Estates',
  'Sobha Hartland 2',
  'Dubai International City',
  'City Walk',
  'Dubai Design District (D3)',
  'Madinat Jumeirah Living',
  'Dubai Science Park',
  'Fujairah',
  'Dubai Motor City',
  'DIFC',
  'Meydan City',
  'Al Habtoor City',
  'Dubai Water Canal',
  'Bluewaters Island',
  'Dubai Investment Park',
  'Al Marjan Island',
  'Ajmanmkar'
].map((item) => ({ label: item, value: item }));

const type = [
  'Villa', 'Apartment'
].map((item) => ({ label: item, value: item }));

const bedroomOptions = [
  "1 BD Apartments", "2 BD Apartments", "3 BD Apartments", "3+ BD Villas",
  "4 BD Apartments", "4+ BD Villas", "Studio"
].map((item) => ({ label: item, value: item }));

const bathroomsOptions = ["1 Bathroom", "2 Bathrooms", "3+ Bathrooms"].map((item) => ({ label: item, value: item }));

const guestsOptions = ["1 Guest", "2 Guests", "3 Guests", "4 Guests", "5 Guests", "6 Guests", "7 Guests", "8 Guests", "9 Guests", "10 Guests", "10+ Guests" ].map((item) => ({ label: item, value: item }));

const amenitiesOptions = [
  "Air Conditioner", "Allocated Parking", "Balcony/Terrace", "Cable Channels",
  "Central Cooling", "City view", "Close to Beach", "Close to Bus Station",
  "Close to Mall", "Close to Taxis", "Coffee machine", "Dining area", "Dining table",
  "Dishwasher", "Electric kettle", "Elevator in Building", "Family/Kid Friendly",
  "Kid's Play Area", "Kitchen", "Kitchenware", "Microwave", "Non Smoking",
  "Refrigerator", "Safebox", "Shared Gym", "Shared Pool", "Stovetop", "Toaster",
  "Towels", "TV", "Washing Machine", "Water View", "Wireless Internet"
].map((item) => ({ label: item, value: item }));

// **Main Component**
export default function SearchFilters({ onApply }) {
  const [formValues, setFormValues] = React.useState({});

  const handleSetFieldValue = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  
  };

const handleApply = (e) => {
  e.preventDefault();
  if (onApply) {
    onApply(formValues); // ✅ This has all filter fields
  }
};

  return (
    <ThemeProvider theme={theme} className="container d-flex" sx={{ maxWidth: "1200px", width: "100%",  }}>
     <Box
  component="form"
  sx={{
    display: "flex",
    flexWrap: "wrap",
    padding: "10px",
    //gap: 2,
    justifyContent: "start",
    "& .MuiAutocomplete-root": { minWidth: "100px" },
  }}
  noValidate
  autoComplete="off"
>
  <Grid container spacing={1} sx={{ maxWidth: "600px" }}>
    <Grid item xs={6} md={12}>
      <CustomSelectField name="area" FieldValue={handleSetFieldValue} placeholder="Community" options={areas} />
    </Grid>
    <Grid item xs={6} md={12}>
      <CustomSelectField name="type" FieldValue={handleSetFieldValue} placeholder="Type" options={type} />
    </Grid>
    <Grid item xs={6} md={12}>
      <CustomSelectField name="bedrooms" FieldValue={handleSetFieldValue} placeholder="Bedrooms" options={bedroomOptions} />
    </Grid>
    {/* <Grid item xs={6} md={12}>
      <CustomSelectField name="bathrooms" FieldValue={handleSetFieldValue} placeholder="Bathrooms" options={bathroomsOptions} />
    </Grid> */}
    <Grid item xs={6} md={12}>
      <CustomSelectField name="guests" FieldValue={handleSetFieldValue} placeholder="Guests" options={guestsOptions} />
    </Grid>
    <Grid item xs={6} md={12}>
      <PriceRangeSlider name="price_range" FieldValue={handleSetFieldValue} />
    </Grid>
    {/* <Grid item xs={12} md={12}>
      <MultiSelectAmenities name="amenities" FieldValue={handleSetFieldValue} placeholder="Amenities" options={amenitiesOptions} />
    </Grid> */}
    <Grid item xs={12} md={12}>
            <button className="filter-apply-button" onClick={handleApply}
            >Apply</button>
          </Grid>

  </Grid>
</Box>

    </ThemeProvider>
  );
}