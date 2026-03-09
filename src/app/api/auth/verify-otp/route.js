import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { database } from "../../../../config/dbconnection";

export async function POST(req) {
  try {
    const { otp } = await req.json();
    // Retrieve cookies from the request
    const cookieStore = cookies();

    // Access specific cookies by their names
    const firstName = cookieStore.get("first_name");
    const lastName = cookieStore.get("last_name");
    const email = cookieStore.get("email");
    const password = cookieStore.get("password");
    const Generatedotp = cookieStore.get("otp");

    // Check if cookies exist and handle them
    if (!firstName || !lastName || !email || !password || !Generatedotp) {
      return new Response(
        JSON.stringify({ error: "Missing required cookies" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const user = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
    }

    // Check if OTP is valid
    if (otp !== Generatedotp.value) {
      return new Response(JSON.stringify({ message: "Invalid OTP",status: 201 }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const hashedPassword = await bcrypt.hash(password.value, 10);

    // Insert the new user into the database
    const [result] = await database.execute(
      "INSERT INTO users (created_dt, updated_dt, first_name, last_name, email_id, password) VALUES (now(), now(), ?, ?, ?, ?)",
      [firstName.value, lastName.value, email.value, hashedPassword]
    );

    if (result.affectedRows > 0) {
      user.userId = result.insertId; 
    }
 
    // Return the cookies as a response (or handle them as needed)
    return new Response(
      JSON.stringify({ message: "OTP verified successfully", status: 200, data:user}),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to retrieve cookies",status: 201 }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
