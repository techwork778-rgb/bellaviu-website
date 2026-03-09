import localFont from "next/font/local";
import dynamic from "next/dynamic";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { AuthProvider } from "@/context/AuthContext";
import Script from "next/script";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Dynamically import the Header component
const DynamicHeader = dynamic(() => import("@/components/Header/Header"), {
  loading: () => {}, // Placeholder while loading
  ssr: false, // Disable SSR if not required for the Header
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Vacation Rentals in Dubai | Best Short-Term Stays with Bellaviu",
  description:
    "Vacation Rentals in Dubai, Enjoy luxury short-term stays with Bellaviu. Find the best deals on apartments and villas for your perfect Dubai",
  icons: {
    icon: "/bellaviwefavicon.png",
  },
  verification: {
    google: "bkB7CMcE-FW34kjwj-GcLZ24fPvDsHVnTuK1V69g6ps",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" />
        <Script
          src="https://ap-gateway.mastercard.com/static/checkout/checkout.min.js"
          data-error="errorCallback"
          data-cancel="cancelCallback"
        ></Script>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-JH1P70Q3SG"
        ></Script>
        <Script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
             __html: `
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JH1P70Q3SG');
           `,
          }}
        />
        <Script
          id="google-translate-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
      function googleTranslateElementInit() {
        new google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,es,fr,ar',
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        }, 'google_translate_element');
      }
    `,
          }}
        />
       
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionProviderWrapper>
          <AuthProvider>
            <CurrencyProvider>
              <Header />
              <ToastContainer />

              {children}

              <Footer />
            </CurrencyProvider>
          </AuthProvider>
        </SessionProviderWrapper>
           <Script
          src="https://code.tidio.co/oa2j0vtj2kywprw9byyripy1tatbjqgw.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
