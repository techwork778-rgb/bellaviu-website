// "use client";
// import React, { useState } from "react";
// import {
//   Container,
//   Grid,
//   Typography,
//   Box,
//   Button,
//   Card,
//   CardContent,
//   CardMedia,
//   Divider,
//   List,
//   ListItem,
//   ListItemText,
//   Pagination,
// } from "@mui/material";
// import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
// import blogPosts from "../../../../public/blogs.json";
// import Link from "next/link";
// import "./style.css";
// import { title } from "process";
// const page = () => {

//   const [currentPage, setCurrentPage] = useState(1);
//   const postsPerPage = 6;

//   // Calculate the posts for the current page
//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;
//   const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

//   const totalPages = Math.ceil(blogPosts.length / postsPerPage);

//   const handleChange = (event, value) => {
//     setCurrentPage(value);
//   };

//   return (
//     <>
//       <Breadcrumb title="Blog" image={"/blogs.jpeg"}/>

//       <Container maxWidth="lg" sx={{ mb: 4 }}>
//         {/* Hero Section */}
//         <Box
//           sx={{
//             textAlign: "center",
//             marginY: 4,
//             backgroundColor: "#f5f5f5",
//             padding: 4,
//             borderRadius: 2,
//           }}
//         >
//           <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
//             Property Management Blog
//           </Typography>
//           <Typography variant="h6" color="textSecondary">
//             Expert advice and tips for property owners and managers
//           </Typography>
//         </Box>

//         {/* Blog Layout */}
//         <Grid container spacing={4}>
//           {/* Blog Posts */}
//           <Grid item xs={12} md={8}>
//             <Grid container spacing={4}>
//               {currentPosts.map((post, index) => (
//                 <Grid item xs={12} sm={6} key={index}>
//                   <Card
//                     sx={{
//                       height: "100%",
//                       transition: "transform 0.3s, box-shadow 0.3s",
//                       "&:hover": {
//                         transform: "translateY(-5px)",
//                         boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",
//                       },
//                     }}
//                   >
//                     <CardMedia
//                       component="img"
//                       alt={post.title}
//                       height="200"
//                       image={post.image}
//                       sx={{
//                         objectFit: "cover",
//                       }}
//                     />
//                     <CardContent>
//                       <Typography
//                         variant="h5"
//                         gutterBottom
//                         sx={{ fontWeight: "bold" }}
//                       >
//                         {post.title}
//                       </Typography>
//                       <Typography
//                         variant="body2"
//                         color="textSecondary"
//                         paragraph
//                       >
//                         {post.excerpt}
//                       </Typography>
//                       <Box
//                         sx={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           alignItems: "center",
//                           marginTop: 2,
//                         }}
//                       >
//                         <Typography variant="caption" color="textSecondary">
//                           {post.date}
//                         </Typography>
//                         <Typography variant="caption" color="textSecondary">
//                           By {post.author}
//                         </Typography>
//                        </Box>
//                       <Link href={`/blog/${post.title.toLowerCase().replace(/\s+/g, "-")}`} passHref>
//                      <button type="button" className="custom-button">
//                         Read More
//                         <span className="arrow">→</span>
//                         <span className="underline"></span>
//                       </button>
//                       </Link>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>

//             {/* Pagination */}
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 marginTop: 4,
//               }}
//             >
//               <Pagination
//                 count={totalPages}
//                 page={currentPage}
//                 onChange={handleChange}
//               />
//             </Box>
//           </Grid>

//           {/* Sidebar */}
//           <Grid item xs={12} md={4}>
//             <Box
//               sx={{
//                 position: "sticky",
//                 top: 70,
//                 backgroundColor: "#f9f9f9",
//                 padding: 3,
//                 borderRadius: 2,
//                 boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
//               }}
//             >
//               <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
//                 Categories
//               </Typography>
//               <List>
//                 <ListItem button>
//                   <ListItemText primary="Property Management Tips" />
//                 </ListItem>
//                 <ListItem button>
//                   <ListItemText primary="Tenant Relations" />
//                 </ListItem>
//                 <ListItem button>
//                   <ListItemText primary="Real Estate Trends" />
//                 </ListItem>
//               </List>

//               <Divider sx={{ marginY: 2 }} />

//               <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
//                 Recent Posts
//               </Typography>
//               <List>
//                 {blogPosts.map((post, index) => (
//                   <ListItem button key={index}>
//                     <ListItemText primary={post.title} />
//                   </ListItem>
//                 ))}
//               </List>
//             </Box>
//           </Grid>
//         </Grid>
//       </Container>
//     </>
//   );
// };

// export default page;
"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemText,
  Pagination,
} from "@mui/material";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Link from "next/link";
import "./style.css";

const Page = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    // Fetch blogs.json from public folder
    fetch('/blogs.json')
      .then((res) => res.json())
      .then((data) => {
        setBlogPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch blogs.json:', err);
        setLoading(false);
      });
  }, []);

  // Pagination calculations
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) {
    return <div>Loading blog posts...</div>;
  }

  return (
    <>
      <Breadcrumb title="Blog" image={"/blogs.jpeg"} />

      <Container maxWidth="lg" sx={{ mb: 4 }}>
        {/* Hero Section */}
        <Box
          sx={{
            textAlign: "center",
            marginY: 4,
            backgroundColor: "#f5f5f5",
            padding: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
            Property Management Blog
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Expert advice and tips for property owners and managers
          </Typography>
        </Box>

        {/* Blog Layout */}
        <Grid container spacing={4}>
          {/* Blog Posts */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={4}>
              {currentPosts.map((post, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card
                    sx={{
                      height: "100%",
                      transition: "transform 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt={post.title}
                      height="200"
                      image={post.image}
                      sx={{
                        objectFit: "cover",
                      }}
                    />
                    <CardContent>
                      <Typography
                        variant="h5"
                        gutterBottom
                        sx={{ fontWeight: "bold" }}
                      >
                        {post.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" paragraph>
                        {post.excerpt}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: 2,
                        }}
                      >
                        <Typography variant="caption" color="textSecondary">
                          {post.date}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          By {post.author}
                        </Typography>
                      </Box>
                      <Link href={`/blog/${post.title.toLowerCase().replace(/\s+/g, "-")}`} passHref>
                        <button type="button" className="custom-button">
                          Read More
                          <span className="arrow">→</span>
                          <span className="underline"></span>
                        </button>
                      </Link>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 4,
              }}
            >
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handleChange}
              />
            </Box>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                position: "sticky",
                top: 70,
                backgroundColor: "#f9f9f9",
                padding: 3,
                borderRadius: 2,
                boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Categories
              </Typography>
              <List>
                <ListItem button>
                  <ListItemText primary="Property Management Tips" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Tenant Relations" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Real Estate Trends" />
                </ListItem>
              </List>

              <Divider sx={{ marginY: 2 }} />

              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Recent Posts
              </Typography>
              <List>
                {blogPosts.map((post, index) => (
                  <ListItem button key={index}>
                    <ListItemText primary={post.title} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Page;
