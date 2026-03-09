
"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Leftsidebar from "@/components/Leftsidebar/Leftsidebar";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const RouterHandler = ({ children }) => {
  const { authUser,user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const normalizedUser =
  user ||
  (authUser && {
    uid: authUser.uid,
    displayName:
      authUser.displayName || `${authUser.firstName} ${authUser.lastName}`,
    email: authUser.email,
    photoURL: authUser.photoURL,
  });

  // Redirect non-admin users or users other than Noman to the home page
  useEffect(() => {
    if (!normalizedUser ) return; // Wait until normalizedUser is defined
  
    const restrictedPages = [
      "/dashboard",
      "/all-booking",
      "/all-user-property",
      "/all-contact-data",
      "/all-customer-data",
    ];
  
    if (
      normalizedUser?.email !== "mdsaif.rabs@gmail.com" &&
      restrictedPages.includes(pathname)
    ) {
      router.replace("/"); // Redirect to the home page
    }
  }, [normalizedUser, pathname, router]);
  
  

  // Pages where the header and footer are hidden
  const hideHeaderFooter = [
    "/dashboard", 
    "/all-booking", 
    "/all-user-property", 
    "/all-contact-data", 
    "/all-customer-data"
  ].includes(pathname);

  return (
    <div>
      {hideHeaderFooter ? (
        <Leftsidebar>{children}</Leftsidebar> // Sidebar layout for these pages
      ) : (
        <>
          <Header /> {/* Show Header for other pages */}
          <main>{children}</main>
          <Footer /> {/* Show Footer for other pages */}
        </>
      )}
    </div>
  );
};

export default RouterHandler;
// "use client";
// import React, { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Footer from "@/components/Footer/Footer";
// import Header from "@/components/Header/Header";
// import Leftsidebar from "@/components/Leftsidebar/Leftsidebar";
// import { usePathname } from "next/navigation";

// const RouterHandler = ({ children }) => {
//   const router = useRouter();
//   const pathname = usePathname();

//   // Redirect non-admin users or users other than Noman to the home page
//   useEffect(() => {
//     const restrictedPages = [
//       "/dashboard",
//       "/all-booking",
//       "/all-user-property",
//       "/all-contact-data",
//       "/all-customer-data",
//     ];

//     if (
//       restrictedPages.includes(pathname)
//     ) {
//       router.replace("/"); // Redirect to the home page
//     }
//   }, [pathname, router]);

//   // Pages where the header and footer are hidden
//   const hideHeaderFooter = [
//     "/dashboard", 
//     "/all-booking", 
//     "/all-user-property", 
//     "/all-contact-data", 
//     "/all-customer-data"
//   ].includes(pathname);

//   return (
//     <div>
//       {hideHeaderFooter ? (
//         <Leftsidebar>{children}</Leftsidebar> // Sidebar layout for these pages
//       ) : (
//         <>
//           <Header /> {/* Show Header for other pages */}
//           <main>{children}</main>
//           <Footer /> {/* Show Footer for other pages */}
//         </>
//       )}
//     </div>
//   );
// };

// export default RouterHandler;
