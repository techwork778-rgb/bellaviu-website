// import { database } from "../../../../config/dbconnection";

// export async function DELETE(req) {
//   try {
//     const { id } = await req.json();

//     // Query to delete data from the contact_us table
//     const query = `DELETE FROM contact_us WHERE contact_us_id = ?`;
//     const values = [id];
    
//     const [rows] = await database.query(query, values); // Execute the deletion query

//     return new Response(JSON.stringify({ 
//       message: 'Contact Us deleted successfully!', 
//       status: 200 
//     }), { 
//       headers: { "Content-Type": "application/json" }
//     });
//   } catch (error) {
//     console.error('Error deleting contact us:', error);
//     return new Response(JSON.stringify({ 
//       error: 'Internal server error', 
//       status: 500 
//     }), { 
//       headers: { "Content-Type": "application/json" }
//     });
//   }
// }



import { database } from "../../../../config/dbconnection";

export async function DELETE(req) {
  try {
    const { userIds } = await req.json();  

    if (!userIds || userIds.length === 0) {
      return new Response(JSON.stringify({ error: 'No user IDs provided' }), { status: 400 });
    }

    // Create placeholders for SQL query, for example: `DELETE FROM contact_us WHERE contact_us_id IN (?, ?, ?)`
    const placeholders = userIds.map(() => '?').join(', ');
    const query = `DELETE FROM contact_us WHERE contact_us_id IN (${placeholders})`;

    // Execute the deletion query
    await database.query(query, userIds);

    return new Response(JSON.stringify({ message: 'Contact records deleted successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error deleting contact records:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
