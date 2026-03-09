// "use client";

// import React, { useState } from "react";
// import dynamic from "next/dynamic";
// import "react-quill/dist/quill.snow.css";

// // Dynamically import ReactQuill to avoid SSR issues
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// // Helper: generate slug from title
// function generateSlug(title) {
//   return title
//     .toLowerCase()
//     .trim()
//     .replace(/[\s\W-]+/g, "-") // replace spaces and non-word chars with hyphen
//     .replace(/^-+|-+$/g, ""); // trim starting and ending hyphens
// }

// function BlogTitleInput({ title, setTitle }) {
//   return (
//     <div style={{ marginBottom: "1rem" }}>
//       <label htmlFor="title">Blog Title:</label>
//       <br />
//       <input
//         type="text"
//         id="title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Enter blog title"
//         style={{ width: "100%", padding: "8px" }}
//         required
//       />
//     </div>
//   );
// }
// function BlogMainTitleInput({ title, setTitle }) {
//   return (
//     <div style={{ marginBottom: "1rem" }}>
//       <label htmlFor="maintitle">Blog Main Title:</label>
//       <br />
//       <input
//         type="text"
//         id="maintitle"
//         value={title}
//         onChange={(e) => setMainTitle(e.target.value)}
//         placeholder="Enter blog title"
//         style={{ width: "100%", padding: "8px" }}
//         required
//       />
//     </div>
//   );
// }
// function BlogDateInput({ date, setDate }) {
//   return (
//     <div style={{ marginBottom: "1rem" }}>
//       <label htmlFor="date">Publish Date:</label>
//       <br />
//       <input
//         type="date"
//         id="date"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//         style={{ width: "100%", padding: "8px" }}
//         required
//       />
//     </div>
//   );
// }

// function BlogAuthorInput({ author, setAuthor }) {
//   return (
//     <div style={{ marginBottom: "1rem" }}>
//       <label htmlFor="author">Author Name:</label>
//       <br />
//       <input
//         type="text"
//         id="author"
//         value={author}
//         onChange={(e) => setAuthor(e.target.value)}
//         placeholder="Enter author name"
//         style={{ width: "100%", padding: "8px" }}
//         required
//       />
//     </div>
//   );
// }

// function BlogExcerptInput({ excerpt, setExcerpt }) {
//   return (
//     <div style={{ marginBottom: "1rem" }}>
//       <label htmlFor="excerpt">Excerpt:</label>
//       <br />
//       <textarea
//         id="excerpt"
//         value={excerpt}
//         onChange={(e) => setExcerpt(e.target.value)}
//         placeholder="Enter a short summary of the blog"
//         rows={3}
//         style={{ width: "100%", padding: "8px" }}
//         maxLength={300}
//         required
//       />
//     </div>
//   );
// }

// function BlogDescriptionInput({ description, setDescription }) {
//   return (
//     <div style={{ marginBottom: "1rem" }}>
//       <label htmlFor="description">Description:</label>
//       <br />
//       <textarea
//         id="description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         placeholder="Enter a longer description"
//         rows={5}
//         style={{ width: "100%", padding: "8px" }}
//         required
//       />
//     </div>
//   );
// }
// function BlogMeatTitleInput({ description, setDescription }) {
//   return (
//     <div style={{ marginBottom: "1rem" }}>
//       <label htmlFor="description">Meat Title:</label>
//       <br />
//       <textarea
//         id="meattitle"
//         value={meattitle}
//         onChange={(e) => setMeatTitle(e.target.value)}
//         placeholder="Enter a longer description"
//         rows={5}
//         style={{ width: "100%", padding: "8px" }}
//         required
//       />
//     </div>
//   );
// }
// function BlogImageUpload({ imageFile, setImageFile }) {
//   return (
//     <div style={{ marginBottom: "1rem" }}>
//       <label htmlFor="image">Upload Blog Image:</label>
//       <br />
//       <input
//         type="file"
//         id="image"
//         accept="image/*"
//         onChange={(e) => {
//           if (e.target.files && e.target.files[0]) {
//             setImageFile(e.target.files[0]);
//           }
//         }}
//       />
//       {imageFile && (
//         <div style={{ marginTop: "0.5rem" }}>
//           <strong>Selected Image:</strong> {imageFile.name}
//           <br />
//           <img
//             src={URL.createObjectURL(imageFile)}
//             alt="Preview"
//             style={{ maxWidth: "300px", marginTop: "0.5rem" }}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// function BlogContentInput({ content, setContent }) {
//   const modules = {
//     toolbar: [
//       [{ header: [1, 2, 3, false] }],
//       ["bold", "italic", "underline", "strike", "blockquote"],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["link", "image"],
//       ["clean"],
//     ],
//   };

//   return (
//     <div style={{ marginBottom: "1rem" }}>
//       <label>Blog Content:</label>
//       <ReactQuill
//         theme="snow"
//         value={content}
//         onChange={setContent}
//         modules={modules}
//         placeholder="Write your blog content here..."
//         style={{ height: "400px", marginBottom: "1rem" }}
//       />
//     </div>
//   );
// }

// export default function BlogUploadForm() {
//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");
//   const [date, setDate] = useState("");
//   const [excerpt, setExcerpt] = useState("");
//   const [description, setDescription] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [content, setContent] = useState("");
//   const [maintitle,setMainTitle]=useState("");
//   const [meattitle,setMeatTitle]=useState("");
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   const slug = generateSlug(title);
//   if (!slug) return alert("Please enter a valid title.");

//   let imageBase64 = "";
//   if (imageFile) {
//     const reader = new FileReader();
//     reader.onloadend = async () => {
//       imageBase64 = reader.result;

//       const blogData = {
//         slug,
//         maintitle: title,
//         title,
//         author,
//         publishDate: date,
//         excerpt,
//         description,
//         createdAt: new Date().toISOString(),
//         imageBase64,
//         imageFileName: imageFile.name,
//         content,
//       };

//       try {
//         const res = await fetch("/api/add-blog", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(blogData),
//         });

//         const result = await res.json();
//         if (res.ok) {
//           alert("Blog added successfully!");
//           setTitle("");
//           setAuthor("");
//           setDate("");
//           setExcerpt("");
//           setDescription("");
//           setImageFile(null);
//           setContent("");
//         } else {
//           alert("Error: " + (result.message || "Failed to add blog."));
//         }
//       } catch (error) {
//         alert("Error: " + error.message);
//       }
//     };
//     reader.readAsDataURL(imageFile); // convert to base64
//   } else {
//     alert("Please upload an image.");
//   }
// };


//   return (
//     <form onSubmit={handleSubmit} style={{ maxWidth: "800px", margin: "auto" }}>
//       <h2>Upload Blog Post</h2>

//       <BlogTitleInput title={title} setTitle={setTitle} />
//       <BlogMainTitleInput maintitle={maintitle} setMainTitle={setMainTitle} />
//       <BlogDateInput date={date} setDate={setDate} />
//       <BlogAuthorInput author={author} setAuthor={setAuthor} />
    
//       <BlogExcerptInput excerpt={excerpt} setExcerpt={setExcerpt} />
//         <BlogMeatTitleInput meattitle={meattitle} setMeatTitle={setMeatTitle} />
//       <BlogDescriptionInput description={description} setDescription={setDescription} />
//       <BlogImageUpload imageFile={imageFile} setImageFile={setImageFile} />
//       <BlogContentInput content={content} setContent={setContent} />

//       <button type="submit" style={{ padding: "10px 20px", fontSize: "16px" }}>
//         Submit Blog
//       </button>
//     </form>
//   );
// }
"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// Helper: generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-") // replace spaces and non-word chars with hyphen
    .replace(/^-+|-+$/g, ""); // trim starting and ending hyphens
}

function BlogTitleInput({ title, setTitle }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor="title">Blog Title:</label>
      <br />
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter blog title"
        style={{ width: "100%", padding: "8px" }}
        required
      />
    </div>
  );
}

function BlogMainTitleInput({ maintitle, setMainTitle }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor="maintitle">Blog Main Title:</label>
      <br />
      <input
        type="text"
        id="maintitle"
        value={maintitle}
        onChange={(e) => setMainTitle(e.target.value)}
        placeholder="Enter main blog title"
        style={{ width: "100%", padding: "8px" }}
        required
      />
    </div>
  );
}

function BlogDateInput({ date, setDate }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor="date">Publish Date:</label>
      <br />
      <input
        type="date"
        id="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ width: "100%", padding: "8px" }}
        required
      />
    </div>
  );
}

function BlogAuthorInput({ author, setAuthor }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor="author">Author Name:</label>
      <br />
      <input
        type="text"
        id="author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Enter author name"
        style={{ width: "100%", padding: "8px" }}
        required
      />
    </div>
  );
}

function BlogExcerptInput({ excerpt, setExcerpt }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor="excerpt">Excerpt:</label>
      <br />
      <textarea
        id="excerpt"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        placeholder="Enter a short summary of the blog"
        rows={3}
        style={{ width: "100%", padding: "8px" }}
        maxLength={300}
        required
      />
    </div>
  );
}

function BlogDescriptionInput({ description, setDescription }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor="description">Description:</label>
      <br />
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter a longer description"
        rows={5}
        style={{ width: "100%", padding: "8px" }}
        required
      />
    </div>
  );
}

function BlogMeatTitleInput({ meattitle, setMeatTitle }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor="meattitle">Meat Title:</label>
      <br />
      <textarea
        id="meattitle"
        value={meattitle}
        onChange={(e) => setMeatTitle(e.target.value)}
        placeholder="Enter meat title"
        rows={3}
        style={{ width: "100%", padding: "8px" }}
        required
      />
    </div>
  );
}

function BlogImageUpload({ imageFile, setImageFile }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor="image">Upload Blog Image:</label>
      <br />
      <input
        type="file"
        id="image"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
          }
        }}
      />
      {imageFile && (
        <div style={{ marginTop: "0.5rem" }}>
          <strong>Selected Image:</strong> {imageFile.name}
          <br />
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Preview"
            style={{ maxWidth: "300px", marginTop: "0.5rem" }}
          />
        </div>
      )}
    </div>
  );
}

function BlogContentInput({ content, setContent }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label>Blog Content:</label>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        modules={modules}
        placeholder="Write your blog content here..."
        style={{ height: "400px", marginBottom: "1rem" }}
      />
    </div>
  );
}

export default function BlogUploadForm() {
  const [title, setTitle] = useState("");
  const [maintitle, setMainTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [description, setDescription] = useState("");
  const [meattitle, setMeatTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [content, setContent] = useState("");

  const readFileAsDataURL = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const slug = generateSlug(title);
    if (!slug) return alert("Please enter a valid title.");

    if (!imageFile) return alert("Please upload an image.");

    try {
      const imageBase64 = await readFileAsDataURL(imageFile);

      const blogData = {
        slug,
        maintitle,
        title,
        author,
         date,
        excerpt,
        description,
        meattitle,
        createdAt: new Date().toISOString(),
        imageBase64,
        imageFileName: imageFile.name,
        content,
      };

      const res = await fetch("/api/add-blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Blog added successfully!");
        // Reset form
        setTitle("");
        setMainTitle("");
        setAuthor("");
        setDate("");
        setExcerpt("");
        setDescription("");
        setMeatTitle("");
        setImageFile(null);
        setContent("");
      } else {
        alert("Error: " + (result.message || "Failed to add blog."));
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "800px", margin: "auto" }}>
      <h2>Upload Blog Post</h2>

      <BlogTitleInput title={title} setTitle={setTitle} />
      <BlogMainTitleInput maintitle={maintitle} setMainTitle={setMainTitle} />
      <BlogDateInput date={date} setDate={setDate} />
      <BlogAuthorInput author={author} setAuthor={setAuthor} />
      <BlogExcerptInput excerpt={excerpt} setExcerpt={setExcerpt} />
      <BlogMeatTitleInput meattitle={meattitle} setMeatTitle={setMeatTitle} />
      <BlogDescriptionInput description={description} setDescription={setDescription} />
      <BlogImageUpload imageFile={imageFile} setImageFile={setImageFile} />
      <BlogContentInput content={content} setContent={setContent} />

      <button type="submit" style={{ padding: "10px 20px", fontSize: "16px" }}>
        Submit Blog
      </button>
    </form>
  );
}
