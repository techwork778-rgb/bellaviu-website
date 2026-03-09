import { database } from "@/config/dbconnection";
import fs from "fs";
import path from "path";

export async function DELETE(req) {
  try {
    const { userIds } = await req.json();

    if (!userIds || userIds.length === 0) {
      return new Response(JSON.stringify({ error: "No user IDs provided" }), { status: 400 });
    }

    // Fetch resume paths for users before deleting
    const getResumesQuery = `SELECT resume_path FROM career WHERE id IN (${userIds.map(() => "?").join(",")})`;
    const [resumes] = await database.query(getResumesQuery, userIds);

    // Delete files from the server
    for (const resume of resumes) {
      if (resume.resume_path) {
        const filePath = path.join(process.cwd(), "uploads", resume.resume_path); // Adjust path as needed
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath); // Delete file
        }
      }
    }

    // Delete career applications from database
    const deleteQuery = `DELETE FROM career WHERE id IN (${userIds.map(() => "?").join(",")})`;
    await database.query(deleteQuery, userIds);

    return new Response(JSON.stringify({ message: "Deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error deleting career applications:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
