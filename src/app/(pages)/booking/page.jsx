
"use client";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import Alert from "@mui/material/Alert";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { format } from "date-fns";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";

export default function Page() {
  const [orderDetails, setOrderDetails] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertSeverity, setAlertSeverity] = useState("info");
  const [orderSummary, setOrderSummary] = useState("");
  
  const [isBookingSaved, setIsBookingSaved] = useState(false); // New state to track submission

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const encryptedData = urlParams.get("data");

    if (encryptedData) {
      try {
        const encryptionKey = "Bellaviu@987654231"; // Use the same key
        const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        const { orderId, userBookingDeatils ,uploadedFile} = decryptedData;

        // Fetch order status
        fetch(`/api/order-status?orderId=${orderId}`)
          .then((response) => response.json())
          .then((data) => {
            // Set alert based on order status
            if (data.status === "CAPTURED") {
              setOrderDetails(data);
              setOrderSummary(userBookingDeatils);
              console.log(userBookingDeatils,
                uploadedFile
              );
              setAlertMessage("Payment successful! Booking confirmed.");
              setAlertSeverity("success");

              // Avoid saving booking details again if already saved
              if (!isBookingSaved) {
                // Prepare booking details to send to the backend
                const bookingDetails = {
                  orderId: data.id, // Order ID from response
                  orderSummary: userBookingDeatils.split(",").map((item) => {
                    const [key, value] = item.split(":").map((str) => str.trim());
                    return { key, value };
                  }),
                  orderDetails:data,
                   uploadedFile,
                };

                // Send booking details to the backend API
                fetch("/api/save-booking-details", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(bookingDetails),
                })
                  .then((response) => response.json())
                  .then((data) => {
                   // console.log("Booking details saved successfully:", data);
                    setIsBookingSaved(true); // Mark as saved
                  })
                  .catch((error) => {
                    console.error("Error saving booking details:", error);
                  });
              }
            } else {
              setAlertMessage("Payment not successful. Please try again.");
              setAlertSeverity("error");
            }
          })
          .catch((error) => {
            console.error("Error fetching order status:", error);
            setAlertMessage("Error checking payment status.");
            setAlertSeverity("error");
          });
      } catch (error) {
        console.error("Failed to decrypt data:", error);
        setAlertMessage("Invalid data received.");
        setAlertSeverity("error");
      }
    }
  }, []);

  return (
    <>
      <Breadcrumb title={"Booking"} image={"/skyline.jpg"} />
      <div className="container" style={{ marginTop: "50px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Booking Status</h1>

        {alertMessage && <Alert severity={alertSeverity}>{alertMessage}</Alert>}

        {orderDetails ? (
          orderDetails.status === "CAPTURED" ? (
            <Grid container spacing={3} justifyContent="center" sx={{ marginTop: "10px" }}>
              {/* Booking Summary Column (Left) */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="h3" gutterBottom>
                      Booking Summary
                    </Typography>
                    <Box mb={2}>
                      <Typography variant="body1">
                        <strong>Booking ID:</strong> {orderDetails.id}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Order Summary:</strong>
                      </Typography>
                      <div>
                        {orderSummary.split(",").map((item, index) => {
                          const [key, value] = item.split(":").map((str) => str.trim());
                          return (
                            <Typography variant="body2" key={index}>
                              <strong>{key}:</strong> {value}
                            </Typography>
                          );
                        })}
                      </div>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Payment Details Column (Right) */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="h3" gutterBottom>
                      Payment Details
                    </Typography>
                    <Typography variant="body1">
                      <strong>Amount Paid:</strong> {orderDetails.amount} {orderDetails.currency}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Time:</strong> {format(new Date(orderDetails?.lastUpdatedTime), "yyyy-MM-dd HH:mm:ss")}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Transaction ID:</strong> {orderDetails.transaction && orderDetails.transaction[0]?.authentication["3ds"]?.transactionId || "N/A"}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Transaction Status:</strong> {orderDetails.transaction && orderDetails.transaction[0]?.authentication["3ds2"]?.transactionStatus || "N/A"}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Authentication Status:</strong> {orderDetails.authenticationStatus || "N/A"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
             

            </Grid>
          ) : (
            <Typography variant="h6" color="error" align="center" sx={{ marginTop: "20px" }}>
           Check profile and Please try again
            </Typography>
          )
        ) : (
          <p>Checking payment status...</p>
        )}
      </div>
    </>
  );
}
