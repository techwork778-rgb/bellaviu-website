import { database } from "../../../config/dbconnection";

export async function POST(req) {
  const {
    firstName,
    lastName,
    email,
    phone,
    city,
    propertyType,
    numberOfBedrooms,
    furnishingStatus,
    buildingName,
    communityName,
    message,
  } = await req.json();

  try {
    // Updated SQL query to include the three checkbox fields
    const query = `
      INSERT INTO user_property 
        (firstname, lastname, email, phone, city, property_type, no_bedrooms, furnishing_status, building_name, community,message, created_dt, updated_dt)
      VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, NOW(), NOW())`;

    const values = [
        firstName,
        lastName,
        email,
        phone,
        city,
        propertyType,
        numberOfBedrooms,
        furnishingStatus,
        buildingName,
        communityName,  // Added communityName field
        message,
    ];

    await database.query(query, values);
    return new Response(JSON.stringify({ message: 'List Property added successfully!',status: 200 }));
  } catch (error) {
    console.error('Error saving property:', error);
    return new Response(JSON.stringify({ error: 'Internal server error',status: 500 }));
  }
}
