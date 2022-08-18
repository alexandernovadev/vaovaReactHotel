import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyD20H3Rp8TFVZnl-cCH2Y8uuUENbqoFp2s",
  authDomain: "hotelsvaova.firebaseapp.com",
  projectId: "hotelsvaova",
  storageBucket: "hotelsvaova.appspot.com",
  messagingSenderId: "1082605311450",
  appId: "1:1082605311450:web:a05458a7f2384d3d78dce3",
  measurementId: "G-6THLMJJT3K"
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
