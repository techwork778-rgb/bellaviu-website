'use client'; // Ensure this runs on the client side

import { SessionProvider } from 'next-auth/react'; // Import SessionProvider

const SessionProviderWrapper = ({ children }) => {
  return <SessionProvider >{children}</SessionProvider>;
};

export default SessionProviderWrapper;