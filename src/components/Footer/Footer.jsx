import React from "react";
import "./Footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Image from "next/image";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import BusinessIcon from "@mui/icons-material/Business";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import Divider from "@mui/material/Divider";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer" style={{backgroundColor:"black",color:"white"}}>
      <img
        src="/vectordesign.png"
        alt="Logo"
        style={{ width: "100%", height: "35px", backgroundColor: "white" }}
      />

      <div className="container py-4">
        <div className="row pb-md-3">
          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0 text-center text-md-start">
            <Link href="https://deenpropertiesuae.com/" passHref>
            <Image src="/deenproperty.gif" alt="Logo" width={280} height={120} />
            </Link>
          </div>
          <div
            className="d-flex flex-column justify-content-end col-lg-4 col-md-6 mb-4 mb-lg-0 text-center text-md-start"
            style={{ marginTop: "35px" }}
          >
            <p>
              <CallIcon className="me-2" style={{ fontSize: "16px" }} />
              +971 4 570 1618 | +971 50 267 8831
            </p>
            <p>
              <EmailIcon className="me-2" style={{ fontSize: "18px" }} />
              reservation@bellaviuholidayhomes.com
            </p>
          </div>
          <div
            className="d-flex flex-column justify-content-end col-lg-4 col-md-6 mb-4 mb-lg-0 text-center text-md-start"
            style={{ marginTop: "35px" }}
          >
            <p>
              <BusinessIcon className="me-2" style={{ fontSize: "16px" }} />
              Marasi Drive, B2B Tower, Office Number - 1515, PO Box - 417679,
              Business Bay, Dubai, United Arab Emirates
            </p>
          </div>
        </div>
        <Divider sx={{ backgroundColor: "white" }} />
        <div className="d-flex justify-content-between mt-4  align-items-center footer-mobile">
          <div>
            <p
              className="text-center"
              style={{ fontSize: "14px", margin: "0" }}
            >
              Copyright © {currentYear} BellaViu. All Rights Reserved.
            </p>
          </div>
          <div>
            <Link
              href={"/privacy-policy"}
              passHref
              style={{ color: "white", fontSize: "14px" }}
            >
              Privacy Policy
            </Link>
            <span> | </span>
            <Link
              href={"/terms-conditions"}
              passHref
              style={{ color: "white", fontSize: "14px" }}
            >
              Terms & Conditions
            </Link>
          </div>

          <div
            className="social-icons d-flex"
            // style={{ justifyContent: "flex-end" }}
          >
            <Link
              href={"https://www.facebook.com/people/BellaViu-Holiday-Homes/61567081257605/?mibextid=ZbWKwL"}
              passHref
              style={{ color: "white", fontSize: "14px" }}
            >
            <img
              src="/facebook.png"
              className="me-3"
              style={{ width: "20px", height: "20px" }}
              alt="Facebook"
            />
            </Link>
            <Link
              href={" https://x.com/bellaviu56380?t=XahaiwGqGj6vJyEFDTd3sQ&s=09"}
              passHref
              style={{ color: "white", fontSize: "14px" }}
            >
           
            <img
              src="/twitter.png"
              className="me-3"
        
              style={{ width: "20px", height: "20px"}}
              alt="Twitter"
            />
            </Link>
            <Link
              href={" https://www.instagram.com/bellaviu.holidayhomes/"}
              passHref
              style={{ color: "white", fontSize: "14px" }}
            >
            <img
              src="/instagram.png"
              className="me-3"
              style={{ width: "20px", height: "20px" }}
              alt="Instagram"
            />
            </Link>
            <Link
              href={"https://www.tiktok.com/@bellaviu.holidayh"}
              passHref
              style={{ color: "white", fontSize: "14px" }}
            >
            <img
              src="/tiktok.png"
              className="me-3"
              style={{ width: "20px", height: "20px" }}
              alt="Tiktok"
            />
            </Link>
            <Link
              href={" https://www.youtube.com/@bellaviuholidayhomes-q9c"}
              passHref
              style={{ color: "white", fontSize: "14px" }}
            >
           
            <img
              src="/youtube.png"
              className="me-3"
              style={{ width: "20px", height: "20px" }}
              alt="Youtube"
            />
            </Link>
            <Link
              href={"https://www.threads.net/@bellaviu.holidayhomes"}
              passHref
              style={{ color: "white", fontSize: "14px" }}
            >
            <img
              src="/threads.png"
              className="me-3"
              style={{ width: "20px", height: "20px" }}
              alt="Youtube"
            />
            </Link>
            <Link
              href={"https://www.linkedin.com/company/bella-viu-holiday-homes/"}
              passHref
              style={{ color: "white", fontSize: "14px" }}
            >
            <img
              src="/linkedin.png"
              className="me-3"
              style={{ width: "20px", height: "20px" }}
              alt="Youtube"
            />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// import React from "react";
// import "./Footer.css";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import XIcon from "@mui/icons-material/X";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import YouTubeIcon from "@mui/icons-material/YouTube";
// import Image from "next/image";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import BusinessIcon from "@mui/icons-material/Business";
// import CallIcon from "@mui/icons-material/Call";
// import EmailIcon from "@mui/icons-material/Email";
// import Divider from "@mui/material/Divider";
// import Link from "next/link";

// const Footer = () => {
//   return (
//     <footer className="footer bg-light text-dark">
//       <img
//         src="/vectordesign.png"
//         alt="Logo"
//         style={{ width: "100%", height: "35px" }}
//       />
//       <div className="container py-4">
//         <div className="row pb-md-5">
//           <div className="col-lg-4 col-md-6 mb-4 mb-lg-0 text-center text-md-start align-items-center">
//             <Image src="/bella-views-logo.png" alt="Logo" width={250} height={150} />
//           </div>
//           <div className="col-lg-4 col-md-6 mb-4 mb-lg-0 text-center text-md-start align-items-center">
//             <Image src="/deenblack.jpg" alt="Logo" width={250} height={150} />
//           </div>
//           <div
//             className="d-flex flex-column justify-content-end col-lg-4 col-md-6 mb-4 mb-lg-0 text-center text-md-start"
//           >
//             <p>
//               <BusinessIcon className="me-2" style={{ fontSize: "16px" }} />
//               Marasi Drive, B2B Tower, Office Number - 1515, PO Box - 417679,
//               Business Bay, Dubai, United Arab Emirates
//             </p>
//             <p>
//               <CallIcon className="me-2" style={{ fontSize: "16px" }} />
//               +971 4 570 1618 | +971 50 267 8831
//             </p>
//             <p>
//               <EmailIcon className="me-2" style={{ fontSize: "18px" }} />
//               reservation@bellaviuholidayhomes.com
//             </p>
//           </div>
//         </div>
//         <Divider sx={{ backgroundColor: "black" }} />
//         <div className="d-flex justify-content-between mt-4 align-items-center">
//           <p className="text-center" style={{ fontSize: "12px" }}>
//             Copyright © 2024 BellaViu. All Rights Reserved.
//           </p>
//           <div>
//             <div>
//               <Link
//                 href={"/privacy-policy"}
//                 passHref
//                 style={{ color: "black", fontSize: "14px" }}
//               >
//                 Privacy Policy
//               </Link>
//               <span> | </span>
//               <Link
//                 href={"/terms-conditions"}
//                 passHref
//                 style={{ color: "black", fontSize: "14px" }}
//               >
//                 Terms & Conditions
//               </Link>
//             </div>
//           </div>
//           <div
//             className="social-icons d-flex"
//             style={{ justifyContent: "flex-end" }}
//           >
//             <img
//               src="/facebook.png"
//               className="me-3"
//               style={{ width: "20px", height: "20px" }}
//               alt="Facebook"
//             />
//             <img
//               src="/twitter.png"
//               className="me-3"
//               style={{ width: "20px", height: "20px" }}
//               alt="Twitter"
//             />
//             <img
//               src="/instagram.png"
//               className="me-3"
//               style={{ width: "20px", height: "20px" }}
//               alt="Instagram"
//             />
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
