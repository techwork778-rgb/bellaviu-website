import { writeFile } from 'fs/promises';
import { NextRequest } from 'next/server';
import { join } from 'path';
import { database } from '@/config/dbconnection'; // Make sure this is the correct import for your database connection

const uploadDir = join(process.cwd(), 'uploads');

// Ensure the 'uploads' directory exists
import { existsSync, mkdirSync } from 'fs';
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir);
}

export async function POST(req) {
  try {
    const form = await req.formData();
    const name = form.get('name');
    const email = form.get('email');
    const phone = form.get('phone');
    const position = form.get('position');
    const resume = form.get('resume');

    // Validate the required fields
    if (!name || !email || !phone || !position || !resume) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400 }
      );
    }

    // Save the uploaded file (resume)
    const fileName = `${Date.now()}-${resume.name}`
    const bytes = await resume.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const resumePath = join(uploadDir,fileName);
    await writeFile(resumePath, buffer);
  

    // Prepare the insert query for the career application
    const insertCareerQuery = `
      INSERT INTO career (name, email, phone, position, resume_path)
      VALUES (?, ?, ?, ?, ?)
    `;

    // Insert the data into the database
    const [result] = await database.query(insertCareerQuery, [
      name,
      email,
      phone,
      position,
      fileName,
    ]);

    

    return new Response(
      JSON.stringify({ message: 'Job application submitted successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error uploading file:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
}
