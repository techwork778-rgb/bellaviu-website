
"use client";
import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import "./add-property.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from "yup"; // Import Yup for validation
import { CircularProgress } from "@mui/material";
import TrustedHolidayHome from"@/components/TrustedHolidayHome/TrustedHolidayHome";

const PropertyForm = () => {
  const [formStatus, setFormStatus] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [loading,setLoading]=useState(false)

  // Initial form values
  const initialValues = {
    title: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    standardGuests: "",
    maxGuests: "",
    floorNumber: "",
    propertyNumber: "",
    licenseNumber: "",
    code: "",
    livingArea: "",
    DummyProperty: false, // checkbox 1
    Publishonmrafred: false, // checkbox 2
    PublishonWebsite: false, // checkbox 3
  };

  // Yup validation schema
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  propertyType: Yup.string().required("Property type is required"),
  bedrooms: Yup.string().required("bedrooms is required").min(1, "At least 1 bedroom"),
  bathrooms: Yup.string().required("bathrooms is required").min(1, "At least 1 bathroom"),
  standardGuests: Yup.number().required("Standard guests count is required").min(1, "At least 1 guest"),
  maxGuests: Yup.number().required("Max guests count is required").min(1, "At least 1 guest"),
  floorNumber: Yup.string().required("Floor number is required"),
  propertyNumber: Yup.string().required("Property number is required"),
  licenseNumber: Yup.string().required("License number is required"),
  code: Yup.string().required("Code is required"),
  livingArea: Yup.number().required("Living area is required").min(1, "Living area must be greater than 0"),
  DummyProperty: Yup.boolean(), // Not required, but ensure it's a boolean
  Publishonmrafred: Yup.boolean(), // Not required, but ensure it's a boolean
  PublishonWebsite: Yup.boolean(), // Not required, but ensure it's a boolean
});
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Form submit handler
  const handleSubmit = async (data, { resetForm }) => {
   // console.log("Form Data:", data);
    setLoading(true); // Start loading
    try {
      const response = await axios.post("/api/add-property", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setFormStatus("success");
        toast.success("Property added successfully")
     //   console.log("Property added successfully");
        resetForm()
        
      }
    } catch (error) {
      setFormStatus("error");
      console.error("Error:", error.response?.data?.error || error.message);
    }  finally {
      setLoading(false); // Stop loading when done
    }
    
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
    <TrustedHolidayHome />

    
    </>
  );
};

export default PropertyForm;
