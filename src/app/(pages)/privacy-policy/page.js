"use client";
import React from "react";
import { Container, Typography, Box, Divider, Link } from "@mui/material";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";

const page = () => {
  return (
    <>
      <Breadcrumb title="Privacy Policy" image={"/BusinessBay.jpg"}  />
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Privacy Policy
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Last updated: 16-12-2024
          </Typography>
        </Box>

        <Typography variant="body1" paragraph>
          Bellaviu Holiday Homes LLC ("we," "our," or "us") is committed to
          protecting your privacy. This Privacy Policy outlines how we collect,
          use, and safeguard your information when you visit or use our website
          <span style={{ padding: "0 5px 0 5px" }}>
            <a href="https://bellaviu.rabs.support">
              https://bellaviu.rabs.support
            </a>
          </span>
          and related services, including the booking of flats on a day/night
          rental basis.
        </Typography>

        <Typography variant="body1" paragraph>
          By using our website and services, you agree to the terms of this
          Privacy Policy. If you do not agree with the terms, please do not use
          our services.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          1. Information We Collect
        </Typography>
        <Typography variant="body1" paragraph>
          We collect the following types of information to provide and improve
          our services:
        </Typography>

        <Typography variant="h6" gutterBottom>
          1.1 Personal Information
        </Typography>
        <Typography variant="body1" paragraph>
          <ul>
            <li>
              <strong>Google Login:</strong> When you log in using Google, we
              collect your name, email address, and profile picture as shared by
              Google.
            </li>
            <li>
              <strong>Booking Details:</strong> Information such as your contact
              details, preferred booking dates, and flat selection.
            </li>
            <li>
              <strong>Payment Information:</strong> Details required to process
              payments, such as card or UPI details, are collected securely
              through our payment gateway partner.
            </li>
          </ul>
        </Typography>

        <Typography variant="h6" gutterBottom>
          1.2 Non-Personal Information
        </Typography>
        <Typography variant="body1" paragraph>
          <ul>
            <li>
              <strong>Device Information:</strong> Details about your device,
              browser type, and operating system.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you interact
              with our website, such as pages visited, booking activity, and
              clicks.
            </li>
          </ul>
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          2. How We Use Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          We use the information collected for the following purposes:
        </Typography>
        <Typography variant="body1" component="ul">
          <li>To process and manage your flat bookings.</li>
          <li>To authenticate your account via Google Login.</li>
          <li>To facilitate secure online payments.</li>
          <li>
            To communicate with you about your bookings, updates, or promotional
            offers.
          </li>
          <li>To improve our website functionality and user experience.</li>
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          3. Sharing Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          All credit/debit card details and personally identifiable information
          will NOT be stored, sold, shared, rented, or leased to any third
          parties. However, we may share your information with:
        </Typography>
        <Typography variant="body1" component="ul">
          <li>
            <strong>Payment Gateway Providers:</strong> To process your payments
            securely.
          </li>
          <li>
            <strong>Service Providers:</strong> For technical support, hosting,
            and analytics.
          </li>
          <li>
            <strong>Legal Authorities:</strong> If required to comply with legal
            obligations or to protect our rights.
          </li>
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          4. Data Security
        </Typography>
        <Typography variant="body1" paragraph>
          We take appropriate measures to protect your information from
          unauthorized access, alteration, or disclosure. Payment details are
          processed through secure and encrypted channels provided by trusted
          payment gateways.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          5. Your Rights
        </Typography>
        <Typography variant="body1" paragraph>
          You have the right to:
        </Typography>
        <Typography variant="body1" component="ul">
          <li>Access, update, or delete your personal information.</li>
          <li>Opt out of receiving promotional communications.</li>
          <li>Revoke access to your Google account.</li>
        </Typography>
        <Typography variant="body1" paragraph>
          To exercise your rights, please contact us at{" "}
          <Link href="mailto:reservation@bellaviuholidayhomes.com">
            reservation@bellaviuholidayhomes.com
          </Link>.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          6. Cookies and Tracking
        </Typography>
        <Typography variant="body1" paragraph>
          Our website uses cookies to enhance your browsing experience. Cookies
          are small files stored on your device that help us remember your
          preferences and improve our services.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          7. Third-Party Links
        </Typography>
        <Typography variant="body1" paragraph>
          Our website may contain links to third-party websites or services. We
          are not responsible for their privacy practices, so we encourage you
          to review their policies.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          8. Changes to This Policy
        </Typography>
        <Typography variant="body1" paragraph>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with the updated date.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          9. Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have questions or concerns about this Privacy Policy, please
          contact us at:
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong>{" "}
          <Link href="mailto:reservation@bellaviuholidayhomes.com">
            reservation@bellaviuholidayhomes.com
          </Link>
        </Typography>
        <Typography variant="body1">
          <strong>Phone:</strong>+971 4 570 1618 | +971 50 267 8831
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          10. Refund Policy
        </Typography>
        <Typography variant="body1" paragraph>
          Refunds will be done only through the original mode of payment.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          11. Method of Payment
        </Typography>
        <Typography variant="body1" paragraph>
          We accept payments online using Visa and MasterCard credit/debit cards
          in AED (or any other agreed currency). The logos of the accepted cards
          are displayed on the homepage and payment checkout page.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          12. OFAC Compliance
        </Typography>
        <Typography variant="body1" paragraph>
          This website will NOT deal or provide any services or products to any
          OFAC (Office of Foreign Assets Control) sanctions countries in
          accordance with the law of UAE.
        </Typography>
      </Container>
    </>
  );
};

export default page;
