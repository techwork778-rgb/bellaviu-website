"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { AuthProvider } from "@/context/AuthContext";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import Leftsidebar from "@/components/Leftsidebar/Leftsidebar";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal/AuthModal";
import { Button } from "@mui/material";
export default function RootLayout({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { authUser } = useAuth(); // Access user authentication data

  // Show loading while auth state is being determined
  if (authUser === undefined) {
    return <div>Loading...</div>;
  }

  // If not authenticated, show login message
  if (!authUser) {
    return (
      <div style={{ textAlign: "center", marginTop: "200px" ,marginBottom: "200px"}}>
         <h1>Please Login</h1>
      <p>You need to be logged in to access this page.</p>
      <button
  onClick={handleOpenModal}
  style={{
    marginTop: "20px",
    backgroundColor: "transparent", // Transparent background
    color: " #9c6c69", // Primary color for text
    border: "2px solid #9c6c69 ", // Primary color for border
    padding: "10px 20px", // Spacing inside the button
    borderRadius: "5px", // Slightly rounded corners
    fontSize: "16px", // Font size
    fontWeight: "bold", // Bold text
    cursor: "pointer", // Pointer cursor
    transition: "all 0.3s ease", // Smooth hover effect
  }}
  onMouseOver={(e) => {
    e.target.style.backgroundColor = " #9c6c69 "; // Fill background on hover
    e.target.style.color = "#fff"; // Change text to white on hover
  }}
  onMouseOut={(e) => {
    e.target.style.backgroundColor = "transparent"; // Reset background
    e.target.style.color = " #9c6c69 "; // Reset text color
  }}
>
  Login
</button>

      {/* AuthModal Component */}
      {isModalOpen && (
        <AuthModal open={isModalOpen}     handleClose={handleCloseModal} />
      )}
      </div>
    );
  }

  // If authenticated but not an admin, show access denied message
  if (authUser.type !== "admin") {
    return (
      <div style={{ textAlign: "center", marginTop: "200px" ,marginBottom: "200px" }}>
        <h1>Access Denied</h1>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  // Render layout and content if the user is an admin
  return (
    <html lang="en">
      <head></head>
      <body>
        <SessionProviderWrapper>
          <AuthProvider>
            <CurrencyProvider>
              <Leftsidebar>{children}</Leftsidebar>
            </CurrencyProvider>
          </AuthProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
