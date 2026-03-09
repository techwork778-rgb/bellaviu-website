import fs from 'fs';
import path from 'path';

const ensureJsonFile = (filePath, isObject) => {
  if (!fs.existsSync(filePath) || fs.readFileSync(filePath, 'utf8').trim() === '') {
    const initialData = isObject ? '{}' : '[]';
    fs.writeFileSync(filePath, initialData, 'utf8');
  }
};

const loadJson = (filePath, isObject = false) => {
  if (!fs.existsSync(filePath)) return isObject ? {} : [];

  const raw = fs.readFileSync(filePath, 'utf8').trim();
  if (!raw) return isObject ? {} : [];

  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Failed to parse JSON at ${filePath}:`, err);
    return isObject ? {} : [];
  }
};

export async function POST(req) {
  try {
    const {
        slug,
        maintitle,
        title,
        author,
        date,
        excerpt,
        description,
        
        meattitle,
        createdAt,
        imageBase64,
        imageFileName,
        content,
      } = await req.json();

    if (!slug || !maintitle || !content || !imageBase64 || !imageFileName) {
      return new Response(
        JSON.stringify({ message: 'Missing required fields.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Decode base64 image
    const matches = imageBase64.match(/^data:image\/(\w+);base64,(.+)$/);
    if (!matches) {
      return new Response(
        JSON.stringify({ message: 'Invalid image base64 format.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const ext = matches[1]; // e.g., 'png', 'jpeg'
    const buffer = Buffer.from(matches[2], 'base64');
    const fileName = `${slug}.${ext}`;
    const filePath = path.join(uploadsDir, fileName);
    fs.writeFileSync(filePath, buffer);

    // Image URL relative to public
    const image = `/uploads/${fileName}`;

    // JSON file paths
    const metaPath = path.join(process.cwd(), 'public', 'blogs.json');
    const contentPath = path.join(process.cwd(), 'public', 'blog.json');
    const categoryPath = path.join(process.cwd(), 'public', 'bloglayout.json');

    // Ensure JSON files exist and are valid
    ensureJsonFile(metaPath, false);
    ensureJsonFile(contentPath, true);
    ensureJsonFile(categoryPath, true);

    // Load JSON data
    const metaData = loadJson(metaPath);
    const contentData = loadJson(contentPath, true);
    const categoryData = loadJson(categoryPath, true);

    // Check for duplicate slug
    if (metaData.find((b) => b.slug === slug)) {
      return new Response(
        JSON.stringify({ message: 'Blog with this slug already exists.' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Append new blog data
    metaData.push({ title,excerpt,date,author,image });
    contentData[slug] = { maintitle,image,content };
    categoryData[slug] = { meattitle,description  };

    // Save back to files
    fs.writeFileSync(metaPath, JSON.stringify(metaData, null, 2));
    fs.writeFileSync(contentPath, JSON.stringify(contentData, null, 2));
    fs.writeFileSync(categoryPath, JSON.stringify(categoryData, null, 2));

    return new Response(
      JSON.stringify({ message: 'Blog stored with image uploaded.' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in POST /api/add-blog:', error);
    return new Response(
      JSON.stringify({ message: 'Internal server error.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
