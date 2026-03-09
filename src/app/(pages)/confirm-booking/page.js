"use client";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Carousel, Nav, Card } from "react-bootstrap";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { Nav as BootstrapNav } from "react-bootstrap";
import { useSearchParams } from "next/navigation"; // Import for query string handling
import "./style.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupIcon from "@mui/icons-material/Group";
import PaymentsIcon from "@mui/icons-material/Payments";
import Features from "@/components/Features/Features";
import PersonIcon from "@mui/icons-material/Person";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { useAuth } from "@/context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import CryptoJS from "crypto-js";

const encryptionKey = "BellaViu@12345";
// import { url } from "inspector";

const images = [
  "/hotels/hotel-img1.webp",
  "/hotels/hotel-img2.webp",
  "/hotels/hotel-img3.webp",
];

const Page = () => {
  const { authUser, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isPaymentProcessed, setIsPaymentProcessed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeKey, setActiveKey] = useState("summary");
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [isPhoneValid, setIsPhoneValid] = useState(false);
  useEffect(() => {
    const fetchHotelById = async () => {
      try {
        // Fetch hotels data from the local JSON file
        const response = await fetch("/propertyDataDetails.json"); // Path to the hotels JSON file

        if (!response.ok) {
          throw new Error("Failed to fetch hotel data");
        }

        const data = await response.json();

        // Find the hotel by id
        const foundHotel = data.find((hotel) => hotel.id === parseInt(id));

        if (!foundHotel) {
          throw new Error("Hotel not found");
        }

        setHotels(foundHotel);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelById();
  }, []);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Creates preview URL
    }
  };
  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result); // base64 string
      reader.onerror = (error) => reject(error);
    });
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://ap-gateway.mastercard.com/static/checkout/checkout.min.js";
    script.setAttribute("data-error", "errorCallback");
    script.setAttribute("data-cancel", "cancelCallback");
    script.async = true;
    document.body.appendChild(script);

    window.errorCallback = (error) => {
      console.error("Checkout Error:", error);
    };

    window.cancelCallback = () => {
      //  console.log("Payment cancelled");
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePhoneChange = (value) => {
    setMobileNumber(value);
    setIsPhoneValid(mobileNumber.length >= 10);
  };
  const searchParams = useSearchParams();
  const encryptedData = searchParams.get("data");
  let decryptedData = null;

  if (encryptedData) {
    try {
      // Decrypt the encrypted data
      const bytes = CryptoJS.AES.decrypt(
        decodeURIComponent(encryptedData),
        encryptionKey
      );
      decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      console.error("Error decrypting data:", error);
    }
  }

  const date = decryptedData?.date_range;
  const guestCount = decryptedData?.guest_count;
  const price = decryptedData?.price;
  const id = decryptedData?.id;
  const normalizedUser =
    user ||
    (authUser && {
      uid: authUser.userId,
      displayName:
        authUser.displayName || `${authUser.firstName} ${authUser.lastName}`,
      email: authUser.email,
      photoURL: authUser.photoURL,
    });
  const generateOrderId = (userId, propertyId) => {
    const date = new Date();
    const timestamp = date.getTime();
    const randomPart = Math.floor(Math.random() * 1000000);
    return `${userId}${propertyId}${timestamp}`;
  };

  const userBookingDeatils = `Price:${price},PropertyName:${
    hotels?.name
  },PropertyId:${hotels?.id},CheckIn:${date?.split(" - ")[0]}, CheckOut:${
    date?.split(" - ")[1]
  },Guest:${guestCount}, User: ${normalizedUser?.displayName},UserId: ${
    normalizedUser?.uid
  },UserEmail: ${normalizedUser?.email},Phone: ${mobileNumber}`;
  const descriptions = `PropertyName:${hotels?.name}, User: ${normalizedUser?.displayName},Phone: ${mobileNumber}`;

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };

  const credentials = "merchant.927924000:0fd0ff479d0fe17371ec99f739ccb99b";
  //const credentials = "merchant.TEST999992000:90b1a4356fcad98a78753de43d3b031c";
  const encodedCredentials = btoa(credentials);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!isPhoneValid) {
  //     toast.error("Please enter a valid mobile number before proceeding.", {
  //       position: toast.POSITION.TOP_CENTER,
  //       autoClose: 3000, // Duration for the toast
  //     });
  //     return;
  //   }
  //    if (!selectedFile) {
  //   toast.error("Please upload a document or image before proceeding.", {
  //     position: toast.POSITION.TOP_CENTER,
  //     autoClose: 3000,
  //   });
  //   return;
  // }
  //   setLoading(true);

  //   const propertyId = id;
  //   const userid = normalizedUser.uid;
  //   const orderId = generateOrderId(userid, propertyId); // Generate a unique order ID with userId and propertyId

  //   const orderData = {
  //     apiOperation: "INITIATE_CHECKOUT",
  //     interaction: {
  //       operation: "PURCHASE",
  //       returnUrl: "http://localhost:3000/booking",
  //       merchant: {
  //         name: "BELLAVIU HOLIDAY HOMES",
  //         url: "http://localhost:3000/",
  //       },
  //     },
  //     order: {
  //       currency: "AED",
  //       amount: price, // Use actual price
  //       id: orderId,
  //       description: descriptions, // Ensure descriptions is defined
  //     },
  //   };
  //   // console.log(orderId)
  //   try {
  //     const encryptionKey = "Bellaviu@987654231"; // Replace with a secure key
  //     const encryptedData = CryptoJS.AES.encrypt(
  //       JSON.stringify({ orderId, userBookingDeatils }),
  //       encryptionKey
  //     ).toString();

  //     // Update returnUrl with encrypted data
  //     orderData.interaction.returnUrl = `http://localhost:3000/booking/?data=${encodeURIComponent(
  //       encryptedData
  //     )}`;
  //     // Step 1: Initiate the Checkout session
  //     const response = await fetch("/api/checkout", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         orderData,
  //         encodedCredentials, // Ensure encodedCredentials is properly defined
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to initiate order");
  //     }

  //     const data = await response.json();
  //     // console.log("Order initiated successfully:", data);
  //     // Step 2: Create the Checkout object and configure it
  //     Checkout.configure({
  //       session: {
  //         id: data.session.id, // Use session ID from response
  //       },
  //     });
  //     // Checkout.showEmbeddedPage("#embed-target");
  //     Checkout.showPaymentPage();
  //     setIsPaymentProcessed(true);
  //   } catch (error) {
  //     console.error("Error initiating order:", error);
  //     toast.error("Something went wrong, please try again.", {
  //       position: toast.POSITION.TOP_CENTER,
  //       autoClose: 3000, // Duration for the toast
  //     });
  //   } finally {
  //     setLoading(false); // Reset loading state
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPhoneValid) {
      toast.error("Please enter a valid mobile number before proceeding.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      return;
    }

    if (!selectedFile) {
      toast.error("Please upload a document or image before proceeding.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      return;
    }

    setLoading(true);

    try {
      // 1. Convert file to base64
      const convertToBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });

      const base64File = await convertToBase64(selectedFile);

      // 2. Upload base64 file to backend
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          base64: base64File,
          filename: selectedFile.name,
        }),
      });

      const uploadData = await uploadRes.json();
      if (!uploadData.success) throw new Error("File upload failed");

      const uploadedFileUrl = uploadData.url; // e.g., /uploads/filename.jpg

      // 3. Prepare Checkout order
      const propertyId = id;
      const userid = normalizedUser.uid;
      const orderId = generateOrderId(userid, propertyId);

      const orderData = {
        apiOperation: "INITIATE_CHECKOUT",
        interaction: {
          operation: "PURCHASE",
          returnUrl: "https://www.bellaviuholidayhomes.com/booking", // Will be overwritten
          merchant: {
            name: "BELLAVIU HOLIDAY HOMES",
            url: "https://www.bellaviuholidayhomes.com/",
          },
        },
        order: {
          currency: "AED",
          amount: price,
          id: orderId,
          description: descriptions,
        },
      };

      // 4. Prepare encrypted return data
      const encryptionKey = "Bellaviu@987654231";
      // const userBookingDetails = {
      //   ...userBookingDeatils,
      //   uploadedFile: uploadedFileUrl, // add uploaded file to booking info
      // };

      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify({
          orderId,
          userBookingDeatils,
          uploadedFile: uploadedFileUrl,
        }),
        encryptionKey
      ).toString();

      orderData.interaction.returnUrl = `https://www.bellaviuholidayhomes.com/booking/?data=${encodeURIComponent(
        encryptedData
      )}`;

      // 5. Initiate checkout
      const checkoutRes = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderData,
          encodedCredentials,
        }),
      });

      if (!checkoutRes.ok) throw new Error("Checkout initiation failed");

      const checkoutData = await checkoutRes.json();

      // 6. Start payment flow
      Checkout.configure({
        session: {
          id: checkoutData.session.id,
        },
      });
      Checkout.showPaymentPage();
      setIsPaymentProcessed(true);
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error("Something went wrong, please try again.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <Toaster />
      <Breadcrumb title="Confirm Booking" image={"/BusinessBay.jpg"} />
      <div className="p-3">
        <Container>
          <Row>
            <Col md={8} lg={8}>
              <BootstrapNav
                justify
                variant="tabs"
                className="mb-3"
                activeKey={activeKey}
                onSelect={(key) => setActiveKey(key)}
              >
                <BootstrapNav.Item>
                  <BootstrapNav.Link
                    eventKey="summary"
                    className={
                      activeKey === "summary" ? "active-tab" : "inactive-tab"
                    }
                  >
                    Summary
                  </BootstrapNav.Link>
                </BootstrapNav.Item>
                <BootstrapNav.Item>
                  <BootstrapNav.Link
                    eventKey="map"
                    className={
                      activeKey === "map" ? "active-tab" : "inactive-tab"
                    }
                  >
                    Map
                  </BootstrapNav.Link>
                </BootstrapNav.Item>
                <BootstrapNav.Item>
                  <BootstrapNav.Link
                    eventKey="features"
                    className={
                      activeKey === "features" ? "active-tab" : "inactive-tab"
                    }
                  >
                    Features
                  </BootstrapNav.Link>
                </BootstrapNav.Item>
              </BootstrapNav>
              {activeKey === "summary" && (
                <>
                  <Carousel
                    interval={3000}
                    activeIndex={activeIndex}
                    onSelect={(selectedIndex) => setActiveIndex(selectedIndex)}
                  >
                    {hotels?.images?.map((imgSrc, index) => (
                      <Carousel.Item key={index}>
                        <img
                          src={imgSrc}
                          alt={`Slide ${index}`}
                          className="d-block w-100"
                          style={{
                            borderRadius: "10px",
                            height: "500px",
                            objectFit: "cover",
                          }}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                  <Nav variant="pills" className="mt-3 gap-3">
                    {hotels?.images?.map((imgSrc, index) => (
                      <Nav.Item
                        key={index}
                        onClick={() => handleThumbnailClick(index)}
                      >
                        <img
                          src={imgSrc}
                          alt={`Thumbnail ${index}`}
                          style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "cover",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        />
                      </Nav.Item>
                    ))}
                  </Nav>
                  <Card className="hotels-details mt-3">
                    <Card.Body>
                      <h4 className="details-title">{hotels?.name}</h4>
                      <p className="details-desc">{hotels?.description}</p>
                    </Card.Body>
                  </Card>
                </>
              )}
              {activeKey === "map" && (
                <iframe
                  //src="https://maps.google.com/?q=25.2230548859,55.3060569763&output=embed"
                  src={`${hotels?.map}&output=embed`}
                  width="100%"
                  height="400"
                  allowFullScreen=""
                  loading="lazy"
                  className="contact-iframe"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              )}
              {activeKey === "features" && (
                <>
                  <Features amenities={hotels?.amenities} />
                </>
              )}
            </Col>
            <Col md={4} lg={4}>
              <Card
                style={{
                  position: "sticky",
                  top: "25%",
                  border: "none", // Remove the border
                  borderRadius: "0", // Remove the border-radius
                  border: "2px solid #9c6c69",
                }}
              >
                <Card.Body>
                  <div className="text-center">
                    <h5>Booking Details</h5>
                  </div>

                  <ul className="booking-list-wrapper">
                    <li className="booking-list d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <PersonIcon
                          style={{ marginRight: "8px", color: "#9C6C69" }}
                        />
                        <span className="booking-label">Name:</span>
                      </div>
                      <span className="booking-value">
                        {normalizedUser?.displayName}
                      </span>
                    </li>
                    <li className="booking-list d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <ContactMailIcon
                          style={{ marginRight: "8px", color: "#9C6C69" }}
                        />
                        <span className="booking-label">Email:</span>
                      </div>
                      <span className="booking-value">
                        {normalizedUser?.email}
                      </span>
                    </li>
                    <li className="booking-list d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <CalendarMonthIcon
                          style={{ marginRight: "8px", color: "#9C6C69" }}
                        />
                        <span className="booking-label">Check-in:</span>
                      </div>
                      <span className="booking-value">
                        {date?.split(" - ")[0]}
                      </span>
                    </li>
                    <li className="booking-list d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <CalendarMonthIcon
                          style={{ marginRight: "8px", color: "#9C6C69" }}
                        />
                        <span className="booking-label">Check-out:</span>
                      </div>
                      <span className="booking-value">
                        {date?.split(" - ")[1]}
                      </span>
                    </li>
                    <li className="booking-list d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <GroupIcon
                          style={{ marginRight: "8px", color: "#9C6C69" }}
                        />
                        <span className="booking-label">Guests:</span>
                      </div>
                      <span className="booking-value">{guestCount}</span>
                    </li>
                    <li className="booking-list d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <PaymentsIcon
                          style={{ marginRight: "8px", color: "#9C6C69" }}
                        />
                        <span className="booking-label">Total Price:</span>
                      </div>
                      <span className="booking-value">AED {price}</span>
                    </li>
                  </ul>
                  <div className="mb-3">
                    <PhoneInput
                      country={"ae"}
                      value={mobileNumber}
                      onChange={handlePhoneChange}
                      inputStyle={{
                        width: "100%",
                        height: "40px",
                      }}
                      inputProps={{
                        name: "mobileNumber",
                        required: true,
                        autoComplete: "off",
                      }}
                    />
                    {!isPhoneValid && (
                      <small className="text-danger">
                        Please enter a valid mobile number.
                      </small>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="documentUpload" className="form-label">
                      Passport or Emirates Id{" "}
                      <span className="text-danger">*</span>
                    </label>

                    <input
                      type="file"
                      className="form-control"
                      id="documentUpload"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={handleFileChange}
                    />
                    {selectedFile && (
                      <small className="text-success">
                        Selected: {selectedFile.name}
                      </small>
                    )}
                    {!selectedFile && (
                      <small className="text-danger">
                        Please upload a document or image.
                      </small>
                    )}
                  </div>
                  {previewUrl && (
                    <div className="mt-2">
                      {selectedFile.type.includes("image") ? (
                        <img
                          src={previewUrl}
                          alt="Preview"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "200px",
                            borderRadius: "8px",
                          }}
                        />
                      ) : selectedFile.type === "application/pdf" ? (
                        <embed
                          src={previewUrl}
                          type="application/pdf"
                          width="100%"
                          height="200px"
                        />
                      ) : (
                        <p>File preview not supported.</p>
                      )}
                    </div>
                  )}

                  <div className="text-center">
                    <div id="embed-target"></div>
                    <button
                      type="submit"
                      className="pay-btn mt-2"
                      onClick={handleSubmit}
                      disabled={
                        loading ||
                        !isPhoneValid ||
                        isPaymentProcessed ||
                        !selectedFile
                      }
                    >
                      {loading ? "Booking..." : "Confirm Booking"}
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Page;
