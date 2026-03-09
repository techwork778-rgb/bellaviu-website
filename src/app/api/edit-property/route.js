import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

export async function PUT(req) {
  try {
    const formData = await req.json();
    

    const propertyId = formData.id;
    if (!propertyId) {
      return new Response(
        JSON.stringify({ error: "Property ID is required for update." }),
        { status: 400 }
      );
    }

    // Create image folder if it doesn't exist
    const imgFolderPath = path.join(process.cwd(), "public", "property-img");
    if (!fs.existsSync(imgFolderPath)) {
      fs.mkdirSync(imgFolderPath, { recursive: true });
    }

    // Prepare image URLs
    let imageUrls = [];

    // Separate existing and new images
    const existingImages = Array.isArray(formData.images)
      ? formData.images.filter((img) => img.startsWith("/property-img/"))
      : [];

    const newBase64Images = Array.isArray(formData.images)
      ? formData.images.filter((img) => img.startsWith("data:image/"))
      : [];

    imageUrls.push(...existingImages);

    for (let i = 0; i < newBase64Images.length; i++) {
      const base64Raw = newBase64Images[i];
      const cleanedBase64 = base64Raw.split(",")[1];
      if (!cleanedBase64) continue;

      const buffer = Buffer.from(cleanedBase64, "base64");
      const filename = `property-${propertyId}-${Date.now()}-${i + 1}.png`;
      const imgPath = path.join(imgFolderPath, filename);

      try {
        await writeFile(imgPath, buffer);
        imageUrls.push(`/property-img/${filename}`);
      } catch (err) {
        console.error(`Failed to write image ${filename}:`, err);
      }
    }

    // === Update Summary JSON ===
    const listPath = path.join(process.cwd(), "public", "propertyData.json");
    let listData = [];
    if (fs.existsSync(listPath)) {
      const file = await fs.promises.readFile(listPath, "utf-8");
      listData = file ? JSON.parse(file) : [];
    }

    const summaryIndex = listData.findIndex((p) => String(p.id) === String(propertyId));
    if (summaryIndex === -1) {
      return new Response(
        JSON.stringify({ error: "Property not found in summary list" }),
        { status: 404 }
      );
    }

    listData[summaryIndex] = {
      ...listData[summaryIndex],
      name: formData.name,
      propertyType: formData.bed,
      imageUrl: imageUrls[0] || listData[summaryIndex].imageUrl,
      rating: formData.rating ?? listData[summaryIndex].rating,
      price: Number(formData.price),
      bed: formData.bed,
      maxOccupancy: formData.maxOccupancy,
      reviews: formData.reviews ?? listData[summaryIndex].reviews,
    };

    await writeFile(listPath, JSON.stringify(listData, null, 2));

    // === Update Details JSON ===
    const detailPath = path.join(process.cwd(), "public", "propertyDataDetails.json");
    let detailList = [];
    if (fs.existsSync(detailPath)) {
      const file = await fs.promises.readFile(detailPath, "utf-8");
      detailList = file ? JSON.parse(file) : [];
    }

    const detailIndex = detailList.findIndex((p) => p.id === propertyId);
    if (detailIndex === -1) {
      return new Response(
        JSON.stringify({ error: "Property not found in detail list" }),
        { status: 404 }
      );
    }

    detailList[detailIndex] = {
      ...detailList[detailIndex],
      name: formData.name,
      imageUrl: imageUrls[0] || detailList[detailIndex].imageUrl,
      images: imageUrls.length > 0 ? imageUrls : detailList[detailIndex].images,
      price: Number(formData.price),
      security_deposit: Number(formData.security_deposit),
      tourismFee: Number(formData.tourismFee),
      cleaningFee: Number(formData.cleaningFee),
      bed: formData.bed,
      maxOccupancy: formData.maxOccupancy,
      description: formData.description,
      map: formData.map,
      amenities: Array.isArray(formData.amenities)
        ? formData.amenities
        : (formData.amenities || "").split(",").map((a) => a.trim()),
    };

    await writeFile(detailPath, JSON.stringify(detailList, null, 2));

    return new Response(
      JSON.stringify({ message: "Property updated successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating property data:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
