// "use client";
// import { createContext, useContext, useState, useEffect } from "react";

// const currencySymbols = {
//   USD: "$",
//   AED: "AED",
//   INR: "₹",
//   EUR: "€",
//   GBP: "£",
//   JPY: "¥",
//   // Add more currencies and their symbols as needed
// };

// const CurrencyContext = createContext();

// export const useCurrency = () => useContext(CurrencyContext);

// export const CurrencyProvider = ({ children }) => {
//   const [base, setBase] = useState("AED");
//   const [currency, setCurrency] = useState("AED");
//   const [exchangeRate, setExchangeRate] = useState(1);
//   const [currencySymbol, setCurrencySymbol] = useState(currencySymbols[currency]);

//   useEffect(() => {
//     // Check if we are on the client side
//     if (typeof window !== "undefined") {
//       // const storedCurrency = localStorage.getItem("currency") || "AED";
//       // if (storedCurrency) {
//       //   setBase(storedCurrency);
//       //   setCurrency(storedCurrency);
//       //   setCurrencySymbol(currencySymbols[storedCurrency]);
//       // }
//     }
//   }, []);

//   useEffect(() => {
//     setCurrencySymbol(currencySymbols[currency]);
//     const fetchExchangeRate = async () => {
//       const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);
//       const data = await response.json();
//       setExchangeRate(data.rates[currency]);
//     };

//     if (currency) {
//       fetchExchangeRate();
//     }
//   }, [currency, base]);

//   return (
//     <CurrencyContext.Provider value={{ currency, exchangeRate, setCurrency, currencySymbol }}>
//       {children}
//     </CurrencyContext.Provider>
//   );
// };

// export const convertPrice = (price, exchangeRate) => {
//   return (Number(price) * exchangeRate).toFixed(2);
// };
"use client";
import { createContext, useContext, useState, useEffect } from "react";

// Currency symbols
const currencySymbols = {
  USD: "$",
  AED: "AED",
  INR: "₹",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  // Add more currencies and their symbols as needed
};

// Create Currency Context
const CurrencyContext = createContext();

// Custom hook to use Currency Context
export const useCurrency = () => useContext(CurrencyContext);

// CurrencyProvider to provide the context values
export const CurrencyProvider = ({ children }) => {
  const [base, setBase] = useState("AED");
  const [currency, setCurrency] = useState("AED");
  const [exchangeRate, setExchangeRate] = useState(1);
  const [currencySymbol, setCurrencySymbol] = useState(currencySymbols[currency]);

  useEffect(() => {
    // Set currency symbol whenever currency changes
    setCurrencySymbol(currencySymbols[currency]);
  }, [currency]);  // This will run when the currency state changes

  useEffect(() => {
    // Fetch exchange rates based on the base currency
    const fetchExchangeRate = async () => {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);
      const data = await response.json();
      setExchangeRate(data.rates[currency]);
    };

    if (currency) {
      fetchExchangeRate();
    }
  }, [currency, base]);  // Re-run this effect whenever currency or base changes

  return (
    <CurrencyContext.Provider value={{ currency, exchangeRate, setCurrency, currencySymbol }}>
      {children}
    </CurrencyContext.Provider>
  );
};

// Function to convert price based on the exchange rate
export const convertPrice = (price, exchangeRate) => {
  return (Number(price) * exchangeRate).toFixed(2);
};
