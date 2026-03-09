// "use client";
// import React from "react";
// import {
//   Box,
//   Grid,
//   Button,
//   Accordion,
//   AccordionSummary,
//   Typography,
//   AccordionDetails,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import "./career.css";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// function page() {
//   // const [position, setPosition] = React.useState("");
//   const [success, setSuccess] = React.useState(false);

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       phone: "",
//       position: "",
//       resume: null,
//     },
//     validationSchema: Yup.object({
//       name: Yup.string().required("Name is required"),
//       email: Yup.string()
//         .email("Invalid email address")
//         .required("Email is required"),
//       phone: Yup.string().required("Phone number is required"),
//       position: Yup.string().required("Please select a position"),
//       resume: Yup.mixed().required("Resume is required"),
//     }),
//    // Update the onSubmit function inside your formik setup
// onSubmit: async (values, { resetForm }) => {
//   const formData = new FormData();
//   formData.append("name", values.name);
//   formData.append("email", values.email);
//   formData.append("phone", values.phone);
//   formData.append("position", values.position);
//   formData.append("resume", values.resume);  // Ensure the resume is a file object

//   try {
//     const response = await fetch("/api/career", {
//       method: "POST",
//       body: formData,
//     });

//     if (response.ok) {
//       setSuccess(true);  // Show success Snackbar
//       resetForm();
//       formik.setFieldValue("phone", "");  // Clear phone input
//     } else {
//       console.error("Error submitting form");
//     }
//   } catch (error) {
//     console.error("Error submitting form:", error);
//   }
// }

//   });

//   // const handleChange = (event) => {
//   //   setPosition(event.target.value);
//   // };
//   return (
//     <>
       
//       <Box className="career-container">
//       <h1 className="section-title">Careers</h1>
//         <Grid container spacing={3} className="career-grid">
//           <Grid item xs={12} sm={6}>
//             <div className="career-item">
//               <h3>Send Your Resume Including Your Employment Experience.</h3>
//               <p>
//                 you can reach us through filling out the form or send your
//                 resume to our email – reservation@bellaviuholidayhomes.com.
//               </p>
//               <h4>Current Opening</h4>
//               <Accordion>
//                 <AccordionSummary
//                   expandIcon={<ExpandMoreIcon />}
//                   aria-controls="panel1-content"
//                   id="panel1-header"
//                 >
//                   <Typography component="span">Sales & Leasing Consultant</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                 To join our team, we're seeking for a passionate and experienced sales and leasing consultant.
//                 </AccordionDetails>
//               </Accordion>
//             </div>
//           </Grid>
//           <Grid
//             item
//             xs={12}
//             sm={6}
//             container
//             direction="column"
//             alignItems="center"
//             spacing={2}
//           >
//             <div className="career-item2">
//               <h3>Apply For A Job</h3>
//               <p>
//                 Submit this form and an HR representative will be in touch to
//                 discuss your application.
//               </p>
//               <form onSubmit={formik.handleSubmit}>
//                 <TextField
//                   id="name"
//                   name="name"
//                   label="Your Name"
//                   variant="standard"
//                   fullWidth
//                   margin="normal"
//                   value={formik.values.name}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   error={formik.touched.name && Boolean(formik.errors.name)}
//                   helperText={formik.touched.name && formik.errors.name}
//                 />
//                 <TextField
//                   id="email"
//                   name="email"
//                   label="Your Email"
//                   variant="standard"
//                   fullWidth
//                   margin="normal"
//                   value={formik.values.email}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   error={formik.touched.email && Boolean(formik.errors.email)}
//                   helperText={formik.touched.email && formik.errors.email}
//                 />
//                 <PhoneInput
//                   country={"in"}
//                   value={formik.values.phone}
//                   onChange={(value) => formik.setFieldValue("phone", value)}
//                   inputStyle={{
//                     width: "100%",
//                     height: "40px",
//                     border: "none",
//                     borderBottom: "1px solid #ccc",
//                     borderRadius: "0",
//                     boxShadow: "none",
//                   }}
//                   containerStyle={{
//                     marginTop: "16px",
//                   }}
//                   buttonStyle={{
//                     border: "none",
//                     borderBottom: "1px solid #ccc",
//                     borderRadius: "0",
//                   }}
//                 />
//                  {formik.touched.phone && formik.errors.phone && (
//                   <div style={{ color: "red" }}>{formik.errors.phone}</div>
//                 )}
//                 <TextField
//                   id="resume"
//                   name="resume"
//                   label="Upload Resume"
//                   variant="standard"
//                   type="file"
//                   InputLabelProps={{ shrink: true }}
//                   inputProps={{ accept: ".pdf,.doc,.docx" }}
//                   fullWidth
//                   margin="normal"
//                   onChange={(event) =>
//                     formik.setFieldValue("resume", event.currentTarget.files[0])
//                   }
//                   onBlur={formik.handleBlur}
//                   error={formik.touched.resume && Boolean(formik.errors.resume)}
//                   helperText={formik.touched.resume && formik.errors.resume}
//                 />
//                 <FormControl
//                   variant="standard"
//                   fullWidth
//                   error={
//                     formik.touched.position && Boolean(formik.errors.position)
//                   }
//                 >
//                   <InputLabel>Choose position applying for</InputLabel>
//                   <Select
//                     id="position"
//                     name="position"
//                     value={formik.values.position}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     fullWidth
//                     style={{
//                       fontFamily: "inherit",
//                       fontSize: "1rem",
//                     }}
//                   >
//                     <MenuItem value="Sales & Leasing Consultant">
//                       Sales & Leasing Consultant
//                     </MenuItem>
//                     <MenuItem value="Marketing Specialist">
//                       Marketing Specialist
//                     </MenuItem>
//                     <MenuItem value="HR Manager">HR Manager</MenuItem>
//                   </Select>
//                 </FormControl>
//                 {formik.touched.position && formik.errors.position && (
//                   <div style={{ color: "red" }}>{formik.errors.position}</div>
//                 )}
//                 <button class="hero-duo-button  my-2" type="submit">
//                   {" "}
//                   Apply Now{" "}
//                 </button>
//               </form>
//             </div>
//           </Grid>
//         </Grid>
//       </Box>
//       <Snackbar
//         open={success}
//         autoHideDuration={6000}
//         onClose={() => setSuccess(false)}
//       >
//         <Alert onClose={() => setSuccess(false)} severity="success">
//           Property submitted successfully!
//         </Alert>
//       </Snackbar>
//     </>
//   );
// }

// export default page;
"use client";
import React, { useState } from "react";
import {
  Box,
  Grid,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./career.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";

function Page() {
  const [loading, setLoading] = useState(false);
  const jobDetails = [
    {
      title: "Business Development Manager",
      description: "To join our team, we're seeking for a passionate and experienced development manager.",
    },
    {
      title: "Guest Relation Executive",
      description: "Responsible for ensuring excellent guest experiences and addressing their needs effectively.",
    },
    {
      title: "Property Onboarding Manager",
      description: "Oversee the onboarding process for new properties and ensure a seamless experience.",
    },
    {
      title: "Sales Manager",
      description: "Lead and motivate the sales team to achieve targets and build strong client relationships.",
    },
    {
      title: "Reservation Manager",
      description: "Manage the reservation process, ensuring efficiency and client satisfaction.",
    },
  ];
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      position: "",
      resume: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string().required("Phone number is required"),
      position: Yup.string().required("Please select a position"),
      resume: Yup.mixed().required("Resume is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("position", values.position);
      formData.append("resume", values.resume);

      setLoading(true);
      try {
        const response = await fetch("/api/career", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          toast.success("Application submitted successfully!");
          resetForm();
        } else {
          toast.error("Failed to submit application. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Box className="career-container">
        <h1 className="section-head">Careers</h1>
        <Grid container spacing={3} className="career-grid">
          <Grid item xs={12} sm={6}>
            <div className="career-item">
              <h3>Send Your Resume Including Your Employment Experience.</h3>
              <p>
                You can reach us through filling out the form or send your
                resume to our email – reservation@bellaviuholidayhomes.com.
              </p>
              <h4>Current Opening</h4>
              {jobDetails.map((job, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography component="span">{job.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{job.description}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            container
            direction="column"
            alignItems="center"
          >
            <div className="career-item2">
              <h3>Apply For A Job</h3>
              <p>
                Submit this form and an HR representative will be in touch to
                discuss your application.
              </p>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  id="name"
                  name="name"
                  label="Your Name"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                  id="email"
                  name="email"
                  label="Your Email"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <PhoneInput
                  country={"ae"}
                  value={formik.values.phone}
                  onChange={(value) => formik.setFieldValue("phone", value)}
                  inputStyle={{
                    width: "100%",
                    height: "40px",
                    border: "none",
                    borderBottom: "1px solid #ccc",
                    borderRadius: "0",
                    boxShadow: "none",
                  }}
                  containerStyle={{
                    marginTop: "16px",
                  }}
                  buttonStyle={{
                    border: "none",
                    borderBottom: "1px solid #ccc",
                    borderRadius: "0",
                  }}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div style={{ color: "red" }}>{formik.errors.phone}</div>
                )}
                <TextField
                  id="resume"
                  name="resume"
                  label="Upload Resume"
                  variant="standard"
                  type="file"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ accept: ".pdf,.doc,.docx" }}
                  fullWidth
                  margin="normal"
                  onChange={(event) =>
                    formik.setFieldValue("resume", event.currentTarget.files[0])
                  }
                  onBlur={formik.handleBlur}
                  error={formik.touched.resume && Boolean(formik.errors.resume)}
                  helperText={formik.touched.resume && formik.errors.resume}
                />
                <FormControl
                  variant="standard"
                  fullWidth
                  error={
                    formik.touched.position && Boolean(formik.errors.position)
                  }
                >
                  <InputLabel>Choose position applying for</InputLabel>
                  <Select
                    id="position"
                    name="position"
                    value={formik.values.position}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    fullWidth
                    style={{
                      fontFamily: "inherit",
                      fontSize: "1rem",
                    }}
                  >
                    <MenuItem value="Business Development Manager ">
                    Business Development Manager 
                    </MenuItem>
                    <MenuItem value="Guest Relation Executive">
                    Guest Relation Executive
                    </MenuItem>
                    <MenuItem value="Property Onboarding Manager">Property Onboarding Manager</MenuItem>
                    <MenuItem value="Sales Manager">Sales Manager</MenuItem>
                    <MenuItem value="Sales Manager">Reservation Manager</MenuItem>
                  </Select>
                </FormControl>
                {formik.touched.position && formik.errors.position && (
                  <div style={{ color: "red" }}>{formik.errors.position}</div>
                )}
                <button className="hero-duo-button my-2" type="submit">
                  {loading ? "Submitting..." : "Apply Now"}
                </button>
              </form>
            </div>
          </Grid>
        </Grid>
      </Box>
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
    </>
  );
}

export default Page;
