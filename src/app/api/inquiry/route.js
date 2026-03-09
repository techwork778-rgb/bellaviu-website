
import { database } from '../../../config/dbconnection';

// Use named export for POST method
export async function POST(req) {
  const { full_name, phone_number, email, arrival_date, check_out_date, guests, note } = await req.json();

  try {
    const query = 'INSERT INTO booking_inquiries (full_name, phone_number, email, arrival_date, check_out_date, guests, note) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [full_name, phone_number, email, arrival_date, check_out_date, guests, note];

    await database.query(query, values);

    return new Response(JSON.stringify({ message: 'Inquiry saved successfully!' }), { status: 200 });
  } catch (error) {
    console.error('Error saving inquiry:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
