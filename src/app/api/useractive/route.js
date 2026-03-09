import { database } from '../../../config/dbconnection';

export async function GET(req) {
  try {
    // Query to get all users
    const [rows] = await database.query('SELECT * from users');
    
    // Query to count total number of users
    const [countResult] = await database.query('SELECT COUNT(user_id) AS total_users FROM users');
    
    if (countResult.length === 0) {
      return new Response(JSON.stringify({ users: rows, total_users: 0 }), { status: 200 });
    }

    const { total_users } = countResult[0];
    
    return new Response(JSON.stringify({ users: rows, total_users }), { status: 200 });
  } catch (error) {
    console.error('Error fetching users or total users:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}