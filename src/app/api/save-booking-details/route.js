// import { database } from "@/config/dbconnection";
// import { parse, isValid, format } from "date-fns";

// export async function POST(req) {
//   try {
//     const { orderId, orderSummary } = await req.json();

//     const checkQuery = `
//       SELECT * FROM bookings WHERE order_id = ?;
//     `;
//     const [existingBooking] = await database.execute(checkQuery, [orderId]);

//     if (existingBooking.length > 0) {
//       return new Response(
//         JSON.stringify({ message: "Booking details already saved" }),
//         { status: 200 }
//       );
//     }

//     const bookingData = {
//       price: orderSummary.find((item) => item.key === "Price")?.value,
//       propertyName: orderSummary.find((item) => item.key === "PropertyName" && isNaN(item.value))?.value,
//       propertyId: orderSummary.find((item) => item.key === "PropertyId" && !isNaN(item.value))?.value,
//       checkIn: orderSummary.find((item) => item.key === "CheckIn")?.value,
//       checkOut: orderSummary.find((item) => item.key === "CheckOut")?.value,
//       guestCount: orderSummary.find((item) => item.key === "Guest")?.value,
//       userName: orderSummary.find((item) => item.key === "User")?.value,
//       userId: orderSummary.find((item) => item.key === "UserId")?.value,
//       userEmail: orderSummary.find((item) => item.key === "UserEmail")?.value,
//       phone: orderSummary.find((item) => item.key === "Phone")?.value,
//     };

//     console.log("Raw checkIn:", bookingData.checkIn);
//     console.log("Raw checkOut:", bookingData.checkOut);

//     // Define possible date formats
//     const dateFormats = ["dd/MM/yyyy", "MM/dd/yyyy", "yyyy-MM-dd","M/dd/yyyy"];

//     // Function to parse dates with fallback
//     const parseDate = (dateString) => {
//       for (const formatString of dateFormats) {
//         const parsedDate = parse(dateString, formatString, new Date());
//         if (isValid(parsedDate)) {
//           return parsedDate;
//         }
//       }
//       throw new Error(`Unable to parse date: ${dateString}`);
//     };

//     // Parse and format the dates
//     const parsedCheckIn = parseDate(bookingData.checkIn);
//     const parsedCheckOut = parseDate(bookingData.checkOut);

//     const formattedCheckIn = format(parsedCheckIn, "yyyy-MM-dd");
//     const formattedCheckOut = format(parsedCheckOut, "yyyy-MM-dd");

//     console.log("Formatted checkIn:", formattedCheckIn);
//     console.log("Formatted checkOut:", formattedCheckOut);

//     bookingData.checkIn = formattedCheckIn;
//     bookingData.checkOut = formattedCheckOut;

//     const insertQuery = `
//       INSERT INTO bookings (
//         order_id, 
//         price, 
//         property_name, 
//         property_id, 
//         check_in, 
//         check_out, 
//         guest_count, 
//         user_name, 
//         user_id, 
//         user_email, 
//         phone
//       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
//     `;

//     const [savedBooking] = await database.execute(insertQuery, [
//       orderId,
//       bookingData.price,
//       bookingData.propertyName,
//       bookingData.propertyId,
//       bookingData.checkIn,
//       bookingData.checkOut,
//       bookingData.guestCount,
//       bookingData.userName,
//       bookingData.userId,
//       bookingData.userEmail,
//       bookingData.phone,
//     ]);

//     return new Response(
//       JSON.stringify({ message: "Booking details saved successfully", data: savedBooking }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error saving booking details:", error);
//     return new Response(
//       JSON.stringify({ error: "Failed to save booking details", details: error.message }),
//       { status: 500 }
//     );
//   }
// }

import { database } from "@/config/dbconnection";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { transporter } from '../../../config/emailer';
dayjs.extend(customParseFormat);

export async function POST(req) {
  try {
    const { orderId, orderSummary,orderDetails,uploadedFile } = await req.json();
   console.log(uploadedFile,"kkll");
    const checkQuery = `
      SELECT * FROM bookings WHERE order_id = ?;
    `;
    const [existingBooking] = await database.execute(checkQuery, [orderId]);

    if (existingBooking.length > 0) {
      return new Response(
        JSON.stringify({ message: "Booking details already saved" }),
        { status: 200 }
      );
    }

    const bookingData = {
      price: orderSummary.find((item) => item.key === "Price")?.value,
      propertyName: orderSummary.find((item) => item.key === "PropertyName" && isNaN(item.value))?.value,
      propertyId: orderSummary.find((item) => item.key === "PropertyId" && !isNaN(item.value))?.value,
      checkIn: orderSummary.find((item) => item.key === "CheckIn")?.value,
      checkOut: orderSummary.find((item) => item.key === "CheckOut")?.value,
      guestCount: orderSummary.find((item) => item.key === "Guest")?.value,
      userName: orderSummary.find((item) => item.key === "User")?.value,
      userId: orderSummary.find((item) => item.key === "UserId")?.value,
      userEmail: orderSummary.find((item) => item.key === "UserEmail")?.value,
      phone: orderSummary.find((item) => item.key === "Phone")?.value,
    };

   

    // Define possible date formats
    const dateFormats = ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD", "M/DD/YYYY","D/MM/YYYY"];

    // Function to parse dates with fallback
    const parseDate = (dateString) => {
      for (const formatString of dateFormats) {
        const parsedDate = dayjs(dateString, formatString, true); // Strict parsing
        if (parsedDate.isValid()) {
          return parsedDate;
        }
      }
      throw new Error(`Unable to parse date: ${dateString}`);
    };

    // Parse and format the dates
    const parsedCheckIn = parseDate(bookingData.checkIn);
    const parsedCheckOut = parseDate(bookingData.checkOut);

    const formattedCheckIn = parsedCheckIn.format("YYYY-MM-DD");
    const formattedCheckOut = parsedCheckOut.format("YYYY-MM-DD");

   

    bookingData.checkIn = formattedCheckIn;
    bookingData.checkOut = formattedCheckOut;

    const insertQuery = `
      INSERT INTO bookings (
        order_id, 
        price, 
        property_name, 
        property_id, 
        check_in, 
        check_out, 
        guest_count, 
        user_name, 
        user_id, 
        user_email, 
        phone,
        uploaded_file
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?);
    `;

    const [savedBooking] = await database.execute(insertQuery, [
      orderId,
      bookingData.price,
      bookingData.propertyName,
      bookingData.propertyId,
      bookingData.checkIn,
      bookingData.checkOut,
      bookingData.guestCount,
      bookingData.userName,
      bookingData.userId,
      bookingData.userEmail,
      bookingData.phone,
      uploadedFile
    ]);
  
    const transactionData = {
      id: orderDetails.id ?? null,
      amount: orderDetails.amount ?? null,
      currency: orderDetails.currency ?? null,
      status: orderDetails.status ?? null,
      creation_time: orderDetails.creationTime ? dayjs(orderDetails.creationTime).format("YYYY-MM-DD HH:mm:ss") : null,
      last_updated_time: orderDetails.lastUpdatedTime ? dayjs(orderDetails.lastUpdatedTime).format("YYYY-MM-DD HH:mm:ss") : null,
      card_brand: orderDetails.sourceOfFunds?.provided?.card?.brand ?? null,
      card_number: orderDetails.sourceOfFunds?.provided?.card?.number ?? null,
      cardholder_name: orderDetails.sourceOfFunds?.provided?.card?.nameOnCard ?? null,
      card_expiry_month: orderDetails.sourceOfFunds?.provided?.card?.expiry?.month ?? null,
      card_expiry_year: orderDetails.sourceOfFunds?.provided?.card?.expiry?.year ?? null,
      authentication_version: orderDetails.authenticationVersion ?? null,
      authentication_status: orderDetails.authenticationStatus ?? null,
      authentication_code: orderDetails.transaction[1].transaction.authorizationCode ?? null,
      authentication_token: orderDetails.authentication["3ds"]?.authenticationToken ?? null,
      authentication_transaction_id: orderDetails.authentication["3ds"]?.transactionId ?? null,
      merchant_name: orderDetails.merchant ?? null,
      merchant_id:orderDetails.transaction[1].transaction.acquirer.merchantId ?? null,
    };

    const insertTransactionQuery = `
      INSERT INTO PaymentTransactions (
        id, amount, currency, status, creation_time, last_updated_time,
        card_brand, card_number, cardholder_name, card_expiry_month, card_expiry_year,
        authentication_version, authentication_status,authorization_code ,authentication_token,authentication_transaction_id, merchant_name, merchant_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?);
    `;

    await database.execute(insertTransactionQuery, [
      transactionData.id,
      transactionData.amount,
      transactionData.currency,
      transactionData.status,
      transactionData.creation_time,
      transactionData.last_updated_time,
      transactionData.card_brand,
      transactionData.card_number,
      transactionData.cardholder_name,
      transactionData.card_expiry_month,
      transactionData.card_expiry_year,
      transactionData.authentication_version,
      transactionData.authentication_status,
      transactionData.authentication_code,
      transactionData.authentication_token,
      transactionData.authentication_transaction_id,
      transactionData.merchant_name,
      transactionData.merchant_id
    ]);

    const mailOptions = {
      from: '"BellaViu Holiday Homes" <support@bellaviuholidayhomes.com>',
      to: bookingData.userEmail,
      subject: 'Booking Confirmation',
      html: `
        <h1>Booking Confirmation</h1>
        <p>Dear ${bookingData.userName},</p>
        <p>Your booking has been confirmed successfully! Here are the details:</p>
        <ul>
          <li><strong>Property Name:</strong> ${bookingData.propertyName}</li>
          <li><strong>Check-In:</strong> ${bookingData.checkIn}</li>
          <li><strong>Check-Out:</strong> ${bookingData.checkOut}</li>
          <li><strong>Price:</strong> ${bookingData.price}</li>
          <li><strong>Guest Count:</strong> ${bookingData.guestCount}</li>
          <li><strong>Phone:</strong> ${bookingData.phone}</li>
        </ul>
        <p>Thank you for choosing our service! If you have any questions, feel free to contact us.</p>
        <p>Best regards,</p>
        <p>Your Booking Team</p>
      `,
    };

    // Send the booking confirmation email
    await transporter.sendMail(mailOptions);
    return new Response(
      JSON.stringify({ message: "Booking details saved successfully", data: savedBooking }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving booking details:", error);
    return new Response(
      JSON.stringify({ error: "Failed to save booking details", details: error.message }),
      { status: 500 }
    );
  }
}
