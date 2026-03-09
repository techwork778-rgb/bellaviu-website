import { writeFile, readFile } from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "public/propertyData.json");

export async function POST(req) {
  try {
    const { selectedIds } = await req.json(); // Correctly parsing JSON body

    if (!Array.isArray(selectedIds) || selectedIds.length === 0) {
      return new Response(
        JSON.stringify({ error: "No properties selected for deletion" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Read and parse the JSON file
    const fileData = await readFile(filePath, "utf-8");
    const properties = JSON.parse(fileData);

    // Filter out properties to delete
    const updatedProperties = properties.filter(
      (property) => !selectedIds.includes(property.id)
    );

    // Write the updated data back to the file
    await writeFile(filePath, JSON.stringify(updatedProperties, null, 2), "utf-8");

    return new Response(
      JSON.stringify({ message: "Properties deleted successfully!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error deleting properties:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
