import { database, testDatabaseConnection } from '@/config/dbconnection';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export async function POST(req) {
  try {
    // Test database connection first
    const dbConnected = await testDatabaseConnection();
    if (!dbConnected) {
      console.error('Database connection test failed');
      return new Response(
        JSON.stringify({ error: "Database connection failed" }),
        { status: 500 }
      );
    }

    const body = await req.json();
    
    const { first_name, email_id } = body;
    const last_name = body.last_name || ''; // Make last_name optional
    
    console.log('Extracted fields:', { first_name, last_name, email_id });

    if (!first_name || !email_id) {
      console.log('Validation failed - missing required fields:', { 
        first_name: !!first_name, 
        email_id: !!email_id 
      });
      return new Response(
        JSON.stringify({ error: "Missing required fields: first_name and email_id are required" }),
        { status: 400 }
      );
    }

    // Check if the user already exists
    const checkUserQuery = `SELECT user_id, first_name, last_name, email_id FROM users WHERE email_id = ?`;
    console.log('Executing query:', checkUserQuery, 'with email:', email_id);
    
    const [existingUser] = await database.execute(checkUserQuery, [email_id]);
    console.log('Database response:', existingUser);

    if (existingUser.length > 0) {
      console.log('User already exists, returning user data');
      return new Response(JSON.stringify(existingUser), { status: 200 });
    }

    // ✅ Secure random password instead of Math.random()
    const randomPassword = crypto.randomBytes(8).toString('hex');
    const hashedPassword = await bcrypt.hash(randomPassword, 12);

    // ✅ Insert user using prepared statement
    const insertQuery = `INSERT INTO users (created_dt, updated_dt, first_name, last_name, email_id, password) VALUES (now(), now(), ?, ?, ?, ?)`;
    console.log('Inserting user with query:', insertQuery, 'values:', { first_name, last_name, email_id });
    
    const [result] = await database.execute(
      insertQuery,
      [first_name, last_name, email_id, hashedPassword]
    );
    
    console.log('Insert result:', result);

    // Return the newly created user data
    const [newUser] = await database.execute(
      "SELECT user_id, first_name, last_name, email_id FROM users WHERE email_id = ?",
      [email_id]
    );
    
    console.log('New user created:', newUser[0]);
    return new Response(JSON.stringify(newUser[0]), { status: 201 });

  } catch (error) {
    console.log('Error in saveUser:', error);
    return new Response(
      JSON.stringify({ error: "Failed to save user data", details: error.message }),
      { status: 500 }
    );
  }
}