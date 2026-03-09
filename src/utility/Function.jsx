import CryptoJS from "crypto-js";

let CryptoJSKey = "Bellaviu@987654231";

export function 
setLocalData(key, value) {
  var user_data = CryptoJS.AES.encrypt(value, CryptoJSKey).toString();
  localStorage.setItem(key, user_data);
}
export function getLocalData(key) {
  var user_data = localStorage.getItem(key);
  if (user_data) {
    user_data = CryptoJS.AES.decrypt(user_data, CryptoJSKey);
    user_data = user_data.toString(CryptoJS.enc.Utf8);
  }
  return user_data;
}
// import CryptoJS from "crypto-js";

// let CryptoJSKey = "Bellaviu@987654231";

// export function setLocalData(key, value) {
//   // Encrypt and store data in localStorage
//   var user_data = CryptoJS.AES.encrypt(value, CryptoJSKey).toString();
//   localStorage.setItem(key, user_data);
// }

// export function getLocalData(key) {
//   var user_data = localStorage.getItem(key);
//   if (user_data) {
//     try {
//       // Decrypt the data
//       user_data = CryptoJS.AES.decrypt(user_data, CryptoJSKey);
//       // Attempt to convert to UTF-8
//       user_data = user_data.toString(CryptoJS.enc.Utf8);

//       // Check if decryption resulted in a valid string
//       if (!user_data) {
//         console.error("Decrypted data is not a valid UTF-8 string");
//         user_data = null;  // Handle the error or return null
//       }
//     } catch (error) {
//       console.error("Error during decryption:", error);
//       user_data = null;  // Handle the error or return null
//     }
//   }
//   return user_data;
// }
