import { database } from '../../../config/dbconnection';


export async function GET(req) {
  try {
    const [rows] = await database.query('SELECT * from career');
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}