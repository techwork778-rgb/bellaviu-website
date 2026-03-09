import { database } from '../../../config/dbconnection';

export async function GET(req) {
  try {
    // Extract userId from query parameters
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'User ID is required' }),
        { status: 400 }
      );
    }

    // Query specific columns (you can replace the column names as needed)
    const query = `
      SELECT 
        property_name, 
        property_id, 
        order_id,
        check_in, 
        check_out, 
        guest_count, 
        price 
      FROM cancel_bookings 
      WHERE user_id = ?`;

    const [rows] = await database.query(query, [userId]);

    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
}
