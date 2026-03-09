import { database } from '../../../config/dbconnection';

export async function GET(req) {
  try {
    // Query to fetch the total number of contacts
    const countQuery = "SELECT COUNT(contact_us_id) AS total_contacts FROM contact_us";
    const [countResult] = await database.query(countQuery); // Execute the query
    const totalContacts = countResult[0]?.total_contacts || 0; // Safely access total_contacts
  
    // Respond with the total count
    return new Response(
      JSON.stringify({
        message: "Total contacts count fetched successfully!",
        total_contacts: totalContacts, // Include the total count
        status: 200,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching total contacts count:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        status: 500,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
// import { database } from '../../../config/dbconnection';

// export async function GET(req) {
//   try {
//     console.log("Starting the GET request handler...");

//     // Query to fetch all data from the contact_us table
//     const query = "SELECT * FROM contact_us";
//     console.log("Executing query to fetch all contact_us data:", query);

//     const [rows] = await database.query(query); // Fetch data from the database
//     console.log("Fetched contact_us data:", rows);

//     // Query to fetch the total number of contacts
//     const countQuery = "SELECT COUNT(contact_us_id) AS total_contacts FROM contact_us";
//     console.log("Executing query to count total contacts:", countQuery);

//     const [countResult] = await database.query(countQuery); // Fetch count data
//     const totalContacts = countResult[0]?.total_contacts || 0; // Safely access total_contacts
//     console.log("Total contacts fetched:", totalContacts);

//     // Respond with the retrieved data and total contacts
//     const response = {
//       message: "Contacts fetched successfully!",
//       data: rows, // Include all contact_us data
//       total_contacts: totalContacts, // Include the total count
//       status: 200,
//     };
//     console.log("Response to be sent:", response);

//     return new Response(JSON.stringify(response), {
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Error fetching contacts:", error);

//     const errorResponse = {
//       error: "Internal server error",
//       status: 500,
//     };
//     console.log("Error response to be sent:", errorResponse);

//     return new Response(JSON.stringify(errorResponse), {
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }