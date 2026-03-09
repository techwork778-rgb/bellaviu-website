// import { database } from "../../../config/dbconnection";

// export async function GET(req) {
//   try {
//     // Query to fetch all data from the user_property table
//     const query = `SELECT * FROM user_property`;
//     const [rows] = await database.query(query); // Fetch data from the database
    
//     // Respond with the retrieved data
//     return new Response(JSON.stringify({ 
//       message: 'Properties fetched successfully!', 
//       data: rows, 
//       status: 200 
//     }), { 
//       headers: { "Content-Type": "application/json" }
//     });
//   } catch (error) {
//     console.error('Error fetching properties:', error);
//     return new Response(JSON.stringify({ 
//       error: 'Internal server error', 
//       status: 500 
//     }), { 
//       headers: { "Content-Type": "application/json" }
//     });
//   }
// }
import { database } from "../../../config/dbconnection";


export async function GET(req) {
  try {
    const [rows] = await database.query('SELECT * from user_property');
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
