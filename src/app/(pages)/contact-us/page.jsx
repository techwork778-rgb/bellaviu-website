// "use client";
// import React, { useState } from "react";
// import {
//   Grid,
//   TextField,
//   Button,
//   Typography,
//   Box,
  
// } from "@mui/material";
// import "./Contact.css";
// import Breadcrumbs from "../../../components/Breadcrumb/Breadcrumb";
// import PlaceIcon from "@mui/icons-material/Place";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const ContactPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const [feedback, setFeedback] = useState({ type: "", message: "" });

//   React.useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       once: true,
//     });
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("/api/contact-us/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         setFeedback({ type: "success", message: result.message });
//         setFormData({ name: "", email: "", message: "" });
//       } else {
//         setFeedback({ type: "error", message: result.error });
//       }
//     } catch (error) {
//       console.error("Error submitting contact form:", error);
//       setFeedback({ type: "error", message: "Something went wrong. Please try again later." });
//     }
//   };

//   return (
//     <>
//       <Breadcrumbs title="Contact Us" />
//       <Box className="contact-container">
//         <Grid container spacing={5} className="contactContainer" data-aos="fade-up">
//           {/* Form: Show first on small screens, second on large screens */}
//           <Grid item xs={12} md={6} className="contactFormWrapper">
//             <form className="contactForm" onSubmit={handleSubmit}>
//               <Typography className="mb-3 getintouch">Get In Touch</Typography>
//               <div className="half-width">
//                 <TextField
//                   fullWidth
//                   placeholder="Name"
//                   variant="outlined"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="customField"
//                   required
//                 />
//                 <TextField
//                   fullWidth
//                   placeholder="Email"
//                   variant="outlined"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="customField"
//                   type="email"
//                   required
//                 />
//               </div>
//               <TextField
//                 fullWidth
//                 placeholder="Message"
//                 variant="outlined"
//                 multiline
//                 rows={4}
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 className="customField messageField"
//                 required
//               />
//               <Button color="primary" className="button" data-aos="zoom-in" type="submit">
//                 Send
//               </Button>
//             </form>
//             {feedback.message && (
//               <Typography
//                 className={`feedback ${feedback.type === "success" ? "success" : "error"}`}
//                 data-aos="fade-in"
//               >
//                 {feedback.message}
//               </Typography>
//             )}
//           </Grid>

//           {/* Map: Show second on small screens, first on large screens */}
//           <Grid item xs={12} md={6} className="mapWrapper">
//             <PlaceIcon />
//             <Typography className="text-bold map-address mb-2">
//               Marasi Drive, B2B Tower, Office Number - 1515, PO Box - 417679, Business Bay, Dubai.
//             </Typography>
//             <iframe
//               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14441.45694423956!2d55.26632081164302!3d25.1909363728035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6824f0311909%3A0x65950f712e2bef2!2sB2B%20Office%20Tower%20-%20Marasi%20Dr%20-%20Business%20Bay%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1733207783806!5m2!1sen!2sin"
//               width="100%"
//               height="400"
//               allowFullScreen=""
//               loading="lazy"
//               className="contact-iframe"
//               referrerPolicy="no-referrer-when-downgrade"
//             ></iframe>
//           </Grid>
//         </Grid>
//       </Box>
//     </>
//   );
// };

// export default ContactPage;
"use client";
import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import "./Contact.css";
import Breadcrumbs from "../../../components/Breadcrumb/Breadcrumb";
import PlaceIcon from "@mui/icons-material/Place";
import Career from "@/components/Career/Career";
import AOS from "aos";
import "aos/dist/aos.css";
import toast, { Toaster } from "react-hot-toast";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact-us/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(result.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumbs title="Contact Us" image={"/skyline.jpg"} />
      <Box className="contact-container">
        <Grid container spacing={5} className="contactContainer" data-aos="fade-up">
          {/* Form Section */}
          <Grid item xs={12} md={6} className="contactFormWrapper">
            <form className="contactForm" onSubmit={handleSubmit}>
              <Typography className="mb-3 getintouch">Get In Touch</Typography>
              <div className="half-width">
                <TextField
                  fullWidth
                  placeholder="Name"
                  variant="outlined"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="customField"
                  required
                />
                <TextField
                  fullWidth
                  placeholder="Email"
                  variant="outlined"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="customField"
                  type="email"
                  required
                />
              </div>
              <TextField
                fullWidth
                placeholder="Message"
                variant="outlined"
                multiline
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="customField messageField"
                required
              />
              <Button
                color="primary"
                className="button"
                data-aos="zoom-in"
                type="submit"
                disabled={loading}
                startIcon={loading && <CircularProgress size={20} />}
              >
                {loading ? "Sending..." : "Send"}
              </Button>
            </form>
          </Grid>

          {/* Map Section */}
          <Grid item xs={12} md={6} className="mapWrapper">
            <PlaceIcon />
            <Typography className="text-bold map-address mb-2">
              Marasi Drive, B2B Tower, Office Number - 1515, PO Box - 417679, Business Bay, Dubai.
            </Typography>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14441.45694423956!2d55.26632081164302!3d25.1909363728035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6824f0311909%3A0x65950f712e2bef2!2sB2B%20Office%20Tower%20-%20Marasi%20Dr%20-%20Business%20Bay%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1733207783806!5m2!1sen!2sin"
              width="100%"
              height="400"
              allowFullScreen=""
              loading="lazy"
              className="contact-iframe"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Grid>
        </Grid>
      </Box>

      {/* Toaster */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          style: {
            fontSize: "16px",
          },
        }}
      />
      <Career />
    </>
  );
};

export default ContactPage;
