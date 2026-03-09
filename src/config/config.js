// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, setPersistence, browserLocalPersistence} from "firebase/auth"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'demo_api_key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'demo.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'demo.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'demo_app_id',
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || 'demo_measurement_id'
};

// Initialize Firebase only if valid config is available
let app;
let auth;

try {
  if (firebaseConfig.apiKey && firebaseConfig.apiKey !== 'demo_api_key') {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    
    // Set Firebase auth persistence
    if (typeof window !== 'undefined') {
      setPersistence(auth, browserLocalPersistence);
    }
  } else {
    // Create a mock auth for development
    auth = null;
  }
} catch (error) {
  // Firebase initialization failed
  auth = null;
}

export { auth };
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// import {getAuth} from "firebase/auth"
// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyANxXrEH9P4UXVmLdKg8cAjrhOmdQXqCLg",
//   authDomain: "bellaviu-5b5a0.firebaseapp.com",
//   projectId: "bellaviu-5b5a0",
//   storageBucket: "bellaviu-5b5a0.firebasestorage.app",
//   messagingSenderId: "1016537316165",
//   appId: "1:1016537316165:web:c156bedfd0f00a7e2e5c2c",
//   measurementId: "G-4E1XRJK5FL"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// //const analytics = getAnalytics(app);
// export const auth=getAuth(app)