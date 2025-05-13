import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // додаємо Firestore





const firebaseConfig = {
  apiKey: "AIzaSyDqZjJQLBqh8zYYqVVGDS7jPjJ02sDjytU"
  ,
  authDomain: "lab-4-48bf5.firebaseapp.com",
  projectId: "lab-4-48bf5",
  storageBucket: "lab-4-48bf5.firebasestorage.app",
  messagingSenderId: "1071797335408",
  appId: "1:1071797335408:web:26c41faddcbcfd972ecbb5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // ← ось тут експортуємо db!

