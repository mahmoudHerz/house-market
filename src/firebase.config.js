import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6drEAhFcS_fv9-AFFhTReWg9S4rrq8JQ",
  authDomain: "house-market-6f222.firebaseapp.com",
  projectId: "house-market-6f222",
  storageBucket: "house-market-6f222.appspot.com",
  messagingSenderId: "428061851474",
  appId: "1:428061851474:web:7b15c3f9b5e18c61fa448b",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
