
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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

export default function EditPropertyForm({ initialData, onSubmit }) {
  const [property, setProperty] = useState(initialData);
  const [newImageUrl, setNewImageUrl] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmenityToggle = (amenity) => {
    setProperty((prev) => {
      const newAmenities = prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity];
      return { ...prev, amenities: newAmenities };
    });
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setProperty((prev) => ({
        ...prev,
        images: [...prev.images, newImageUrl.trim()],
      }));
      setNewImageUrl("");
    }
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setProperty((prev) => ({
          ...prev,
          images: [...prev.images, base64],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index) => {
    setProperty((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // NEW: Handle drag end to reorder images
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newImages = Array.from(property.images);
    const [movedImage] = newImages.splice(result.source.index, 1);
    newImages.splice(result.destination.index, 0, movedImage);

    setProperty((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(property);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" mb={2}>Edit Property</Typography>

      <TextField
        label="Name"
        name="name"
        value={property.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      {property.imageUrl && (
        <Box mt={2}>
          <Typography variant="subtitle1">Main Image Preview</Typography>
          <img
            src={property.imageUrl}
            alt="Main Preview"
            style={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 8 }}
          />
        </Box>
      )}

      {property.images?.length > 0 && (
        <Box mt={2}>
          <Typography variant="subtitle1">Gallery Images (Drag to reorder)</Typography>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="images" direction="horizontal">
              {(provided) => (
                <Grid
                  container
                  spacing={1}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  sx={{ overflowX: "auto", flexWrap: "nowrap" }}
                >
                  {property.images.map((img, index) => (
                    <Draggable key={index} draggableId={`${index}`} index={index}>
                      {(providedDraggable) => (
                        <Grid
                          item
                          xs={4}
                          ref={providedDraggable.innerRef}
                          {...providedDraggable.draggableProps}
                          {...providedDraggable.dragHandleProps}
                          sx={{ position: "relative", userSelect: "none" }}
                        >
                          <img
                            src={img}
                            alt={`Preview ${index + 1}`}
                            style={{
                              width: "100%",
                              height: 100,
                              objectFit: "cover",
                              borderRadius: 6,
                              cursor: "grab",
                            }}
                          />
                          <IconButton
                            onClick={() => handleRemoveImage(index)}
                            size="small"
                            sx={{ position: "absolute", top: 4, right: 4, background: "#fff" }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Grid>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Grid>
              )}
            </Droppable>
          </DragDropContext>
        </Box>
      )}

      <Box mt={2}>
        <Typography variant="subtitle1">Upload Image from File</Typography>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageFileChange}
          style={{ marginTop: 8 }}
        />
      </Box>

      {/* ... rest of your form inputs remain unchanged ... */}

      <TextField
        label="Price"
        name="price"
        type="number"
        value={property.price}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Bed"
        name="bed"
        value={property.bed}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Max Occupancy"
        name="maxOccupancy"
        value={property.maxOccupancy || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Security Deposit"
        name="security_deposit"
        type="number"
        value={property.security_deposit}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Cleaning Fee"
        name="cleaningFee"
        type="number"
        value={property.cleaningFee}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Tourism Fee"
        name="tourismFee"
        type="number"
        value={property.tourismFee || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Description"
        name="description"
        value={property.description}
        onChange={handleChange}
        fullWidth
        multiline
        rows={3}
        margin="normal"
      />

      <TextField
        label="Map"
        name="map"
        value={property.map}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <Typography variant="subtitle1" mt={2}>Amenities</Typography>
      <Box display="flex" flexWrap="wrap">
        {amenitiesOptions.map((amenity) => (
          <FormControlLabel
            key={amenity}
            control={
              <Checkbox
                checked={property.amenities.includes(amenity)}
                onChange={() => handleAmenityToggle(amenity)}
              />
            }
            label={amenity}
          />
        ))}
      </Box>

      <Button type="submit" variant="contained" sx={{ mt: 3 }}>
        Save
      </Button>
    </Box>
  );
}
