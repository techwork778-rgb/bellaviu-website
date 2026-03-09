// import { writeFile } from "fs/promises";
// import path from "path";
// import fs from "fs";
// import { v4 as uuidv4 } from "uuid"; 
// // Handle POST request to upload form data and save in a JSON file
// export async function POST(req, res) {
//   try {
//     const formData = await req.json();
//     const propertyId = uuidv4();
//     const propertyWithId = { id: propertyId, ...formData };

//     // Ensure images are saved
//     const imgFolderPath = path.join(process.cwd(), "public", "property-img");
//     if (!fs.existsSync(imgFolderPath)) {
//       fs.mkdirSync(imgFolderPath, { recursive: true });
//     }

//     if (formData.images && formData.images.length) {
//       const imagePaths = await Promise.all(formData.images.map(async (imageData, index) => {
//         const imgBuffer = Buffer.from(imageData.split(",")[1], "base64");
//         const imageName = `property-${propertyId}-${index + 1}.png`;
//         const imgPath = path.join(imgFolderPath, imageName);
        
//         await writeFile(imgPath, imgBuffer);
        
//         return `/property-img/${imageName}`;
//       }));

//       propertyWithId.images = imagePaths;
//     }

//     const directoryPath = path.join(process.cwd(), "public", "propertyData.json");

//     // Read existing data properly
//     let existingData = [];
//     try {
//       if (fs.existsSync(directoryPath)) {
//         const fileContent = await fs.promises.readFile(directoryPath, "utf-8");
//         existingData = fileContent ? JSON.parse(fileContent) : [];
//       }
//     } catch (err) {
//       console.log("No existing data found or error reading file:", err);
//     }

//     // Append new property to existing list
//     existingData.push(propertyWithId);

//     // Write back updated data
//     await writeFile(directoryPath, JSON.stringify(existingData, null, 2));

//     console.log(propertyWithId);

//     return new Response(
//       JSON.stringify({ message: 'Property added successfully!' }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error saving property data:", error);
//     return new Response(
//       JSON.stringify({ error: 'Internal server error' }),
//       { status: 500 }
//     );
//   }
// }
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

// Handle POST request to upload form data and save in two JSON files
export async function POST(req) {
  try {
    const formData = await req.json();
  

    // -------------------------
    // Generate new property ID based on existing JSON file
    // -------------------------
    const listPath = path.join(process.cwd(), "public", "propertyData.json");
    let listData = [];
    let maxId = 0;

    if (fs.existsSync(listPath)) {
      const file = await fs.promises.readFile(listPath, "utf-8");
      listData = file ? JSON.parse(file) : [];
      for (const item of listData) {
        const idNum = parseInt(item.id, 10);
        if (!isNaN(idNum) && idNum > maxId) {
          maxId = idNum;
        }
      }
    }

    const propertyId = (maxId + 1);

    // -------------------------
    // Create folder if it doesn't exist
    // -------------------------
    const imgFolderPath = path.join(process.cwd(), "public", "property-img");
    if (!fs.existsSync(imgFolderPath)) {
      fs.mkdirSync(imgFolderPath, { recursive: true });
    }

    // -------------------------
    // Save images
    // -------------------------
    let imageUrls = [];

    if (formData.images && formData.images.length) {
      imageUrls = await Promise.all(
        formData.images.map(async (imageData, index) => {
          const buffer = Buffer.from(imageData.split(",")[1], "base64");
          const filename = `property-${propertyId}-${index + 1}.png`;
          const imgPath = path.join(imgFolderPath, filename);
          await writeFile(imgPath, buffer);
          return `/property-img/${filename}`;
        })
      );
    }

    // -------------------------
    // Prepare Summary Listing Data
    // -------------------------
    const summaryData = {
      id: propertyId,
      name: formData.name,
      propertyType: formData.bed,
      imageUrl: imageUrls[0] || "",
      rating: formData.rating || 10,
      price: Number(formData.price),
      bed: formData.bed,
      maxOccupancy: formData.maxOccupancy,
      reviews: formData.reviews || 50
    };

    // -------------------------
    // Prepare Full Detail Data
    // -------------------------
    const detailData = {
      id: propertyId,
      name: formData.name,
      imageUrl: imageUrls[0] || "",
      images: imageUrls,
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
        : (formData.amenities || "").split(",").map(a => a.trim())
    };

    // -------------------------
    // Write to propertyList.json
    // -------------------------
    listData.push(summaryData);
    await writeFile(listPath, JSON.stringify(listData, null, 2));

    // -------------------------
    // Write to propertyDetails.json
    // -------------------------
    const detailPath = path.join(process.cwd(), "public", "propertyDataDetails.json");
    let detailList = [];
    if (fs.existsSync(detailPath)) {
      const file = await fs.promises.readFile(detailPath, "utf-8");
      detailList = file ? JSON.parse(file) : [];
    }
    detailList.push(detailData);
    await writeFile(detailPath, JSON.stringify(detailList, null, 2));

    return new Response(
      JSON.stringify({ message: 'Property added successfully!' }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Error saving property data:", error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
}

// import { writeFile } from "fs/promises";
// import path from "path";
// import fs from "fs";
// import { v4 as uuidv4 } from "uuid";

// // Handle POST request to upload form data and save in two JSON files
// export async function POST(req) {
//   try {
//     const formData = await req.json();
    
// console.log(formData,"kjkjjk");
//     const imgFolderPath = path.join(process.cwd(), "public", "property-img");
//     if (!fs.existsSync(imgFolderPath)) {
//       fs.mkdirSync(imgFolderPath, { recursive: true });
//     }

//     let imageUrls = [];

//     if (formData.images && formData.images.length) {
//       imageUrls = await Promise.all(
//         formData.images.map(async (imageData, index) => {
//           const buffer = Buffer.from(imageData.split(",")[1], "base64");
//           const filename = `property-${propertyId}-${index + 1}.png`;
//           const imgPath = path.join(imgFolderPath, filename);
//           await writeFile(imgPath, buffer);
//           return `/property-img/${filename}`;
//         })
//       );
//     }

//     // -------------------------
//     // Prepare Summary Listing Data
//     // -------------------------
//     const summaryData = {
//       id: propertyId,
//       name: formData.name,
//       propertyType: formData.bed,
//       imageUrl: imageUrls[0] || "",
//       rating: formData.rating || 10,
//       price: Number(formData.price),
//       bed: formData.bed,
//       maxOccupancy: formData.maxOccupancy,
//       reviews: formData.reviews || 50
//     };

//     // -------------------------
//     // Prepare Full Detail Data
//     // -------------------------
//     const detailData = {
//         id: propertyId,
//       name: formData.name,
//        imageUrl: imageUrls[0] || "",
//       images: imageUrls,
//       price: Number(formData.price),
//       security_deposit: Number(formData.security_deposit),
//       tourismFee: Number(formData.tourismFee),
//       cleaningFee: Number(formData.cleaningFee),
//       bed: formData.bed,
//       maxOccupancy: formData.maxOccupancy,
//       description: formData.description,
//       map: formData.map,
//       amenities: Array.isArray(formData.amenities)
//         ? formData.amenities
//         : (formData.amenities || "").split(",").map(a => a.trim())
//     };

//     // -------------------------
//     // Write to propertyList.json
//     // -------------------------
//     const listPath = path.join(process.cwd(), "public", "propertyData.json");
//     let listData = [];
//     if (fs.existsSync(listPath)) {
//       const file = await fs.promises.readFile(listPath, "utf-8");
//       listData = file ? JSON.parse(file) : [];
//     }
//     listData.push(summaryData);
//     await writeFile(listPath, JSON.stringify(listData, null, 2));

//     // -------------------------
//     // Write to propertyDetails.json
//     // -------------------------
//     const detailPath = path.join(process.cwd(), "public", "propertyDataDetails.json");
//     let detailList = [];
//     if (fs.existsSync(detailPath)) {
//       const file = await fs.promises.readFile(detailPath, "utf-8");
//       detailList = file ? JSON.parse(file) : [];
//     }
//     detailList.push(detailData);
//     await writeFile(detailPath, JSON.stringify(detailList, null, 2));

//     return new Response(
//       JSON.stringify({ message: 'Property added successfully!' }),
//       { status: 200 }
//     );

//   } catch (error) {
//     console.error("Error saving property data:", error);
//     return new Response(
//       JSON.stringify({ error: 'Internal server error' }),
//       { status: 500 }
//     );
//   }
// }
