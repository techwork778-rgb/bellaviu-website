import { database } from '../../../../config/dbconnection';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    // Parse the JSON body of the request
    const { first_name, last_name, email, password } = await req.json();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the user already exists in the database
    const [existingUser] = await database.execute(
      'SELECT * FROM users WHERE email_id = ?',
      [email]
    );

    if (existingUser.length > 0) {
  
      return new Response(JSON.stringify({ error: 'User already exists' }), { status: 400 });
    }

    // Insert the new user into the database
    const result = await database.execute(
      'INSERT INTO users (created_dt, updated_dt, first_name, last_name, email_id, password) VALUES (now(), now(), ?, ?, ?, ?)',
      [first_name, last_name, email, hashedPassword]
    );

    // Log the result of the insert query
  

    // Return a success response
    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
  }
}