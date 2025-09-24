//Manually created file
// lib/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration (from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyBSWuNBvGJQ9rvKQaG9FY1_OzAcpmprbwU",
  authDomain: "genome-analyzer.firebaseapp.com",
  projectId: "genome-analyzer",
  storageBucket: "genome-analyzer.firebasestorage.app",
  messagingSenderId: "171541694621",
  appId: "1:171541694621:web:ca433ca0daffa41d162c74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

// Firestore Database
export const db = getFirestore(app);
