import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import "./ListForm.css";
const ListForm = () => {
  const [success, setSuccess] = React.useState(false);

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First name is required")
      .min(2, "First name should be at least 2 characters"),
    lastName: Yup.string()
      .required("Last name is required")
      .min(2, "Last name should be at least 2 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(
        /^(?:\+?\d{1,4}[\s\-]?)?(\(?\d{1,4}\)?[\s\-]?)?[\d\s\-]{7,15}$/,
        "Phone number must be valid"
      ),

    city: Yup.string().required("City is required"),
    propertyType: Yup.string().required("Property type is required"),
    numberOfBedrooms: Yup.number()
      .required("Number of bedrooms is required")
      .min(1, "At least 1 bedroom is required")
      .integer("Number of bedrooms must be an integer"),
    furnishingStatus: Yup.string().required("Furnishing status is required"),
    buildingName: Yup.string().required("Building name is required"),
    communityName: Yup.string().required("Community name is required"),
    message: Yup.string()
      .required("Message is required")
      .min(1, "Message should be at least 10 characters long"),
  });

  return (
    <div className="list-property-con">
      <div className="container">
        <div className="text-center">
          <h2 className="heading-start">List Your Property Details</h2>
        </div>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            city: "",
            propertyType: "",
            numberOfBedrooms: "",
            furnishingStatus: "",
            buildingName: "",
            communityName: "",
            message: "",
          }}
          validationSchema={validationSchema}
          // onSubmit={(values) => {
          //   console.log('Form Data:', values);

          //   // Handle form submission here (e.g., send data to API)
          // }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              setSubmitting(true);
              const response = await fetch("/api/list-property", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              });

              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }

              const result = await response.json();
            
              setSuccess(true);
              // alert("Property details submitted successfully!");
              toast.success("Property submitted successfully!");

              resetForm();
            } catch (error) {
              toast.error("Error submitting property. Please try again.");
              console.error("Error submitting form:", error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            isSubmitting,
          }) => (
            <Form>
              <div className="form-group row">
                {/* First Name */}
                <div className="col-12 col-md-6 my-1">
                  <div className="input-field">
                    <label htmlFor="firstName">
                      First Name <span className="required">*</span>
                    </label>
                    <Field
                      as="input"
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="First Name"
                      className={`input ${
                        touched.firstName && errors.firstName ? "error" : ""
                      }`}
                    />
                    {touched.firstName && errors.firstName && (
                      <div className="error-message">{errors.firstName}</div>
                    )}
                  </div>
                </div>

                {/* Last Name */}
                <div className="col-12 col-md-6 my-1">
                  <div className="input-field">
                    <label htmlFor="lastName">
                      Last Name <span className="required">*</span>
                    </label>
                    <Field
                      as="input"
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Last Name"
                      className={`input ${
                        touched.lastName && errors.lastName ? "error" : ""
                      }`}
                    />
                    {touched.lastName && errors.lastName && (
                      <div className="error-message">{errors.lastName}</div>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="col-12 col-md-6 my-1">
                  <div className="input-field">
                    <label htmlFor="email">
                      Email <span className="required">*</span>
                    </label>
                    <Field
                      as="input"
                      type="email"
                      name="email"
                      id="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Email"
                      className={`input ${
                        touched.email && errors.email ? "error" : ""
                      }`}
                    />
                    {touched.email && errors.email && (
                      <div className="error-message">{errors.email}</div>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="col-12 col-md-6 my-1">
                  <div className="input-field">
                    <label htmlFor="phone">
                      Phone <span className="required">*</span>
                    </label>
                    <Field
                      as="input"
                      type="tel"
                      name="phone"
                      id="phone"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Phone"
                      className={`input ${
                        touched.phone && errors.phone ? "error" : ""
                      }`}
                    />
                    {touched.phone && errors.phone && (
                      <div className="error-message">{errors.phone}</div>
                    )}
                  </div>
                </div>

                {/* Select City */}
                <div className="col-12 col-md-6 my-1">
                  <div className="input-field">
                    <label htmlFor="city">
                      Select City <span className="required">*</span>
                    </label>
                    <Field
                      as="select"
                      name="city"
                      id="city"
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`input ${
                        touched.city && errors.city ? "error" : ""
                      }`}
                    >
                      <option value="">Select City</option>
                      <option value="dubai">Dubai</option>
                      <option value="abuDhabi">Abu Dhabi</option>
                    </Field>
                    {touched.city && errors.city && (
                      <div className="error-message">{errors.city}</div>
                    )}
                  </div>
                </div>

                {/* Property Type */}
                <div className="col-12 col-md-6 my-1">
                  <div className="input-field">
                    <label htmlFor="propertyType">
                      Property Type <span className="required">*</span>
                    </label>
                    <Field
                      as="select"
                      name="propertyType"
                      id="propertyType"
                      value={values.propertyType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`input ${
                        touched.propertyType && errors.propertyType
                          ? "error"
                          : ""
                      }`}
                    >
                      <option value="">Select Property Type</option>
                      <option value="apartment">Apartment</option>
                      <option value="villa">Villa</option>
                    </Field>
                    {touched.propertyType && errors.propertyType && (
                      <div className="error-message">{errors.propertyType}</div>
                    )}
                  </div>
                </div>

                {/* Number of Bedrooms */}
                <div className="col-12 col-md-6 my-1">
                  <div className="input-field">
                    <label htmlFor="numberOfBedrooms">
                      Number of Bedrooms <span className="required">*</span>
                    </label>
                    <Field
                      as="input"
                      type="number"
                      name="numberOfBedrooms"
                      id="numberOfBedrooms"
                      value={values.numberOfBedrooms}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Number of Bedrooms"
                      className={`input ${
                        touched.numberOfBedrooms && errors.numberOfBedrooms
                          ? "error"
                          : ""
                      }`}
                    />
                    {touched.numberOfBedrooms && errors.numberOfBedrooms && (
                      <div className="error-message">
                        {errors.numberOfBedrooms}
                      </div>
                    )}
                  </div>
                </div>

                {/* Furnishing Status */}
                <div className="col-12 col-md-6 my-1">
                  <div className="input-field">
                    <label htmlFor="furnishingStatus">
                      Furnishing Status <span className="required">*</span>
                    </label>
                    <Field
                      as="select"
                      name="furnishingStatus"
                      id="furnishingStatus"
                      value={values.furnishingStatus}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`input ${
                        touched.furnishingStatus && errors.furnishingStatus
                          ? "error"
                          : ""
                      }`}
                    >
                      <option value="">Select Furnishing Status</option>
                      <option value="furnished">Furnished</option>
                      <option value="unfurnished">Unfurnished</option>
                    </Field>
                    {touched.furnishingStatus && errors.furnishingStatus && (
                      <div className="error-message">
                        {errors.furnishingStatus}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-12 col-md-6 my-1">
                  <div className="input-field">
                    <label htmlFor="buildingName">
                      Community Name <span className="required">*</span>
                    </label>
                    <Field
                      as="input"
                      type="text"
                      name="communityName"
                      id="communityName"
                      value={values.communityName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Community Name"
                      className={`input ${
                        touched.communityName && errors.communityName
                          ? "error"
                          : ""
                      }`}
                    />
                    {touched.communityName && errors.communityName && (
                      <div className="error-message">
                        {errors.communityName}
                      </div>
                    )}
                  </div>
                </div>
                {/* Building Name */}
                <div className="col-12 col-md-6 my-1">
                  <div className="input-field">
                    <label htmlFor="buildingName">
                      Building Name <span className="required">*</span>
                    </label>
                    <Field
                      as="input"
                      type="text"
                      name="buildingName"
                      id="buildingName"
                      value={values.buildingName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Building Name"
                      className={`input ${
                        touched.buildingName && errors.buildingName
                          ? "error"
                          : ""
                      }`}
                    />
                    {touched.buildingName && errors.buildingName && (
                      <div className="error-message">{errors.buildingName}</div>
                    )}
                  </div>
                </div>
                
                {/* Message */}
                <div className="col-12 col-md-12 my-1">
                  <div className="input-field">
                    <label htmlFor="message">
                      Message <span className="required">*</span>
                    </label>
                    <Field
                      as="textarea"
                      name="message"
                      id="message"
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Message"
                      className={`input ${
                        touched.message && errors.message ? "error" : ""
                      }`}
                    />
                    {touched.message && errors.message && (
                      <div className="error-message">{errors.message}</div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="col-12">
                  <button
                    type="submit"
                    className="form-sub-btn"
                    disabled={isSubmitting} // Disable button while submitting
                  >
                    {isSubmitting
                      ? "Submitting..." // Show loader
                      : "Submit"}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <Toaster/>
    </div>
  );
};

export default ListForm;
