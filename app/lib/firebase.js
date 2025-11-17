// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyDTlTyLn9DT7sMjwornzyoGb7--r0jjvmw",
  authDomain: "babylon-test-project.firebaseapp.com",
  projectId: "babylon-test-project",
  storageBucket: "babylon-test-project.firebasestorage.app",
  messagingSenderId: "198056379418",
  appId: "1:198056379418:web:8c9f6d595994eab7523da3",
  measurementId: "G-Z8M3X4KP95"
};

// Prevent reinitializing on hot reload
let app;
if (!app) {
  app = initializeApp(firebaseConfig);
}

export const auth = getAuth(app);