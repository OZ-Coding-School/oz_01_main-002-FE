// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBb6eJsDJeq2QVwlr4yu_jAQOH66_kFpXw",
  authDomain: "team-project-b1795.firebaseapp.com",
  projectId: "team-project-b1795",
  storageBucket: "team-project-b1795.appspot.com",
  messagingSenderId: "492099747016",
  appId: "1:492099747016:web:7afa70f7dd50fe42ca39fd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);