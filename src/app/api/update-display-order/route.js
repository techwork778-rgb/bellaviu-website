import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function PUT(request) {
  try {
    const newOrder = await request.json();

    // ✅ Save to propertyDataDetails.json
    const detailsPath = path.join(process.cwd(), 'public', 'propertyDataDetails.json');
    fs.writeFileSync(detailsPath, JSON.stringify(newOrder, null, 2));

    // ✅ Load propertyData.json
    const dataPath = path.join(process.cwd(), 'public', 'propertyData.json');
    const existingData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    // ✅ Create a map of new displayOrder by ID from updatedDetails
    const orderMap = {};
    newOrder.forEach((item, index) => {
      orderMap[item.id] = index + 1; // or item.displayOrder if it’s already correct
    });

    // ✅ Sort propertyData.json according to new order in propertyDataDetails.json
    const reorderedData = existingData
      .slice() // shallow copy
      .sort((a, b) => {
        const orderA = orderMap[a.id] || 9999;
        const orderB = orderMap[b.id] || 9999;
        return orderA - orderB;
      })
      .map((item) => ({
        ...item,
        displayOrder: orderMap[item.id] || item.displayOrder || 9999,
      }));

    // ✅ Save the reordered list back to propertyData.json
    fs.writeFileSync(dataPath, JSON.stringify(reorderedData, null, 2));

    return NextResponse.json({ message: 'Display order updated and synced' });
  } catch (error) {
    console.error("Update order error:", error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}