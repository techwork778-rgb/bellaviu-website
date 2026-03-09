"use client";
import React from "react";
import { Container, Typography, Box, Divider, Link } from "@mui/material";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";

const TermsAndConditions = () => {
  return (
    <>
      <Breadcrumb title="Terms and Conditions" image={"/BusinessBay.jpg"} />
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Terms and Conditions
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Last updated: 16-12-2024
          </Typography>
        </Box>

        <Typography variant="body1" paragraph>
          Welcome to Bellaviu Holiday Homes LLC ("we," "our," or "us"). These
          Terms and Conditions govern your access and use of our website,
          <span style={{ padding: "0 5px 0 5px" }}>
            <a href="https://bellaviu.rabs.support">
              https://bellaviu.rabs.support
            </a>
          </span>
          and related services, including the booking of flats on a day/night
          rental basis. By using our services, you agree to be bound by these
          Terms and Conditions. If you do not agree, please do not use our services.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          1. Use of Services
        </Typography>
        <Typography variant="body1" paragraph>
          <ul>
            <li>
              You must be at least 18 years old to use our services and make a
              booking.
            </li>
            <li>
              You agree to provide accurate and complete information during the
              booking process.
            </li>
            <li>
              The use of our services is solely for lawful purposes. Misuse of
              services, including fraudulent bookings or payment methods, will
              result in termination and potential legal action.
            </li>
          </ul>
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          2. Booking and Payment
        </Typography>
        <Typography variant="body1" paragraph>
          <ul>
            <li>
              All bookings are subject to availability and confirmation by
              Bellaviu Holiday Homes LLC.
            </li>
            <li>
              Payment must be completed through our secure payment gateway to
              confirm your booking.
            </li>
            <li>
              Cancellations and refunds will be done only through the Original
              Mode of Payment.
            </li>
          </ul>
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          3. Responsibilities of the Guest
        </Typography>
        <Typography variant="body1" paragraph>
          <ul>
            <li>
              Guests must comply with all property rules and regulations during
              their stay.
            </li>
            <li>
              Any damages caused to the property during the stay must be
              reported immediately, and guests may be liable for repair or
              replacement costs.
            </li>
            <li>
              The property is for the use of registered guests only. Subletting
              or hosting unregistered individuals is strictly prohibited.
            </li>
          </ul>
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          4. Limitation of Liability
        </Typography>
        <Typography variant="body1" paragraph>
          Bellaviu Holiday Homes LLC will not be held liable for:
        </Typography>
        <Typography variant="body1" component="ul">
          <li>
            Any loss, damage, or theft of personal belongings during your stay.
          </li>
          <li>
            Injuries, accidents, or damages arising from the improper use of the
            property or its facilities.
          </li>
          <li>
            Delays or disruptions caused by unforeseen circumstances, including
            natural disasters, strikes, or technical issues.
          </li>
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          5. Intellectual Property
        </Typography>
        <Typography variant="body1" paragraph>
          All content, trademarks, and intellectual property on this website are
          owned by Bellaviu Holiday Homes LLC. You may not copy, distribute, or
          use any content without our prior written consent.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          6. Termination
        </Typography>
        <Typography variant="body1" paragraph>
          We reserve the right to terminate or suspend your access to our
          services if you violate these Terms and Conditions or engage in any
          prohibited activities.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          7. Changes to Terms
        </Typography>
        <Typography variant="body1" paragraph>
          We may update these Terms and Conditions from time to time. Any
          changes will be posted on this page with the updated date.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          8. Governing Law
        </Typography>
        <Typography variant="body1" paragraph>
          These Terms and Conditions are governed by the laws of the United Arab
          Emirates. Any disputes arising from these terms will be resolved in
          the courts of Dubai.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          9. Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have questions or concerns about these Terms and Conditions,
          please contact us at:
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong>{" "}
          <Link href="mailto:reservation@bellaviuholidayhomes.com">reservation@bellaviuholidayhomes.com</Link>
        </Typography>
        <Typography variant="body1">
          <strong>Phone:</strong>+971 4 570 1618 | +971 50 267 8831
        </Typography>
      </Container>
    </>
  );
};

export default TermsAndConditions;
