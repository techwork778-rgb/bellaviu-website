
import { database } from '../../../config/dbconnection';

export async function GET(req) {
  try {
    // Parse the `property_id` from the query string
    const url = new URL(req.url);
    const propertyId = url.searchParams.get('property_id');

    if (!propertyId) {
      return new Response(JSON.stringify({ error: 'Property ID is required' }), { status: 400 });
    }

    // Query the database to get bookings for the specific property_id
    const [rows] = await database.query(
      'SELECT check_in, check_out FROM bookings WHERE property_id = ?',
      [propertyId]
    );

    if (rows.length === 0) {
      return new Response(JSON.stringify({ message: 'No bookings found for the specified property' }), { status: 200 });
    }

    // Map the data to return only checkin_date and checkout_date
    const bookedDates = rows.map(({ check_in, check_out }) => ({
      checkin_date: check_in,
      checkout_date: check_out,
    }));

    return new Response(JSON.stringify(bookedDates), { status: 200 });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
