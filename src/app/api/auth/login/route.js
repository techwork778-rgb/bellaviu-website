import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { database } from "../../../../config/dbconnection";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Query the database for the user
    const [rows] = await database.execute(
      "SELECT user_id, first_name, last_name, email_id, password, type FROM users WHERE email_id = ?",
      [email]
    );

    // Check if user exists
    if (rows.length === 0) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password", status: 401 }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const user = rows[0];

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password", status: 401 }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Set secure cookies with proper flags
    const cookieStore = cookies();
    const isSecure = process.env.NODE_ENV === 'production';
    
    cookieStore.set("user_id", user.user_id, { 
      httpOnly: true, 
      secure: isSecure, 
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    });
    cookieStore.set("first_name", user.first_name, { 
      httpOnly: true, 
      secure: isSecure, 
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30
    });
    cookieStore.set("last_name", user.last_name, { 
      httpOnly: true, 
      secure: isSecure, 
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30
    });
    cookieStore.set("email", user.email_id, { 
      httpOnly: true, 
      secure: isSecure, 
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30
    });
    cookieStore.set("type", user.type, { 
      httpOnly: true, 
      secure: isSecure, 
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30
    });

    // Return a success response with user details (exclude sensitive info)
    const userData = {
      userId: user.user_id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email_id,
      type: user.type,
    };
  
    return new Response(
      JSON.stringify({ message: "Login successful", status: 200, data: userData }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Login failed", status: 500 }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
