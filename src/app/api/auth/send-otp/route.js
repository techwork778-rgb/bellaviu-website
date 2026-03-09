import { transporter } from '../../../../config/emailer';
import { database } from '../../../../config/dbconnection';
import { cookies } from 'next/headers'

export async function POST(req) {
  try {
    // Parse the request body (assuming it's JSON)
    const { first_name, last_name, email, password } = await req.json();  // Await here to resolve the promise
    
       // Check if the user already exists in the database
       const [existingUser] = await database.execute(
        'SELECT * FROM users WHERE email_id = ?',
        [email]
      );
  
      if (existingUser.length > 0) {
      
        return new Response(JSON.stringify({ error: 'User already exists' }), { status: 400 });
      }
  
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Mail options
    const mailOptions = {
      from:  '"BellaViu Holiday Homes" <support@bellaviuholidayhomes.com>',
      to: email,
      subject: 'Your OTP Code',
      text: `Your one-time password (OTP) is ${otp}. This code is valid for 5 minutes. If you did not request this, please contact our support team immediately.`,
    };

    // Send OTP email
    await transporter.sendMail(mailOptions);

    // Set the cookies
    const firstNameCookie = `first_name=${encodeURIComponent(first_name)}`;
    const lastNameCookie = `last_name=${encodeURIComponent(last_name)}`;
    const emailCookie = `email=${encodeURIComponent(email)}`;
    const passwordCookie = `password=${encodeURIComponent(password)}`;
    const otpCookie = `otp=${otp}`;

    // Return a successful response with the cookies in the headers
    return new Response(JSON.stringify({ success: "OTP sent successfully", status: 200 }), {
      status: 200,
      headers: {
        'Set-Cookie': [
            firstNameCookie,
          lastNameCookie,
          emailCookie,
          passwordCookie,
          otpCookie,
        ],
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process the request', status: 500 }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
