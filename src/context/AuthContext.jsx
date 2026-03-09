"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { getLocalData, setLocalData } from "../utility/Function"; // If you're storing the user data locally
import toast from "react-hot-toast";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../config/config";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null); // Local user state
  // const [user, setUser] = useState(null); // Firebase user state
  const [userId, setUserId] = useState(null); // Store user ID

  // Google sign-in
  const googleSignIn = async () => {
    if (!auth) {
      toast.error("Firebase authentication is not available");
      return;
    }
    
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      console.log('Firebase sign-in successful:', user);
      console.log('User email:', user.email);
      console.log('User displayName:', user.displayName);

      // Handle name parsing safely - support single names
      let first_name = '';
      let last_name = '';
      
      if (user.displayName) {
        const nameParts = user.displayName.trim().split(" ");
        first_name = nameParts[0] || '';
        last_name = nameParts.slice(1).join(" ") || ''; // Join remaining parts as last_name
      }

      console.log('Parsed names:', { first_name, last_name });

      const response = await fetch("/api/saveUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: first_name,
          last_name: last_name,
          email_id: user.email,
        }),
      });

      console.log('saveUser response status:', response.status);

      const data = await response.json();
      console.log('saveUser response data:', data);
    
      const userDetails = {
        firstName: data[0].first_name,
        lastName: data[0].last_name,
        type: data[0].type,
        email: data[0].email_id,
        photoURL: null,
        userId: data[0].user_id,
      };

      console.log('Final user details:', userDetails);

      setAuthUser(userDetails);
      setLocalData("authUser", JSON.stringify(userDetails));
      toast.success("Logged in successfully!");
    } catch (error) {
      console.error('Firebase sign-in error:', error);
      toast.error("Login failed. Please try again.");
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      if (auth) {
        await signOut(auth);
      }
      setAuthUser(null); // Clear the authUser state
      setUserId(null); // Clear user ID
      localStorage.removeItem("authUser"); // Remove from localStorage
    } catch (error) {
      // Sign-Out error handled silently
    }
  };

  // Initialize user state from Firebase and localStorage
  useEffect(() => {
    const storedUser = getLocalData("authUser");
    // const storedUserId = getLocalData("userId");
    if (storedUser) {
      setAuthUser(JSON.parse(storedUser)); // Initialize authUser from localStorage
      // setUser(JSON.parse(storedUser)); // Ensure Firebase user is also initialized
    }
  }, []);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //    // setUser(currentUser);
  //   });
  //   return () => unsubscribe();
  // }, []);

  return (
    <AuthContext.Provider
      value={{ authUser, setAuthUser, googleSignIn, userId, setUserId, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
