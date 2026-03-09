// import nodemailer from "nodemailer";

// // Send verification email
// export const transporter = nodemailer.createTransport({
//   host: "162.241.125.121",
//   port: 587,
//   secure: false,
//   auth: {
//     user: "smtp@cicd-frontend.rabs.support",
//     pass: "tv5-mpy%^@Eb",
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },

// });
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: '192.250.234.230',
  port: 587, // or 587
  secure: false,
  auth: {
    user: 'support@bellaviuholidayhomes.com',
    pass: 'Bvsupport@123',
  },
  tls: {
    rejectUnauthorized: false,
  },
  // Optionally specify a HELO name (hostname)name: 'bellaviuholidayhomes.com',
  logger: true,
   debug: true
});
