import { NextResponse } from "next/server";
import { join } from "path";
import fs from "fs";

export const runtime = "nodejs"; // Ensure server-side execution

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const fileName = searchParams.get("fileName"); // Get the file name from the query params

    if (!fileName) {
      return NextResponse.json({ error: "No file specified" }, { status: 400 });
    }

    const filePath = join(process.cwd(), "uploads", fileName); // Get the full path to the file

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath); // Read the file into a buffer

    // Determine the MIME type (this can be enhanced for different file types)
    const mimeType = "application/pdf"; // Default to PDF for simplicity

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `inline; filename="${fileName}"`, // Force download
      },
    });
  } catch (error) {
    console.error("Error serving file:", error);
    return NextResponse.json({ error: "Failed to retrieve file" }, { status: 500 });
  }
}
