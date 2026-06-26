"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";

import { CurrencyProvider } from "@/context/CurrencyContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

import Leftsidebar from "@/components/Leftsidebar/Leftsidebar";
import AuthModal from "@/components/AuthModal/AuthModal";

function AdminContent({ children }) {
  const { authUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Wait until auth is loaded
  if (authUser === undefined) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "200px",
          marginBottom: "200px",
        }}
      >
        Loading...
      </div>
    );
  }

  // User not logged in
  if (!authUser) {
    return (
      <>
        <div
          style={{
            textAlign: "center",
            marginTop: "200px",
            marginBottom: "200px",
          }}
        >
          <h1>Please Login</h1>

          <p>You need to be logged in to access this page.</p>

          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              marginTop: "20px",
              backgroundColor: "transparent",
              color: "#9c6c69",
              border: "2px solid #9c6c69",
              padding: "10px 20px",
              borderRadius: "5px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#9c6c69";
              e.target.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "#9c6c69";
            }}
          >
            Login
          </button>
        </div>

        <AuthModal
          open={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
        />
      </>
    );
  }

  // User logged in but not admin
  if (authUser.type !== "admin") {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "200px",
          marginBottom: "200px",
        }}
      >
        <h1>Access Denied</h1>

        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  // Admin logged in
  return <Leftsidebar>{children}</Leftsidebar>;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          <AuthProvider>
            <CurrencyProvider>
              <AdminContent>{children}</AdminContent>
            </CurrencyProvider>
          </AuthProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
