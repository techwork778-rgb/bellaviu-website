import { database } from '../../../config/dbconnection';

export async function DELETE(req) {
  try {
    const { userIds } = await req.json();  

    if (!userIds || userIds.length === 0) {
      return new Response(JSON.stringify({ error: 'No user IDs provided' }), { status: 400 });
    }

    // Create placeholders for SQL query, for example: `DELETE FROM users WHERE user_id IN (?, ?, ?)`
    const placeholders = userIds.map(() => '?').join(', ');
    const query = `DELETE FROM users WHERE user_id IN (${placeholders})`;

    // Execute the deletion query
    await database.query(query, userIds);

    return new Response(JSON.stringify({ message: 'Users deleted successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error deleting users:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}