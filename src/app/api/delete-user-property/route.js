import { database } from "../../../config/dbconnection"; // Import database connection

export async function DELETE(req) {
  try {
    // Get the list of `up_id`s (user property IDs) from the request body
    const { upIds } = await req.json();

    // Validate if `upIds` is provided and not empty
    if (!upIds || upIds.length === 0) {
      return new Response(
        JSON.stringify({ error: "No property IDs provided" }),
        { status: 400 }
      );
    }

    // Create placeholders for SQL query, for example: `DELETE FROM user_property WHERE up_id IN (?, ?, ?)`
    const placeholders = upIds.map(() => "?").join(", ");
    const query = `DELETE FROM user_property WHERE up_id IN (${placeholders})`;

    // Execute the deletion query
    await database.query(query, upIds);

    // Return a success message
    return new Response(
      JSON.stringify({ message: "User properties deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user properties:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
