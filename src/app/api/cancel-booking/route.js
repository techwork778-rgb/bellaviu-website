import { database } from '../../../config/dbconnection';
import { transporter } from '../../../config/emailer';

export async function POST(req) {
  try {
    const { orderIds } = await req.json(); // Expecting an array of order_ids to be passed in the request

    if (!orderIds || orderIds.length === 0) {
      return new Response(JSON.stringify({ error: 'No order IDs provided' }), { status: 400 });
    }
    const fetchTransactionsQuery = `
    SELECT id, amount, currency, status, card_brand, card_number, cardholder_name,creation_time, 
           authentication_status, authorization_code,authentication_transaction_id,merchant_name,merchant_id
    FROM paymenttransactions
    WHERE id IN (?);
  `;
  const [transactionDetails] = await database.query(fetchTransactionsQuery, [orderIds]);

    const fetchBookingsQuery = `
      SELECT order_id, price, property_name, property_id, check_in, check_out, guest_count, user_name, user_id, user_email, phone, created_at
      FROM bookings
      WHERE order_id IN (?);
    `;

    const [bookingDetails] = await database.query(fetchBookingsQuery, [orderIds]);

    if (!bookingDetails || bookingDetails.length === 0) {
      return new Response(JSON.stringify({ error: 'No matching bookings found' }), { status: 404 });
    }

    // Move bookings to the cancel_bookings table
    const moveBookingsQuery = `
      INSERT INTO cancel_bookings (order_id, price, property_name, property_id, check_in, check_out, guest_count, user_name, user_id, user_email, phone, created_at)
      SELECT order_id, price, property_name, property_id, check_in, check_out, guest_count, user_name, user_id, user_email, phone, created_at
      FROM bookings
      WHERE order_id IN (?);
    `;
    await database.query(moveBookingsQuery, [orderIds]);

    // Delete the bookings from the bookings table
    const deleteBookingsQuery = 'DELETE FROM bookings WHERE order_id IN (?);';
    await database.query(deleteBookingsQuery, [orderIds]);

    // Send email notifications for each booking
    for (const booking of bookingDetails) {
      const mailOptions = {
        from: '"BellaViu Holiday Homes" <support@bellaviuholidayhomes.com>',
        to: booking.user_email,
        subject: 'Booking Cancellation Notification',
        html: `
          <h1>Booking Cancellation</h1>
          <p>Dear ${booking.user_name},</p>
          <p>Your booking has been canceled successfully. Here are the details:</p>
          <ul>
            <li><strong>Property Name:</strong> ${booking.property_name}</li>
            <li><strong>Property ID:</strong> ${booking.order_id}</li>
            <li><strong>Check-In:</strong> ${booking.check_in}</li>
            <li><strong>Check-Out:</strong> ${booking.check_out}</li>
            <li><strong>Price:</strong> ${booking.price}</li>
            <li><strong>Guest Count:</strong> ${booking.guest_count}</li>
            <li><strong>Phone:</strong> ${booking.phone}</li>
          </ul>
          <p>If you have any questions, feel free to contact us.</p>
          <p>Best regards,</p>
          <p>Your Booking Team</p>
        `,
      };

      // Send the email
      await transporter.sendMail(mailOptions);
    
    }
    for (const transaction of transactionDetails) {
      
   
    const transactionMailOptions = {
      from: '"BellaViu Holiday Homes" <support@bellaviuholidayhomes.com>',
      to:'nomansk.rabs@gmail.com',
      subject: 'Transaction Details for Your Canceled Booking',
      html: `
        <h1>Transaction Details</h1>
        <p>Here are the transaction details for your canceled booking:</p>
        <ul>
          <li><strong>Transaction ID:</strong> ${transaction.id}</li>
          <li><strong>Amount:</strong> ${transaction.amount} ${transaction.currency}</li>
          <li><strong>Status:</strong> ${transaction.status}</li>
          <li><strong>Card Brand:</strong> ${transaction.card_brand}</li>
          <li><strong>Card Number:</strong> ${transaction.card_number}</li>
          <li><strong>Cardholder Name:</strong> ${transaction.cardholder_name}</li>
          <li><strong>Authentication Status:</strong> ${transaction.authentication_status}</li>
          <li><strong>Authorization Code:</strong> ${transaction.authorization_code}</li>
          <li><strong>Authentication Transaction ID:</strong> ${transaction.authentication_transaction_id}</li>
          <li><strong>Merchant Name:</strong> ${transaction.merchant_name}</li>
          <li><strong>Merchant ID:</strong> ${transaction.merchant_id}</li>
          <li><strong>Creation Date:</strong> ${transaction.creation_time}</li>
        </ul>
        <p>If you have any questions, feel free to contact us.</p>
        <p>Best regards,</p>
        <p>Your Booking Team</p>
      `,
    };

    // Send the transaction details email
    await transporter.sendMail(transactionMailOptions);
  }
    return new Response(JSON.stringify({ message: 'Bookings moved to canceled successfully and emails sent' }), { status: 200 });
  } catch (error) {
    console.error('Error moving bookings:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
