// /app/api/upload/route.js (Next.js App Router)
import fs from "fs";
import path from "path";

export async function POST(req) {
  const { base64, filename } = await req.json();

  if (!base64 || !filename) {
    return Response.json({ error: "Missing data" }, { status: 400 });
  }

  try {
    const base64Data = base64.replace(/^data:.+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    const safeFilename = `${Date.now()}-${filename}`;
    const uploadPath = path.join(process.cwd(), "public", "uploads", safeFilename);

    fs.writeFileSync(uploadPath, buffer);

    return Response.json({
      success: true,
      filename: safeFilename,
      url: `/uploads/${safeFilename}`,
    });
  } catch (err) {
    return Response.json({ error: "Failed to save file" }, { status: 500 });
  }
}
