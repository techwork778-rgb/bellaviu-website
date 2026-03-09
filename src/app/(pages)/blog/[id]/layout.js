// import blogData from '../../../../../public/bloglayout.json';
// export async function generateMetadata({ params }) {
   
//     const blog = blogData[params.id];
  
//     return {
//       title: blog ? blog.meattitle : "Blog - Bellaviu Holiday Homes",
//       description: blog ? blog.description : "Read expert property management tips and trends.",
//       icons: {
//         icon: "/bellaviwefavicon.png",
//       },
//       verification: {
//         google: "bkB7CMcE-FW34kjwj-GcLZ24fPvDsHVnTuK1V69g6ps",
//       },
//     };
//   }
  
//   export default function BlogLayout({ children }) {
//     return <>{children}</>;
//   }
import fs from 'fs';
import path from 'path';

export async function generateMetadata({ params }) {
  const filePath = path.join(process.cwd(), 'public', 'bloglayout.json');
  let blogData = {};

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    blogData = JSON.parse(fileContents);
  } catch (error) {
    console.error('Failed to read bloglayout.json:', error);
  }

  const blog = blogData[params.id];

  return {
    title: blog ? blog.meattitle : "Blog - Bellaviu Holiday Homes",
    description: blog ? blog.description : "Read expert property management tips and trends.",
    icons: {
      icon: "/bellaviwefavicon.png",
    },
    verification: {
      google: "bkB7CMcE-FW34kjwj-GcLZ24fPvDsHVnTuK1V69g6ps",
    },
  };
}

export default function BlogLayout({ children }) {
  return <>{children}</>;
}
