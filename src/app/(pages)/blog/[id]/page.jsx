"use client";
import React from "react";
import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { useParams } from "next/navigation";
//import blogData from "../../../../../public/blog.json"


function BlogPost() {
  const { id } = useParams();
  const [blog, setBlog] = React.useState(null);
 // console.log(id);
  //const blog = blogData[id];
React.useEffect(() => {
    if (!id) return;

    fetch("/blog.json")
      .then((res) => res.json())
      .then((data) => {
        setBlog(data[id]);
      })
      .catch((err) => {
        console.error("Error fetching blog data:", err);
      });
  }, [id]);
  return (
    <>
      <Head>
        <title>{blog ? blog?.maintitle : "Blog Post"} | My Website</title>
        <meta
          name="description"
          content={`Read about ${blog?.maintitle} and get insights on the best holiday home companies in Dubai.`}
        />
      </Head>
      <Breadcrumb title={id} image={"/blogs.jpeg"} />
      <div className="container py-5">
        <h1
          style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center" }}
        >
          {blog?.maintitle}
        </h1>
        <img src={blog?.image} alt={blog?.maintitle} className="img-fluid my-4" />
        <div dangerouslySetInnerHTML={{ __html: blog?.content }} />
      </div>
    </>
  );
}

export default BlogPost;
