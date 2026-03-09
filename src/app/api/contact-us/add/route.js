import { database } from "../../../../config/dbconnection";

export async function POST(req) {
  const {
    name,
    email,
    message
  } = await req.json();

  try {
    // Updated SQL query to include the three checkbox fields
    const query = `
      INSERT INTO contact_us 
        (name, email_id, message, created_dt)
      VALUES 
        (?, ?, ?, NOW())`;

    const values = [
        name,
        email,
        message,
    ];

    await database.query(query, values);
    return new Response(JSON.stringify({ message: 'We will get back to you soon. Your message has been added successfully!',status: 200 }));
  } catch (error) {
    console.error('Error saving contact us:', error);
    return new Response(JSON.stringify({ error: 'Internal server error',status: 500 }));
  }
}
