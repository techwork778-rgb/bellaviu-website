// 'use client';
// import React, { useState } from "react";
// import {
//   Button,
//   TextField,
//   Grid,
//   Box,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   OutlinedInput,
//   Checkbox,
//   ListItemText,
//   Chip,
// } from "@mui/material";

// const amenitiesOptions = [
//   "Free WiFi", "Swimming Pool", "Gym", "24/7 Room Service", "Parking",
//   "Air Conditioner", "Allocated Parking", "Balcony/Terrace", "Cable Channels",
//   "Central Cooling", "City view", "Close to Beach", "Close to Bus Station",
//   "Close to Mall", "Close to Taxis", "Coffee machine", "Dining area", "Dining table",
//   "Dishwasher", "Electric kettle", "Elevator in Building", "Family/Kid Friendly",
//   "Kid's Play Area", "Kitchen", "Kitchenware", "Microwave", "Non Smoking",
//   "Refrigerator", "Safebox", "Shared Gym", "Shared Pool", "Stovetop", "Toaster",
//   "Towels", "TV", "Washing Machine", "Water View", "Wireless Internet"
// ];

// const Page = () => {
//   const [property, setProperty] = useState({
//     name: "",
//     images: [], // array of image URLs or base64 strings
//     price: "",
//     security_deposit: "",
//     tourismFee: "",
//     cleaningFee: "",
//     bed: "",
//     maxOccupancy: "",
//     description: "",
//     map: "",
//     amenities: [],
//   });

//   // For regular text inputs
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProperty((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // For amenities multi-select
//   const handleAmenityChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setProperty((prev) => ({
//       ...prev,
//       amenities: typeof value === "string" ? value.split(",") : value,
//     }));
//   };

//   // For multiple image uploads - converting files to base64 for preview and upload
//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const newImages = files.map((file) => {
//       return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onloadend = () => resolve(reader.result);
//         reader.onerror = reject;
//       });
//     });

//     Promise.all(newImages).then((base64Images) => {
//       setProperty((prev) => ({
//         ...prev,
//         images: [...prev.images, ...base64Images],
//       }));
//     });
//   };

//   // Single image URL input (main imageUrl)
//   // No file input for this field, just a text input for URL

//   // Handle submit - validation and sending data
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validation example
//     if (!property.name || !property.description) {
//       alert("Please fill in the required fields: Name and Description.");
//       return;
//     }
//     // Prepare form data to send to backend
//     const formData = {
//       ...property,
//       amenities: property.amenities, // comma separated string if needed
//     };

  
//     try {
//       const response = await fetch("/api/add-property", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       const result = await response.json();

    
//         if (response.ok) {
//       alert("Property added successfully!");

//       // ✅ Reset the form state
//       setProperty({
//         name: "",
//         description: "",
//         price: "",
//         security_deposit: "",
//         tourismFee: "",
//         cleaningFee: "",
//         bed: "",
//         maxOccupancy: "",
//         map: "",
//         images: [],
//         amenities: []
//       });
//       } else {
//         alert(`Error: ${result.error || "Something went wrong"}`);
//       }
//     } catch (error) {
//       console.error("Error uploading property:", error);
//       alert("An error occurred while submitting the form.");
//     }
//   };

//   return (
//     <Box sx={{ margin: "auto", padding: 3 }}>
//       <Typography variant="h4" gutterBottom textAlign="center">
//         Add Property
//       </Typography>
//       <Grid container spacing={2} component="form" onSubmit={handleSubmit}>

//         {/* Name */}
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Name"
//             variant="outlined"
//             fullWidth
//             name="name"
//             value={property.name}
//             onChange={handleInputChange}
//             required
//           />
//         </Grid>


//         {/* Images Upload */}
//         <Grid item xs={12} sm={6}>
//           <Typography variant="h6">Upload Property Images</Typography>
//           <input
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={handleImageUpload}
//           />
//           <Box
//             sx={{
//               display: "flex",
//               flexWrap: "wrap",
//               gap: 1,
//               marginTop: 2,
//               maxHeight: 120,
//               overflowY: "auto",
//             }}
//           >
//             {property.images.map((img, idx) => (
//               <Box
//                 key={idx}
//                 sx={{
//                   width: 100,
//                   height: 100,
//                   backgroundImage: `url(${img})`,
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                   borderRadius: "8px",
//                 }}
//               />
//             ))}
//           </Box>
//         </Grid>

//         {/* Price */}
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Price"
//             variant="outlined"
//             fullWidth
//             name="price"
//             type="number"
//             value={property.price}
//             onChange={handleInputChange}
//           />
//         </Grid>

//         {/* Security Deposit */}
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Security Deposit"
//             variant="outlined"
//             fullWidth
//             name="security_deposit"
//             type="number"
//             value={property.security_deposit}
//             onChange={handleInputChange}
//           />
//         </Grid>

//         {/* Tourism Fee */}
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Tourism Fee"
//             variant="outlined"
//             fullWidth
//             name="tourismFee"
//             type="number"
//             value={property.tourismFee}
//             onChange={handleInputChange}
//           />
//         </Grid>

//         {/* Cleaning Fee */}
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Cleaning Fee"
//             variant="outlined"
//             fullWidth
//             name="cleaningFee"
//             type="number"
//             value={property.cleaningFee}
//             onChange={handleInputChange}
//           />
//         </Grid>

//         {/* Bed */}
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Bed"
//             variant="outlined"
//             fullWidth
//             name="bed"
//             value={property.bed}
//             onChange={handleInputChange}
//             placeholder="e.g. 2 Bedroom"
//           />
//         </Grid>

//         {/* Max Occupancy */}
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Max Occupancy"
//             variant="outlined"
//             fullWidth
//             name="maxOccupancy"
//             value={property.maxOccupancy}
//             onChange={handleInputChange}
//             placeholder="e.g. 4 Adults"
//           />
//         </Grid>

//         {/* Description */}
//         <Grid item xs={12}>
//           <TextField
//             label="Description"
//             variant="outlined"
//             fullWidth
//             name="description"
//             multiline
//             rows={4}
//             value={property.description}
//             onChange={handleInputChange}
//             required
//           />
//         </Grid>

//         {/* Map URL */}
//         <Grid item xs={12}>
//           <TextField
//             label="Map URL"
//             variant="outlined"
//             fullWidth
//             name="map"
//             value={property.map}
//             onChange={handleInputChange}
//             placeholder="https://maps.google.com/?q=Downtown+Dubai+Sheikh+Zayed+Road"
//           />
//         </Grid>

//         {/* Amenities Multi-select */}
//         <Grid item xs={12}>
//           <FormControl fullWidth>
//             <InputLabel>Amenities</InputLabel>
//             <Select
//               multiple
//               value={property.amenities}
//               onChange={handleAmenityChange}
//               input={<OutlinedInput label="Amenities" />}
//               renderValue={(selected) => (
//                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                   {selected.map((value) => (
//                     <Chip key={value} label={value} />
//                   ))}
//                 </Box>
//               )}
//             >
//               {amenitiesOptions.map((amenity) => (
//                 <MenuItem key={amenity} value={amenity}>
//                   <Checkbox checked={property.amenities.indexOf(amenity) > -1} />
//                   <ListItemText primary={amenity} />
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>

//         {/* Submit Button */}
//         <Grid item xs={12} sm={6}>
//           <Button type="submit" variant="contained" color="primary" fullWidth>
//             Add Property
//           </Button>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Page;
'use client';
import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Chip,
} from "@mui/material";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const amenitiesOptions = [
  "Free WiFi", "Swimming Pool", "Gym", "24/7 Room Service", "Parking",
  "Air Conditioner", "Allocated Parking", "Balcony/Terrace", "Cable Channels",
  "Central Cooling", "City view", "Close to Beach", "Close to Bus Station",
  "Close to Mall", "Close to Taxis", "Coffee machine", "Dining area", "Dining table",
  "Dishwasher", "Electric kettle", "Elevator in Building", "Family/Kid Friendly",
  "Kid's Play Area", "Kitchen", "Kitchenware", "Microwave", "Non Smoking",
  "Refrigerator", "Safebox", "Shared Gym", "Shared Pool", "Stovetop", "Toaster",
  "Towels", "TV", "Washing Machine", "Water View", "Wireless Internet"
];

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const Page = () => {
  const [property, setProperty] = useState({
    name: "",
    images: [], // array of image URLs or base64 strings
    price: "",
    security_deposit: "",
    tourismFee: "",
    cleaningFee: "",
    bed: "",
    maxOccupancy: "",
    description: "",
    map: "",
    amenities: [],
  });

  // For regular text inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // For amenities multi-select
  const handleAmenityChange = (event) => {
    const {
      target: { value },
    } = event;
    setProperty((prev) => ({
      ...prev,
      amenities: typeof value === "string" ? value.split(",") : value,
    }));
  };

  // For multiple image uploads - converting files to base64 for preview and upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
      });
    });

    Promise.all(newImages).then((base64Images) => {
      setProperty((prev) => ({
        ...prev,
        images: [...prev.images, ...base64Images],
      }));
    });
  };

  // On drag end handler
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const reorderedImages = reorder(
      property.images,
      result.source.index,
      result.destination.index
    );

    setProperty((prev) => ({
      ...prev,
      images: reorderedImages,
    }));
  };

  // Handle submit - validation and sending data
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation example
    if (!property.name || !property.description) {
      alert("Please fill in the required fields: Name and Description.");
      return;
    }
    // Prepare form data to send to backend
    const formData = {
      ...property,
      amenities: property.amenities, // comma separated string if needed
    };

    try {
      const response = await fetch("/api/add-property", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.ok) {
        alert("Property added successfully!");

        // ✅ Reset the form state
        setProperty({
          name: "",
          description: "",
          price: "",
          security_deposit: "",
          tourismFee: "",
          cleaningFee: "",
          bed: "",
          maxOccupancy: "",
          map: "",
          images: [],
          amenities: []
        });
      } else {
        alert(`Error: ${result.error || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error uploading property:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <Box sx={{ margin: "auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Add Property
      </Typography>
      <Grid container spacing={2} component="form" onSubmit={handleSubmit}>

        {/* Name */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            name="name"
            value={property.name}
            onChange={handleInputChange}
            required
          />
        </Grid>

        {/* Images Upload */}
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Upload Property Images</Typography>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId="images-droppable"
              direction="horizontal"
            >
              {(provided) => (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    marginTop: 2,
                    maxHeight: 120,
                    overflowY: "auto",
                  }}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {property.images.map((img, idx) => (
                    <Draggable
                      key={img + idx} // use index with img for stable keys
                      draggableId={img + idx}
                      index={idx}
                    >
                      {(providedDraggable) => (
                        <Box
                          ref={providedDraggable.innerRef}
                          {...providedDraggable.draggableProps}
                          {...providedDraggable.dragHandleProps}
                          sx={{
                            width: 100,
                            height: 100,
                            backgroundImage: `url(${img})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            borderRadius: "8px",
                            cursor: "grab",
                          }}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        </Grid>

        {/* Price */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            name="price"
            type="number"
            value={property.price}
            onChange={handleInputChange}
          />
        </Grid>

        {/* Security Deposit */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Security Deposit"
            variant="outlined"
            fullWidth
            name="security_deposit"
            type="number"
            value={property.security_deposit}
            onChange={handleInputChange}
          />
        </Grid>

        {/* Tourism Fee */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Tourism Fee"
            variant="outlined"
            fullWidth
            name="tourismFee"
            type="number"
            value={property.tourismFee}
            onChange={handleInputChange}
          />
        </Grid>

        {/* Cleaning Fee */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Cleaning Fee"
            variant="outlined"
            fullWidth
            name="cleaningFee"
            type="number"
            value={property.cleaningFee}
            onChange={handleInputChange}
          />
        </Grid>

        {/* Bed */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Bed"
            variant="outlined"
            fullWidth
            name="bed"
            value={property.bed}
            onChange={handleInputChange}
            placeholder="e.g. 2 Bedroom"
          />
        </Grid>

        {/* Max Occupancy */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Max Occupancy"
            variant="outlined"
            fullWidth
            name="maxOccupancy"
            value={property.maxOccupancy}
            onChange={handleInputChange}
            placeholder="e.g. 4 Adults"
          />
        </Grid>

        {/* Description */}
        <Grid item xs={12}>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            name="description"
            multiline
            rows={4}
            value={property.description}
            onChange={handleInputChange}
            required
          />
        </Grid>

        {/* Map URL */}
        <Grid item xs={12}>
          <TextField
            label="Map URL"
            variant="outlined"
            fullWidth
            name="map"
            value={property.map}
            onChange={handleInputChange}
            placeholder="https://maps.google.com/?q=Downtown+Dubai+Sheikh+Zayed+Road"
          />
        </Grid>

        {/* Amenities Multi-select */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Amenities</InputLabel>
            <Select
              multiple
              value={property.amenities}
              onChange={handleAmenityChange}
              input={<OutlinedInput label="Amenities" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {amenitiesOptions.map((amenity) => (
                <MenuItem key={amenity} value={amenity}>
                  <Checkbox checked={property.amenities.indexOf(amenity) > -1} />
                  <ListItemText primary={amenity} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12} sm={6}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Property
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Page;
