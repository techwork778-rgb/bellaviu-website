"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import "./LikeHotelDrawer.css";
import { Typography } from "@mui/material";

export default function LikeHotelDrawer({ open, handleClose }) {
  const [wishlist, setWishlist] = React.useState([]);

  React.useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, [open]);

  const handleClearAll = () => {
    localStorage.removeItem("wishlist");
    setWishlist([]);
  };

  const handleDelete = (index) => {
    const updatedWishlist = [...wishlist];
    updatedWishlist.splice(index, 1);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
  };

  const DrawerList = (
    <Box sx={{ width: 350 }} role="presentation" className="like-hotel-drawer">
      <h3 className="like-hotel-drawer-heading">Your Liked Hotels</h3>
      <Divider />
      <List className="like-hotel-list">
        {wishlist.length === 0 ? (
          <Box sx={{ padding: 2, textAlign: "center", marginTop: "5rem" }}>
            <img
              src="/no-hotels.png"
              alt="No Hotels"
              className="no-hotels-img"
              width={100}
              height={100}
              style={{ marginBottom: "10px" }}
            />
            <Typography variant="body1" color="textSecondary">
              No hotels in your wishlist.
            </Typography>
          </Box>
        ) : (
          wishlist.map((row, index) => (
            <ListItem
              key={index}
              disablePadding
              className="like-hotel-drawer-item"
            >
              <ListItemButton
                className="list-item-button gap-3"
                component="div"
              >
                <Image
                  src={row.imageUrl}
                  alt="hotel"
                  width={50}
                  height={50}
                  className="like-hotel-drawer-img"
                />
                <ListItemText
                  primary={row.name}
                  secondary={row.price + " /per night"}
                  className="like-hotel-drawer-text"
                />
                <IconButton
                  className="delete-btn"
                  onClick={() => handleDelete(index)}
                >
                  <Trash2 size={18} color="#831919" />
                </IconButton>
              </ListItemButton>
            </ListItem>
          ))
        )}
      </List>
      <Box className="drawer-bottom">
        <Divider />
        <Box className="drawer-buttons">
          <Button
            variant="outlined"
            onClick={handleClearAll}
            className="clear-btn"
          >
            Clear All
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
            className="close-btn"
          >
            Close
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Drawer open={open} onClose={handleClose} anchor="right">
      {DrawerList}
    </Drawer>
  );
}
