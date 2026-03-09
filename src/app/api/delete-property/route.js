import fs from "fs";
import { promises as fsp } from "fs";
import path from "path";

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    if (!id) {
      return new Response(JSON.stringify({ error: "Property ID is required" }), {
        status: 400,
      });
    }

    const summaryPath = path.join(process.cwd(), "public", "propertyData.json");
    const detailPath = path.join(process.cwd(), "public", "propertyDataDetails.json");

    let summaryData = [];
    let detailData = [];

    if (fs.existsSync(summaryPath)) {
      const file = await fsp.readFile(summaryPath, "utf-8");
      summaryData = JSON.parse(file || "[]");
    }

    if (fs.existsSync(detailPath)) {
      const file = await fsp.readFile(detailPath, "utf-8");
      detailData = JSON.parse(file || "[]");
    }

    // Remove from summary
    summaryData = summaryData.filter((item) => String(item.id) !== String(id));
    await fsp.writeFile(summaryPath, JSON.stringify(summaryData, null, 2));

    // Remove from detail and collect images to delete
    const propertyToDelete = detailData.find((p) => String(p.id) === String(id));
    const imagesToDelete = propertyToDelete?.images || [];

    detailData = detailData.filter((item) => String(item.id) !== String(id));
    await fsp.writeFile(detailPath, JSON.stringify(detailData, null, 2));

    // Delete associated images
    const imgFolderPath = path.join(process.cwd(), "public", "property-img");
    for (const imgUrl of imagesToDelete) {
      const fileName = imgUrl.replace("/property-img/", "");
      const filePath = path.join(imgFolderPath, fileName);
      if (fs.existsSync(filePath)) {
        await fsp.unlink(filePath);
      }
    }

    return new Response(JSON.stringify({ message: "Property deleted successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting property:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}